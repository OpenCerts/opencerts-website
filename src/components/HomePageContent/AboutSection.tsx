import React from "react";
import { aboutImages } from "./AboutImages";
import css from "./aboutSection.module.scss";

const HowItWorks: React.FunctionComponent = () => {
  const sections: { key: keyof typeof aboutImages; text: string }[] = [
    {
      key: "onetwo",
      text:
        "When an OpenCerts certificate is created, a unique digital code is tagged to it. This code, together with condensed information from the certificate, is stored on the blockchain.",
    },
    {
      key: "three",
      text:
        "When you open the .opencert file on this site, its contents will be compared with what was stored on the blockchain.",
    },
    {
      key: "four",
      text:
        "We'll check if the contents match and if the certificate comes from a recognised insitution.\n\nThis way, you'll know if the certificate is valid when you try to view it.",
    },
  ];

  const section = sections.map((item, i) => (
    <div key={i} id={css[item.key]}>
      {aboutImages[item.key]()}
      <p>{item.text}</p>
    </div>
  ));

  return (
    <div className={css.howitworks}>
      <div className={css["hiw-container"]}>{section}</div>
    </div>
  );
};

export const AboutSection: React.FunctionComponent = () => {
  const steps: { key: keyof typeof aboutImages; text: string }[] = [
    {
      key: "onetwo",
      text:
        "When an OpenCerts certificate is created, a unique digital code is tagged to it. This code, together with condensed information from the certificate, is stored on the blockchain.",
    },
    {
      key: "three",
      text:
        "When you open the .opencert file on this site, its contents will be compared with what was stored on the blockchain.",
    },
    {
      key: "four",
      text:
        "We'll check if the contents match and if the certificate comes from a recognised insitution.\n\nThis way, you'll know if the certificate is valid when you try to view it.",
    },
  ];

  return (
    <>
      <section className={`bg-brand-dark text-white ${css.section}`}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="mb-5">What we can help you do</h3>
            </div>
            <div className="col-12 col-lg-4">
              <div className="row mb-4 mb-lg-0">
                <div className="col-auto">{aboutImages.valid()}</div>
                <div className="col">
                  <h4 className="text-orange font-weight-bold">View</h4>
                  <p>Easy way to view your certificate</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="row mb-4 mb-lg-0">
                <div className="col-auto">{aboutImages.genuine()}</div>
                <div className="col">
                  <h4 className="text-orange font-weight-bold">Check</h4>
                  <p>Make sure it has not been tampered with</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="row mb-4 mb-lg-0">
                <div className="col-auto">{aboutImages.institution()}</div>
                <div className="col">
                  <h4 className="text-orange font-weight-bold">Verify</h4>
                  <p>Find out if it is from a recognised institution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`bg-blue-light ${css.section}`}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="mb-5">How it works</h3>
            </div>
            <div className="col-12">
              <div className={css["content-steps"]}>
                {steps.map((item, i) => (
                  <div key={i} className="row py-4">
                    <div className="col-auto mx-auto">
                      <div className="row align-items-center">
                        <div className="col-lg-4">
                          <div className="text-center mb-4 mb-md-0">{aboutImages[item.key]()}</div>
                        </div>
                        <div className="col">
                          <p>{item.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
