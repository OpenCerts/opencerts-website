import styles from "./privacy.scss";

const Header = () => (
  <div className={styles["header-container"]}>
    <h1 className={styles.title}>Privacy Policy</h1>
  </div>
);

const Policy = () => (
  <div className={styles["content-container"]}>
    <div>
      This Privacy Policy must be read in conjunction with the Terms of Use that
      accompany the applicable service you are requesting from us (the
      &#34;Service&#34;). In this Privacy Policy, &#34;Public Sector
      Entities&#34; means the Government (including its ministries, departments
      and organs of state) and public authorities (such as statutory boards).
    </div>
    <ol>
      <li>
        Insofar as the Service consists of or is provided to you through a
        website, please note that:
        <ol>
          <li>
            We may use &#34;cookies &#34;, where a small data file is sent to
            your browser to store and track information about you when you enter
            our websites. The cookie is used to track information such as the
            number of users and their frequency of use, profiles of users and
            their preferred sites. While this cookie can tell us when you enter
            our sites and which pages you visit, it cannot read data off your
            hard disk.
          </li>
          <li>
            You can choose to accept or decline cookies. Most web browsers
            automatically accept cookies, but you can usually modify your
            browser setting to decline cookies if you prefer. This may prevent
            you from taking full advantage of the website.
          </li>
        </ol>
      </li>
      <li>
        We may request certain types of data from you in connection with your
        access or use of the Service. The data that may be requested include
        those identified in the Annex herein. Your data may be stored in our
        servers, systems or devices, in the servers, systems or devices of our
        third party service providers or collaborators, or on your device, and
        may be used by us or our third party service providers or collaborators
        to facilitate your access or use of the Service. We or our third party
        service providers or collaborators may collect system configuration
        information and/or traffic information (such as an IP address) and/or
        use information or statistical information to operate, maintain or
        improve the Services or the underlying service of the third party
        service provider or collaborator. For the avoidance of doubt, in this
        Privacy Policy, a reference to a third party service provider or
        collaborator includes other third parties who provide a service or
        collaborate with our third party service provider or collaborator.
      </li>
      <li>
        If you provide us with personally identifiable data:
        <ol>
          <li>
            We may use, disclose and process the data for any one or more of the
            following purposes:
            <ol>
              <li>
                to assist, process and facilitate your access or use of the
                Service;
              </li>
              <li>
                to administer, process and facilitate any transactions or
                activities by you, whether with us or any other Public Sector
                Entity or third party service provider or collaborator, and
                whether for your own benefit, or for the benefit of a third
                party on whose behalf you are duly authorized to act;
              </li>
              <li>
                to carry out your instructions or respond to any queries,
                feedback or complaints provided by (or purported to be provided
                by) you or on your behalf, or otherwise for the purposes of
                responding to or dealing with your interactions with us;
              </li>
              <li>
                to monitor and track your usage of the Service, to conduct
                research, data analytics, surveys, market studies and similar
                activities, in order to assist us in understanding your
                interests, concerns and preferences and improving the Service
                (including any service of a third party service provider or
                collaborator) and other services and products provided by Public
                Sector Entities. For the avoidance of doubt, we may also
                collect, use, disclose and process such information to create
                reports and produce statistics regarding your transactions with
                us and your usage of the Services and other services and
                products provided by Public Sector Entities for record-keeping
                and reporting or publication purposes (whether internally or
                externally);
              </li>
              <li>
                for the purposes of storing or creating backups of your data
                (whether for contingency or business continuity purposes or
                otherwise), whether within or outside Singapore;
              </li>
              <li>
                to enable us to contact you or communicate with you on any
                matters relating to your access or use of the Service, including
                but not limited to the purposes set out above, via email, push
                notifications or such other forms of communication that we may
                introduce from time to time depending on the functionality of
                the Service and/or your device.
              </li>
            </ol>
          </li>
        </ol>
      </li>
      <li>
        Please note that we may be required to disclose your data by law,
        including any law governing the use/provision of any service of a third
        party service provider or collaborator.
      </li>
      <li>
        To safeguard your personal data, all electronic storage and transmission
        of personal data is secured with appropriate security technologies.
      </li>
      <li>
        You may withdraw your consent to the use and disclosure of your data by
        us with reasonable notice and subject to any prevailing legal or
        contractual restrictions; however, doing so may prevent the proper
        functioning of the Service and may also result in the cessation of the
        Service to you.
      </li>
      <li>
        The Service may contain links to external sites whose data protection
        and privacy practices may differ from ours. We are not responsible for
        the content and privacy practices of these other websites and encourage
        you to consult the privacy notices of those sites.
      </li>
      <li>
        Please contact Info@tech.gov.sg if you:
        <ol>
          <li>
            have any enquires or feedback on our data protection policies and
            procedures; or
          </li>
          <li>
            need more information on or access to data which you have provided
            to us in the past.
          </li>
        </ol>
      </li>
    </ol>
    This version of the Privacy Policy is dated 26 April 2018.
  </div>
);

const Content = () => (
  <div className={styles.main}>
    <Header />
    <Policy />
  </div>
);

export default Content;
