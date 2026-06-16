import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { tmpdir } from "os";
import { join, resolve } from "path";
import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

// Skip this entire suite when the server is running in production/mainnet mode
const isMainnet = process.env.NET === "mainnet";
const defineFixture = isMainnet ? fixture.skip : fixture;

// ── paths ──────────────────────────────────────────────────────────────────
const FIXTURE_DIR = resolve(__dirname, "fixture");

const OA_AMOY_MINTED = join(FIXTURE_DIR, "amoy/oa-amoy-minted.json");

// ── temp-file helpers ──────────────────────────────────────────────────────
const TEMP_DIR = join(tmpdir(), "opencerts-amoy-tests");
mkdirSync(TEMP_DIR, { recursive: true });

const UNUSED_HASH = "deadbeef" + "0".repeat(56);

function writeTamperedOa(srcPath, name) {
  const doc = JSON.parse(readFileSync(srcPath, "utf8"));
  doc.signature = { ...doc.signature, targetHash: UNUSED_HASH };
  const dest = join(TEMP_DIR, name);
  writeFileSync(dest, JSON.stringify(doc));
  return dest;
}

function writeNotMintedOa(srcPath, name) {
  const doc = JSON.parse(readFileSync(srcPath, "utf8"));
  doc.signature = { ...doc.signature, targetHash: UNUSED_HASH, merkleRoot: UNUSED_HASH };
  const dest = join(TEMP_DIR, name);
  writeFileSync(dest, JSON.stringify(doc));
  return dest;
}

const OA_AMOY_TAMPERED = writeTamperedOa(OA_AMOY_MINTED, "oa-amoy-tampered.json");
const OA_AMOY_NOT_MINTED = writeNotMintedOa(OA_AMOY_MINTED, "oa-amoy-not-minted.json");

// ── shared selectors ───────────────────────────────────────────────────────
const CertificateStatus = Selector("#certificate-status");
const ErrorTab = Selector("#error-tab");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

// ══════════════════════════════════════════════════════════════════════════
// Polygon Amoy testnet (chainId 80002)  –  OA v2
// ══════════════════════════════════════════════════════════════════════════

defineFixture("OpenCerts – Amoy OA v2 verification").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

test("[Amoy OA] valid minted document – all checks pass", async (t) => {
  await t.setFilesToUpload("input[type=file]", [OA_AMOY_MINTED]);
  await t.expect(CertificateStatus.visible).ok();
  await validateTextContent(t, CertificateStatus, ["EXAMPLE.TRADETRUST.IO"]);
});

test("[Amoy OA] tampered document (targetHash mutated) – integrity INVALID", async (t) => {
  await t.setFilesToUpload("input[type=file]", [OA_AMOY_TAMPERED]);
  await t.expect(ErrorTab.visible).ok();
});

test("[Amoy OA] not-minted document (merkleRoot replaced) – document status INVALID", async (t) => {
  await t.setFilesToUpload("input[type=file]", [OA_AMOY_NOT_MINTED]);
  await t.expect(ErrorTab.visible).ok();
});
