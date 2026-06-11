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
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { Selector } from "testcafe";

// ── resolve __dirname for ESM ──────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
const DropZone = Selector("[data-testid='certificate-dropzone']");
const DocumentStatus = Selector("#document-status");
const IssuedBy = Selector("#issuedby");
const InvalidBanner = Selector(".invalid");

async function uploadDoc(t, filePath) {
  await DropZone.with({ visibilityCheck: true })();
  await t.setFilesToUpload("input[type=file]", [filePath]);
}

async function assertValid(t, issuerText) {
  await DocumentStatus.with({ visibilityCheck: true })();
  await t.expect(IssuedBy.textContent).contains(issuerText);
}

async function assertInvalid(t) {
  await InvalidBanner.with({ visibilityCheck: true })();
}

// ══════════════════════════════════════════════════════════════════════════
// Polygon Amoy testnet (chainId 80002)  –  OA v2
// ══════════════════════════════════════════════════════════════════════════

fixture("OpenCerts – Amoy OA v2 verification").page("http://localhost:3000");

test("[Amoy OA] valid minted document – all checks pass", async (t) => {
  await uploadDoc(t, OA_AMOY_MINTED);
  await assertValid(t, "EXAMPLE.TRADETRUST.IO");
});

test("[Amoy OA] tampered document (targetHash mutated) – integrity INVALID", async (t) => {
  await uploadDoc(t, OA_AMOY_TAMPERED);
  await assertInvalid(t);
  await t.expect(DocumentStatus.textContent).match(/tampered|invalid/i);
});

test("[Amoy OA] not-minted document (merkleRoot replaced) – document status INVALID", async (t) => {
  await uploadDoc(t, OA_AMOY_NOT_MINTED);
  await assertInvalid(t);
  await t.expect(DocumentStatus.textContent).match(/not been issued|not minted|invalid/i);
});

// ──────────────────────────────────────────────────────────────────────────
// Polygon Amoy testnet  –  W3C VC
// ──────────────────────────────────────────────────────────────────────────

fixture("OpenCerts – Amoy W3C VC verification").page("http://localhost:3000");

test("[Amoy W3C] valid minted document – all checks pass", async (t) => {
  await uploadDoc(t, W3C_AMOY_MINTED);
  await assertValid(t, "DID:WEB:TRUSTVC.GITHUB.IO:DID:1");
});

test("[Amoy W3C] tampered document (proofValue mutated) – integrity INVALID", async (t) => {
  await uploadDoc(t, W3C_AMOY_TAMPERED);
  await assertInvalid(t);
  await t.expect(DocumentStatus.textContent).match(/tampered|invalid|error/i);
});

test("[Amoy W3C] not-minted document (tokenId replaced) – document status INVALID", async (t) => {
  await uploadDoc(t, W3C_AMOY_NOT_MINTED);
  await assertInvalid(t);
  await t.expect(DocumentStatus.textContent).match(/not been issued|not minted|invalid/i);
});

// ══════════════════════════════════════════════════════════════════════════
// Polygon POL mainnet (chainId 137)  –  OA v2
// ══════════════════════════════════════════════════════════════════════════

fixture("OpenCerts – POL mainnet OA v2 verification").page("http://localhost:3000");

test("[POL OA] valid minted document – all checks pass", async (t) => {
  await uploadDoc(t, OA_POL_MINTED);
  await assertValid(t, "EXAMPLE.TRADETRUST.IO");
});

test("[POL OA] tampered document (targetHash mutated) – integrity INVALID", async (t) => {
  await uploadDoc(t, OA_POL_TAMPERED);
  await assertInvalid(t);
  await t.expect(DocumentStatus.textContent).match(/tampered|invalid/i);
});

test("[POL OA] not-minted document (merkleRoot replaced) – document status INVALID", async (t) => {
  await uploadDoc(t, OA_POL_NOT_MINTED);
  await assertInvalid(t);
  await t.expect(DocumentStatus.textContent).match(/not been issued|not minted|invalid/i);
});

// ──────────────────────────────────────────────────────────────────────────
// Polygon POL mainnet  –  W3C VC
// ──────────────────────────────────────────────────────────────────────────

fixture("OpenCerts – POL mainnet W3C VC verification").page("http://localhost:3000");

test("[POL W3C] valid minted document – all checks pass", async (t) => {
  await uploadDoc(t, W3C_POL_MINTED);
  await assertValid(t, "DID:WEB:TRUSTVC.GITHUB.IO:DID:1");
});

test("[POL W3C] tampered document (proofValue mutated) – integrity INVALID", async (t) => {
  await uploadDoc(t, W3C_POL_TAMPERED);
  await assertInvalid(t);
  await t.expect(DocumentStatus.textContent).match(/tampered|invalid|error/i);
});

test("[POL W3C] not-minted document (tokenId replaced) – document status INVALID", async (t) => {
  await uploadDoc(t, W3C_POL_NOT_MINTED);
  await assertInvalid(t);
  await t.expect(DocumentStatus.textContent).match(/not been issued|not minted|invalid/i);
});
