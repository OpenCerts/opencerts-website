import "isomorphic-fetch";
import { SHARE_LINK_API_URL, SHARE_LINK_TTL } from "../../config";

export function generateLink(certificate) {
  return window
    .fetch(`${SHARE_LINK_API_URL}/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ttl: SHARE_LINK_TTL,
        document: certificate
      })
    })
    .then(res => res.json());
}

export function getCertificateById(certificateId) {
  return window
    .fetch(`${SHARE_LINK_API_URL}/get/${certificateId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json());
}
