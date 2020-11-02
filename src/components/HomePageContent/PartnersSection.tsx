import React from "react";
import Partners from "../../constants/PartnerLogo.json";

export const PartnerSection: React.FunctionComponent = () => (
  <section className="py-12 px-4">
    <div className="flex flex-wrap items-center justify-center">
      {Partners.map((item, i) => (
        <div className="w-1/2 lg:w-auto text-center" key={i}>
          <a
            className="inline-block p-8 hover:opacity-75 transition-opacity duration-200 ease-out"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="mx-auto"
              style={{ maxWidth: "150px", maxHeight: "100px" }}
              src={item.value}
              title={item.name}
              alt={item.name}
            />
          </a>
        </div>
      ))}
    </div>
  </section>
);
