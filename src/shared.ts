import { IEncryptionResults } from "@govtechsg/oa-encryption";
import { v2, v3, v4 } from "@govtechsg/open-attestation";
import { z } from "zod";

// for the moment we don't need to use specifically signer types and it raises an error in some methods that don't really expect signed document, so keeping it like this
export type WrappedOrSignedOpenCertsDocument = v2.WrappedDocument | v3.WrappedDocument | v4.WrappedDocument;

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
