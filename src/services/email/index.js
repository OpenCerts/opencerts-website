import "isomorphic-fetch";
import { EMAIL_API_URL } from "../../config";

export default function sendEmail({ certificate, email, captcha }) {
  return window
    .fetch(EMAIL_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: certificate,
        to: email,
        captcha
      })
    })
    .then(res => res.status === 200);
}
