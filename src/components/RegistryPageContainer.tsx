import { groupBy } from "lodash";
import React from "react";
import registry from "../../public/static/registry.json";
import { Hero } from "./UI/Hero";
import { RegistryCard } from "./UI/RegistryCard";

const partners = Object.keys(registry.issuers)
  .map((k) => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    ...registry.issuers[k],
    address: k,
  }))
  .filter((partner) => partner.displayCard);

export const RegistryPage: React.FunctionComponent = () => {
  const groups = groupBy(partners, (partner) => partner.group || partner.id);
  return (
    <>
      <Hero heading="Registry" subHeading="The registry is maintained by SkillsFuture Singapore.">
        <p>
          When a certificate is verified, this would mean that the certificate is issued by an institution in the
          SkillsFuture Singapore registry. To apply for your institute to be listed in the registry, kindly fill in{" "}
          <a href="https://form.gov.sg/5cd5141c02d207001007e322" target="_blank" rel="noopener noreferrer">
            this form
          </a>
          .
        </p>
      </Hero>
      <section style={{ paddingTop: "110px" }}>
        <div className="container">
          <div className="row">
            {Object.keys(groups).map((group, index) => (
              <RegistryCard key={index} info={groups[group]} zIndex={Object.keys(groups).length - 1 - index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
