import React from "react";
import { faqContent } from "./content";
import css from "./faq.module.scss";

export const FaqContent: React.FunctionComponent = () => (
  <section className={`pb-5 ${css.section}`}>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-5">Frequently Asked Questions</h1>
        </div>
      </div>
      {faqContent.map(({ category, faq }, index) => (
        <div className="row mb-3" key={index}>
          <div className="col-12 col-lg-9 mr-lg-auto">
            <h4 className="mb-3">{category}</h4>
            {faq.map(({ question, answer, ...extraProps }, faqIndex) => (
              <div className="row mb-5" key={faqIndex} {...extraProps}>
                <div className="col-12">
                  <h5>{question}</h5>
                  <div>{answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);
