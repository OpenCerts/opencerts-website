/**
 * End-to-end verification tests for opencerts-website.
 *
 * Tests Polygon Amoy (chainId 80002) and Polygon POL mainnet (chainId 137)
 * for both OpenAttestation v2 (OA) and W3C Verifiable Credential documents.
 *
 * Status scenarios exercised per network × document type:
 *   VALID       – minted document, all checks pass
 *   TAMPERED    – same JSON with signature/proof corrupted at runtime → integrity INVALID
 *   NOT MINTED  – structurally-valid document whose tokenId is absent from the registry
 *
 * All failure scenarios are generated at runtime by mutating a copy of the
 * minted fixture and writing it to a temp file — no separate "bad" fixture
 * files are needed.
 *
 * Prerequisites: the app must be running on http://localhost:3000
 *   npm run serve-static   (or: npm run start:local)
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { tmpdir } from "os";
import { join, resolve } from "path";
import { Selector } from "testcafe";

// ── paths ──────────────────────────────────────────────────────────────────
const FIXTURE_DIR = resolve(__dirname, "fixture");

const OA_AMOY_MINTED = join(FIXTURE_DIR, "amoy/oa-amoy-minted.json");
const OA_POL_MINTED = join(FIXTURE_DIR, "pol/oa-pol-minted.json");
const W3C_AMOY_MINTED = join(FIXTURE_DIR, "amoy/w3c-amoy-minted.json");
const W3C_POL_MINTED = join(FIXTURE_DIR, "pol/w3c-pol-minted.json");

// ── temp-file helpers ──────────────────────────────────────────────────────
const TEMP_DIR = join(tmpdir(), "opencerts-pol-amoy-tests");
mkdirSync(TEMP_DIR, { recursive: true });

const UNUSED_HASH = "deadbeef" + "0".repeat(56); // 64-char hex, never minted

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

// Generate all runtime-modified fixtures once before the suite
const OA_AMOY_TAMPERED = writeTamperedOa(OA_AMOY_MINTED, "oa-amoy-tampered.json");
const OA_AMOY_NOT_MINTED = writeNotMintedOa(OA_AMOY_MINTED, "oa-amoy-not-minted.json");
const OA_POL_TAMPERED = writeTamperedOa(OA_POL_MINTED, "oa-pol-tampered.json");
const OA_POL_NOT_MINTED = writeNotMintedOa(OA_POL_MINTED, "oa-pol-not-minted.json");
const W3C_AMOY_TAMPERED = writeTamperedW3c(W3C_AMOY_MINTED, "w3c-amoy-tampered.json");
const W3C_AMOY_NOT_MINTED = writeNotMintedW3c(W3C_AMOY_MINTED, "w3c-amoy-not-minted.json");
const W3C_POL_TAMPERED = writeTamperedW3c(W3C_POL_MINTED, "w3c-pol-tampered.json");
const W3C_POL_NOT_MINTED = writeNotMintedW3c(W3C_POL_MINTED, "w3c-pol-not-minted.json");

// ── shared selectors ───────────────────────────────────────────────────────
// opencerts-website uses #certificate-status for the valid-doc status block
// and #error-tab for the invalid-doc error block
const DropZone = Selector("[data-testid='certificate-dropzone']");
const CertificateStatus = Selector("#certificate-status");
const ErrorTab = Selector("#error-tab");

async function uploadDoc(tc, filePath) {
  await DropZone.with({ visibilityCheck: true })();
  await tc.setFilesToUpload("input[type=file]", [filePath]);
}

async function assertValid(tc, issuerText) {
  await CertificateStatus.with({ visibilityCheck: true })();
  await tc.expect(CertificateStatus.textContent).contains(issuerText);
}

async function assertInvalid() {
  await ErrorTab.with({ visibilityCheck: true })();
}

const BLOCKCHAIN_TIMEOUTS = { selectorTimeout: 90000, assertionTimeout: 90000 };

// ══════════════════════════════════════════════════════════════════════════
// Polygon Amoy testnet (chainId 80002)  –  OA v2
// ══════════════════════════════════════════════════════════════════════════

fixture("OpenCerts – Amoy OA v2 verification")
  .page("http://localhost:3000")
  .speed(1)
  .timeouts(BLOCKCHAIN_TIMEOUTS);

test("[Amoy OA] valid minted document – all checks pass", async (t) => {
  await uploadDoc(t, OA_AMOY_MINTED);
  await assertValid(t, "example.tradetrust.io");
});

test("[Amoy OA] tampered document (targetHash mutated) – integrity INVALID", async (t) => {
  await uploadDoc(t, OA_AMOY_TAMPERED);
  await assertInvalid();
});

test("[Amoy OA] not-minted document (merkleRoot replaced) – document status INVALID", async (t) => {
  await uploadDoc(t, OA_AMOY_NOT_MINTED);
  await assertInvalid();
});

// ──────────────────────────────────────────────────────────────────────────
// Polygon Amoy testnet  –  W3C VC
// ──────────────────────────────────────────────────────────────────────────

fixture("OpenCerts – Amoy W3C VC verification")
  .page("http://localhost:3000")
  .speed(1)
  .timeouts(BLOCKCHAIN_TIMEOUTS);

test("[Amoy W3C] valid minted document – all checks pass", async (t) => {
  await uploadDoc(t, W3C_AMOY_MINTED);
  await assertValid(t, "DID:WEB:TRUSTVC.GITHUB.IO:DID:1");
});

test("[Amoy W3C] tampered document (proofValue mutated) – integrity INVALID", async (t) => {
  await uploadDoc(t, W3C_AMOY_TAMPERED);
  await assertInvalid();
});

test("[Amoy W3C] not-minted document (tokenId replaced) – document status INVALID", async (t) => {
  await uploadDoc(t, W3C_AMOY_NOT_MINTED);
  await assertInvalid();
});

// ══════════════════════════════════════════════════════════════════════════
// Polygon POL mainnet (chainId 137)  –  OA v2
// ══════════════════════════════════════════════════════════════════════════

fixture("OpenCerts – POL mainnet OA v2 verification")
  .page("http://localhost:3000")
  .speed(1)
  .timeouts(BLOCKCHAIN_TIMEOUTS);

test("[POL OA] valid minted document – all checks pass", async (t) => {
  await uploadDoc(t, OA_POL_MINTED);
  await assertValid(t, "example.tradetrust.io");
});

test("[POL OA] tampered document (targetHash mutated) – integrity INVALID", async (t) => {
  await uploadDoc(t, OA_POL_TAMPERED);
  await assertInvalid();
});

test("[POL OA] not-minted document (merkleRoot replaced) – document status INVALID", async (t) => {
  await uploadDoc(t, OA_POL_NOT_MINTED);
  await assertInvalid();
});

// ──────────────────────────────────────────────────────────────────────────
// Polygon POL mainnet  –  W3C VC
// ──────────────────────────────────────────────────────────────────────────

fixture("OpenCerts – POL mainnet W3C VC verification")
  .page("http://localhost:3000")
  .speed(1)
  .timeouts(BLOCKCHAIN_TIMEOUTS);

test("[POL W3C] valid minted document – all checks pass", async (t) => {
  await uploadDoc(t, W3C_POL_MINTED);
  await assertValid(t, "DID:WEB:TRUSTVC.GITHUB.IO:DID:1");
});

test("[POL W3C] tampered document (proofValue mutated) – integrity INVALID", async (t) => {
  await uploadDoc(t, W3C_POL_TAMPERED);
  await assertInvalid();
});

test("[POL W3C] not-minted document (tokenId replaced) – document status INVALID", async (t) => {
  await uploadDoc(t, W3C_POL_NOT_MINTED);
  await assertInvalid();
});
