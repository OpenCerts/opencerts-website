import { groupBy } from "lodash";
import React, { useState } from "react";
import registry from "../../public/static/registry.json";
import { Hero } from "./UI/Hero";
import { RegistryCard } from "./UI/RegistryCard";
import { Search } from "./UI/Search";
import css from "./registry.module.scss";

const partners = Object.keys(registry.issuers)
  .map((k) => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    ...registry.issuers[k],
    address: k,
  }))
  .filter((partner) => partner.displayCard);

export const RegistryPage: React.FunctionComponent = () => {
  const [search, setSearch] = useState("");
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
      <nav className={`py-4`}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 ml-auto col-lg-4">
              <Search
                search={search}
                onSearchChanged={(event) => {
                  setSearch(event.target.value);
                }}
                onSearchSubmit={(event) => {
                  event.preventDefault();
                }}
              />
            </div>
          </div>
        </div>
      </nav>
      <section style={{ paddingTop: "80px" }}>
        <div className="container">
          <div className={`row ${css["check-empty"]}`}>
            {Object.keys(groups).map((group, index) => {
              const hasAddress = groups[group].find((info) => info.address?.includes(search));

              return (
                hasAddress && (
                  <RegistryCard
                    key={index}
                    contact={groups[group]}
                    zIndex={Object.keys(groups).length - index}
                    search={search}
                  />
                )
              );
            })}
          </div>
          <div className={`${css["no-results"]}`} style={{ marginBottom: "160px" }}>
            <div className="col-12">
              <h3>No results found.</h3>
              <p>Try another certificate store address?</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
