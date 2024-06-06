import { v2, v3, v4 } from "@govtechsg/open-attestation";

// for the moment we don't need to use specifically signer types and it raises an error in some methods that don't really expect signed document, so keeping it like this
export type WrappedOrSignedOpenCertsDocument = v2.WrappedDocument | v3.WrappedDocument | v4.WrappedDocument;
