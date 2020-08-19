import { groupBy } from "lodash";
import React from "react";
import registry from "../../public/static/registry.json";
import { Card } from "./UI/Card/card";
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
  const groups = groupBy(partners, (partner) => partner.group || partner.id);
  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "#324353" }}>
        <div className={`container bg-brand-dark text-white ${css["r-section"]}`}>
          <h1 className={`col-12 ${css["m-pd-0"]} ${css["section-width"]}`}>Registry</h1>
        </div>
        <div className={`container bg-brand-dark text-white ${css["r-section"]}`}>
          <div className={css["section-width"]}>
            <div className={`col-lg-6 col-md-12 my-3 ${css["m-pd-0"]}`}>
              <p>
                The registry is maintained by SkillsFuture Singapore. When a certificate is verified, this would mean
                that the certificate is issued by an institution in the SkillsFuture Singapore registry. To apply for
                your institute to be listed in the registry, kindly fill in{" "}
                <a href="https://form.gov.sg/5cd5141c02d207001007e322" target="_blank" rel="noopener noreferrer">
                  this form
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`row ${css["r-section"]} ${css["section-width"]}`}>
        {Object.keys(groups).map((group, index) => (
          <Card key={index} info={groups[group]} />
        ))}
      </div>
    </>
  );
};
