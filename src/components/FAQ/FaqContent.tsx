import React from "react";
import { faqContent } from "./content";

export const FaqContent: React.FunctionComponent = () => (
  <section className="mb-20 text-sm text-gray-800 links-blue">
    <div className="container">
      <h1 className="font-montserrat py-12 text-center">Frequently Asked Questions</h1>

      {faqContent.map(({ category, faq }, index) => (
        <div className="flex flex-wrap justify-center mb-12" key={index}>
          <div className="w-full lg:w-2/3">
            <h3 className="text-orange font-montserrat font-bold">{category}</h3>
            {faq.map(({ question, answer, ...extraProps }, faqIndex) => (
              <div className="py-4" key={faqIndex} {...extraProps}>
                <h4 className="font-montserrat font-bold text-gray-700 mb-2">{question}</h4>
                {answer}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);
