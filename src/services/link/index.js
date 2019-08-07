import "isomorphic-fetch";
import { SHARE_LINK_API_URL } from "../../config";

export default function generateLink(certificate) {
  return window
    .fetch(SHARE_LINK_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ttl: 900,
        document: certificate
      })
    })
    .then(res => res.json());
}
