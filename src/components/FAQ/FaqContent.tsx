import React from "react";
import { faqContent } from "./content";
import styles from "./faq.module.scss";

const FaqContent: React.FunctionComponent = () => (
  <div className={styles.main}>
    <div className={styles["header-container"]}>
      <h1 className={styles.title}>Frequently Asked Questions</h1>
    </div>
    {faqContent.map(({ category, faq }, index) => (
      <div className={styles["content-container"]} key={index}>
        <h4>{category}</h4>
        {faq.map(({ question, answer, ...extraProps }, faqIndex) => (
          <div className={styles["content-container"]} key={faqIndex} {...extraProps}>
            <a className={styles.question}>
              <h5>{question}</h5>
            </a>
            <div>
              <div className={styles.answer}>
                <span>{answer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default FaqContent;
