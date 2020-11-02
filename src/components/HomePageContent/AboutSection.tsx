import React from "react";
import { aboutImages } from "./AboutImages";

export const AboutSection: React.FunctionComponent = () => {
  const howitworks: { key: keyof typeof aboutImages; text: string }[] = [
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
      <section className="bg-navy text-white py-20">
        <div className="container">
          <h2 className="font-montserrat mb-12 pl-8 border-l-4 border-orange">What we can help you do</h2>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 py-6">
              <div className="flex flex-wrap">
                <div className="w-auto">{aboutImages.valid()}</div>
                <div className="w-2/3 px-6">
                  <h3 className="font-montserrat font-bold text-orange mb-2">View</h3>
                  <p>Easy way to view your certificate</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 py-6">
              <div className="flex flex-wrap">
                <div className="w-auto">{aboutImages.genuine()}</div>
                <div className="w-2/3 px-6">
                  <h3 className="font-montserrat font-bold text-orange mb-2">Check</h3>
                  <p>Make sure it has not been tampered with</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 py-6">
              <div className="flex flex-wrap">
                <div className="w-auto">{aboutImages.institution()}</div>
                <div className="w-2/3 px-6">
                  <h3 className="font-montserrat font-bold text-orange mb-2">Verify</h3>
                  <p>Find out if it is from a recognised institution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue-100 py-20">
        <div className="container">
          <h2 className="font-montserrat mb-12 pl-8 border-l-4 border-orange">How it works</h2>
          <div className="bg-white rounded shadow-md p-8">
            {howitworks.map((item, i) => (
              <div key={i} className="flex flex-wrap items-center justify-center py-8">
                <div className="w-auto">{aboutImages[item.key]()}</div>
                <div className="w-full lg:w-2/5 mt-4 lg:ml-8 lg:mt-0">
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
