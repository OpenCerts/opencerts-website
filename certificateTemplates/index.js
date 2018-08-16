/* eslint-disable global-require */

const templates = {
  default: [
    {
      id: "certificate",
      label: "Certificate",
      template: require("./default-template.handlebars")
    }
  ],
  "np-sample": [
    {
      id: "certificate",
      label: "Certificate",
      template: require("./np-certificate.handlebars")
    },
    {
      id: "transcript",
      label: "Transcript",
      template: require("./np-transcript.handlebars")
    }
  ]
};

export default templates;
