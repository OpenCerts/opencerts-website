import styles from "./privacy.scss";

const Header = () => (
  <div className={styles["header-container"]}>
    <h1 className={styles.title}>Privacy Policy</h1>
  </div>
);

const Policy = () => (
  <div className={styles["content-container"]}>
    <ol>
      <li>This is a Government Agency digital service.</li>
      <li>
        We may use “cookies”, where a small data file is sent to your browser to
        store and track information about you when you enter our websites. The
        cookie is used to track information such as the number of users and
        their frequency of use, profiles of users and their preferred sites.
        While this cookie can tell us when you enter our sites and which pages
        you visit, it cannot read data off your hard disk.
      </li>
      <li>
        You can choose to accept or decline cookies. Most web browsers
        automatically accept cookies, but you can usually modify your browser
        setting to decline cookies if you prefer. This may prevent you from
        taking full advantage of the website.
      </li>
      <li>
        If you provide us with personally identifiable data:
        <ol type="a">
          <li>
            We may share necessary data with other Government agencies, so as to
            serve you in the most efficient and effective way unless such
            sharing is prohibited by law.
          </li>
          <li>
            We will NOT share your Personal Data with non-Government entities,
            except where such entities have been authorised to carry out
            specific Government services.
          </li>
          <li>
            For your convenience, we may also display to you data you had
            previously supplied us or other Government Agencies. This will speed
            up the transaction and save you the trouble of repeating previous
            submissions. Should the data be out-of-date, please supply us the
            latest data.
          </li>
        </ol>
      </li>
      <li>
        To safeguard your Personal Data, all electronic storage and transmission
        of Personal Data is secured with appropriate security technologies.
      </li>
      <li>
        This site may contain links to non-Government sites whose data
        protection and privacy practices may differ from ours. We are not
        responsible for the content and privacy practices of these other
        websites and encourage you to consult the privacy notices of those
        sites.
      </li>
      <li>
        Please contact 1800 211 0777 or qsm@tech.gov.sg if you:
        <ol type="a">
          <li>
            have any enquires or feedback on our data protection policies and
            procedures,
          </li>
          <li>
            need more information on or access to data which you have provided
            to us in the past.
          </li>
        </ol>
      </li>
    </ol>
  </div>
);

const Content = () => (
  <div className={styles.main}>
    <Header />
    <Policy />
  </div>
);

export default Content;
