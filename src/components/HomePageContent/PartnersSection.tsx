import React from "react";
import Partners from "../../constants/PartnerLogo.json";
import css from "./partnersPage.module.scss";

export const PartnerSection: React.FunctionComponent = () => (
  <section className="bg-blue-light py-5">
    <div className="container-fluid">
      <div className="row justify-content-center">
        {Partners.map((item, i) => (
          <div className={`col-6 col-md-auto`} key={i}>
            <div className="h-100 d-flex justify-content-center align-items-center">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className={`p-4 ${css["logo-link"]}`}>
                <img src={item.value} title={item.name} alt={item.name} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
