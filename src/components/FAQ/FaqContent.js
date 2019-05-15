import PropTypes from "prop-types";
import styles from "./faq.scss";
import content from "./FaqContent.json";

const FaqHeader = () => (
  <div className={styles["header-container"]}>
    <h1 className={styles.title}>Frequently Asked Questions</h1>
  </div>
);

const renderQuestion = ({ question, answer }, index) => (
  <div className={styles["content-container"]} key={index}>
    <a className={styles.question}>
      <h5>{question}</h5>
    </a>
    <div>
      <div className={styles.answer}>
        <span dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </div>
  </div>
);

const renderSection = ({ category, faq = [] }, index) => (
  <div className={styles["content-container"]} key={index}>
    <h4>{category}</h4>
    {faq.map(renderQuestion)}
  </div>
);

const FaqContent = () => (
  <div className={styles.main}>
    <FaqHeader />
    {content.map(renderSection)}
  </div>
);

export default FaqContent;

renderSection.propTypes = {
  category: PropTypes.string,
  faq: PropTypes.array
};

renderQuestion.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  url: PropTypes.string
};
