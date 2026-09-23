import { IEncryptionResults, v2, v3 } from "@trustvc/trustvc";
import { z } from "zod";

// for the moment we don't need to use specifically signer types and it raises an error in some methods that don't really expect signed document, so keeping it like this
export type WrappedOrSignedOpenCertsDocument = v2.WrappedDocument | v3.WrappedDocument;

// type guard for encrypted certificates
type EncryptedCertificate = Omit<IEncryptionResults, "key">;
export const isEncrypted = (certificate: unknown): certificate is EncryptedCertificate => {
  const schema: z.ZodType<EncryptedCertificate> = z.object({
    cipherText: z.string(),
    iv: z.string(),
    tag: z.string(),
    type: z.string(),
  });

  const { success } = schema.safeParse(certificate);

  return success;
};

/**
 * A W3C Verifiable Presentation: an envelope asserted by a HOLDER that bundles one or more
 * credentials, each issued by (and verified against) its own issuer.
 *
 * Only the fields OpenCerts reads are declared; everything else is passed through to the
 * verifier and the renderer untouched.
 */
export interface EmbeddedVerifiableCredential {
  id?: string;
  type?: string | string[];
  issuer?: string | { id?: string; name?: string };
  renderMethod?: { id?: string; templateName?: string } | { id?: string; templateName?: string }[];
  "@context"?: string | string[];
  [key: string]: unknown;
}

export interface VerifiablePresentation {
  "@context"?: string | string[];
  id?: string;
  type: string | string[];
  holder?: string | { id?: string };
  verifiableCredential?: EmbeddedVerifiableCredential | EmbeddedVerifiableCredential[];
  proof?: { type?: string; cryptosuite?: string; verificationMethod?: string };
  [key: string]: unknown;
}
