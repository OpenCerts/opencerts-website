export default class MakeCertUtil {
  constructor() {
    this.cert = {
      schema: "opencerts/v1.4",
      data: {
        issuers: []
      }
    };
    return this;
  }

  addIssuer(issuerString) {
    const newIssuerObj = {
      certificateStore: `71f10d54-d483-489b-b06f-fa2bed75ce16:string:${issuerString}`
    };
    this.cert.data.issuers.push(newIssuerObj);
    return this;
  }

  finish() {
    return this.cert;
  }
}
