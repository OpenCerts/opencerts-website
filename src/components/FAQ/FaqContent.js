import PropTypes from "prop-types";
import styles from "./faq.scss";
import { faqContent } from "./content";

const FaqHeader = () => (
  <div className={styles["header-container"]}>
    <h1 className={styles.title}>Frequently Asked Questions</h1>
  </div>
);

const renderQuestion = ({ question, answer, id }, index) => {
  const extraProps = id ? { id } : {};
  return (
    <div className={styles["content-container"]} key={index} {...extraProps}>
      <a className={styles.question}>
        <h5>{question}</h5>
      </a>
      <div>
        <div className={styles.answer}>
          <span>{answer}</span>
        </div>
      </div>
    </div>
  );
};

const renderSection = ({ category, faq = [] }, index) => (
  <div className={styles["content-container"]} key={index}>
    <h4>{category}</h4>
    {faq.map(renderQuestion)}
  </div>
);

const FaqContent = () => (
  <div className={styles.main}>
    <FaqHeader />
    {faqContent.map(renderSection)}
  </div>
);

export default FaqContent;

renderSection.propTypes = {
  category: PropTypes.string,
  faq: PropTypes.array
};

renderQuestion.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
  url: PropTypes.string
};
