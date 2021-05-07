import "isomorphic-fetch";
import { v2, WrappedDocument } from "@govtechsg/open-attestation";
import { SHARE_LINK_API_URL, SHARE_LINK_TTL } from "../../config";

export function generateLink(
  certificate: WrappedDocument<v2.OpenAttestationDocument>
): Promise<{ id: string; key: string }> {
  return window
    .fetch(`${SHARE_LINK_API_URL}/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ttl: SHARE_LINK_TTL,
        document: certificate,
      }),
    })
    .then((res) => res.json());
}
