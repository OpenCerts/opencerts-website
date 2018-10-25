import styles from "./faq.scss";
import content from "./FaqContent.json";

const FaqHeader = () => (
  <div className={styles["header-container"]}>
    <h1 className={styles.title}>Frequently Asked Questions</h1>
  </div>
);

const renderContent = () => {
  const items = content.map((n, i) => (
    <div className={styles["content-container"]} key={i}>
      <a className={styles.question}>
        <h5>{n.question}</h5>
      </a>
      <div>
        <div className={styles.answer}>{n.answer}</div>
      </div>
    </div>
  ));
  return <div>{items}</div>;
};

const FaqContent = () => (
  <div className={styles.main}>
    <FaqHeader />
    {renderContent()}
  </div>
);

export default FaqContent;
