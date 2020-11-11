import React from "react";
import Partners from "../../constants/PartnerLogo.json";

export const PartnerSection: React.FunctionComponent = () => (
  <section className="py-12 px-4">
    <div className="flex flex-wrap items-center justify-center">
      {Partners.map((item, i) => (
        <div className="w-auto text-center" key={i}>
          <a
            className="inline-block p-4 md:p-8 hover:opacity-75 transition-opacity duration-200 ease-out"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="mx-auto img-partner" src={item.value} title={item.name} alt={item.name} />
          </a>
        </div>
      ))}
    </div>
  </section>
);
