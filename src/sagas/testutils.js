// eslint-disable-next-line import/no-extraneous-dependencies
import sinon from "sinon";

export const targetHash =
  "f7432b3219b2aa4122e289f44901830fa32f224ee9dfce28565677f1d279b2c7";
export const proof0 =
  "2bb9dd186994f38084ee68e06be848b9d43077c307684c300d81df343c7858cf";
export const proof1 =
  "ed8bdba60a24af04bcdcd88b939251f3843e03839164fdd2dd502aaeef3bfb99";
export const intermediateHash =
  "fe0958c4b90e768cecb50cea207f3af034580703e9ed74ef460c1a31dd1b4d6c";
export const rootHash =
  "fcfce0e79adc002c1fd78a2a02c768c0fdc00e5b96f1da8ef80bed02876e18d1";

export const mockStore = () => {
  const stubbedFn = sinon.stub();
  return {
    methods: {
      isRevoked: h => ({
        call: () => stubbedFn(h)
      }),
      isIssued: h => ({
        call: () => stubbedFn(h)
      })
    },
    stub: stubbedFn
  };
};

export class MakeCertUtil {
  constructor() {
    this.cert = {
      schema: "opencerts/v1.4",
      data: {
        id: "71f10d54-d483-489b-b06f-fa2bed75ce16:string:certificate-id",
        issuers: []
      },
      signature: {
        targetHash,
        proof: [proof0, proof1]
      }
    };
    return this;
  }

  static makeFakeUUID() {
    return "aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa";
  }

  addTemplateTag(tag) {
    this.cert.data.$template = `${MakeCertUtil.makeFakeUUID()}:string:${tag}`;
    return this;
  }

  addDataField(field, value) {
    this.cert.data[field] = value;
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
