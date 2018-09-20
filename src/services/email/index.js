const emailApiUrl =
  "https://92cdczopwg.execute-api.ap-southeast-1.amazonaws.com/dev";

export default function sendEmail({ certificate, email, captcha }) {
  return window
    .fetch(emailApiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: JSON.stringify(certificate),
        to: email,
        captcha
      })
    })
    .then(res => res.json())
    .catch(console.error); // eslint-disable-line
}
