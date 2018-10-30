import styles from "./faq.scss";
import content from "./FaqContent.json";

const FaqHeader = () => (
  <div className={styles["header-container"]}>
    <h1 className={styles.title}>Frequently Asked Questions</h1>
  </div>
);

const renderContent = () =>
  content.map((n, i) => (
    <div className={styles["content-container"]} key={i}>
      <h4>{n.category}</h4>
      {n.faq.map((x, h) => (
        <div className={styles["content-container"]} key={h}>
          <a className={styles.question}>
            <h5>{x.question}</h5>
          </a>
          <div>
            <div className={styles.answer}>{x.answer}</div>
          </div>
        </div>
      ))}
    </div>
  ));

const FaqContent = () => (
  <div className={styles.main}>
    <FaqHeader />
    {renderContent()}
  </div>
);

export default FaqContent;
