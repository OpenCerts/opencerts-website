import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { tmpdir } from "os";
import { join, resolve } from "path";
import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

// Skip this entire suite when the server is NOT in production/mainnet mode
const isMainnet = process.env.NET === "mainnet";
const defineFixture = isMainnet ? fixture : fixture.skip;

// ── paths ──────────────────────────────────────────────────────────────────
const FIXTURE_DIR = resolve(__dirname, "fixture");

const OA_POL_MINTED = join(FIXTURE_DIR, "pol/oa-pol-minted.json");
const W3C_POL_MINTED = join(FIXTURE_DIR, "pol/w3c-pol-minted.json");

// ── temp-file helpers ──────────────────────────────────────────────────────
const TEMP_DIR = join(tmpdir(), "opencerts-pol-tests");
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

function writeTamperedW3c(srcPath, name) {
  const doc = JSON.parse(readFileSync(srcPath, "utf8"));
  const pv = doc.proof.proofValue;
  doc.proof = { ...doc.proof, proofValue: pv.slice(0, -1) + (pv.endsWith("A") ? "B" : "A") };
  const dest = join(TEMP_DIR, name);
  writeFileSync(dest, JSON.stringify(doc));
  return dest;
}

function writeNotMintedW3c(srcPath, name) {
  const doc = JSON.parse(readFileSync(srcPath, "utf8"));
  doc.credentialStatus = { ...doc.credentialStatus, tokenId: UNUSED_HASH };
  const dest = join(TEMP_DIR, name);
  writeFileSync(dest, JSON.stringify(doc));
  return dest;
}

const OA_POL_TAMPERED = writeTamperedOa(OA_POL_MINTED, "oa-pol-tampered.json");
const OA_POL_NOT_MINTED = writeNotMintedOa(OA_POL_MINTED, "oa-pol-not-minted.json");
const W3C_POL_TAMPERED = writeTamperedW3c(W3C_POL_MINTED, "w3c-pol-tampered.json");
const W3C_POL_NOT_MINTED = writeNotMintedW3c(W3C_POL_MINTED, "w3c-pol-not-minted.json");

// ── shared selectors ───────────────────────────────────────────────────────
const CertificateStatus = Selector("#certificate-status");
const ErrorTab = Selector("#error-tab");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

// ══════════════════════════════════════════════════════════════════════════
// Polygon POL mainnet (chainId 137)  –  OA v2
// ══════════════════════════════════════════════════════════════════════════

defineFixture("OpenCerts – POL mainnet OA v2 verification").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

test("[POL OA] valid minted document – all checks pass", async (t) => {
  await t.setFilesToUpload("input[type=file]", [OA_POL_MINTED]);
  await t.expect(CertificateStatus.visible).ok();
  await validateTextContent(t, CertificateStatus, ["EXAMPLE.TRADETRUST.IO"]);
});

test("[POL OA] tampered document (targetHash mutated) – integrity INVALID", async (t) => {
  await t.setFilesToUpload("input[type=file]", [OA_POL_TAMPERED]);
  await t.expect(ErrorTab.visible).ok();
});

test("[POL OA] not-minted document (merkleRoot replaced) – document status INVALID", async (t) => {
  await t.setFilesToUpload("input[type=file]", [OA_POL_NOT_MINTED]);
  await t.expect(ErrorTab.visible).ok();
});

// ──────────────────────────────────────────────────────────────────────────
// Polygon POL mainnet  –  W3C VC
// ──────────────────────────────────────────────────────────────────────────

defineFixture("OpenCerts – POL mainnet W3C VC verification").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

test("[POL W3C] valid minted document – all checks pass", async (t) => {
  await t.setFilesToUpload("input[type=file]", [W3C_POL_MINTED]);
  await t.expect(CertificateStatus.visible).ok();
  await validateTextContent(t, CertificateStatus, ["DID:WEB:TRUSTVC.GITHUB.IO:DID:1"]);
});

test("[POL W3C] tampered document (proofValue mutated) – integrity INVALID", async (t) => {
  await t.setFilesToUpload("input[type=file]", [W3C_POL_TAMPERED]);
  await t.expect(ErrorTab.visible).ok();
});

test("[POL W3C] not-minted document (tokenId replaced) – document status INVALID", async (t) => {
  await t.setFilesToUpload("input[type=file]", [W3C_POL_NOT_MINTED]);
  await t.expect(ErrorTab.visible).ok();
});
