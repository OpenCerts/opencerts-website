import React, { ReactNode } from "react";

interface FagElement {
  category: string;
  faq: { question: string; answer: ReactNode; id?: string }[];
}
export const faqContent: FagElement[] = [
  {
    category: "General",
    faq: [
      {
        question: "Who developed OpenCerts?",
        answer: (
          <p>
            <a href="https://www.tech.gov.sg/">GovTech Singapore</a> developed OpenCerts in cooperation with the
            OpenCerts Consortium.
          </p>
        ),
      },
      {
        question: "What is OpenCerts?",
        answer: (
          <>
            <p>OpenCerts is the umbrella trademark under which we have released a few key components:</p>
            <ol className="list-decimal pl-8">
              <li>
                An <a href="https://github.com/OpenCerts/open-certificate">open source schema</a> for publishing
                educational credentials{" "}
              </li>
              <li>
                <a href="https://github.com/OpenCerts/certificate-cli"> A set of tools</a> for generating cryptographic
                protections for educational credentials{" "}
              </li>
              <li>This online website for verifying the authenticity of OpenCerts files.</li>
            </ol>
          </>
        ),
      },
      {
        question: "Where do I get an OpenCerts certificate?",
        answer: (
          <>
            <p>
              OpenCerts is an open source platform which education institutions can adopt for issuing certificates.
              Please contact your education institute’s administrative office for enquiries on whether your certificate
              was issued in the OpenCerts format.{" "}
            </p>
            <p>
              For institutions under the SkillsFuture Singapore (SSG){" "}
              <a href="http://www.opencerts.io/registry" target="_blank" rel="noopener noreferrer">
                registry
              </a>
              , certificates issued can be viewed on your{" "}
              <a
                href="https://www.myskillsfuture.sg/content/portal/en/individual/skills-passport.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Skills Passport
              </a>
              . Please refer to the{" "}
              <a
                href="https://www.myskillsfuture.sg/content/portal/en/header/faqs/SkillsPassport.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                FAQs
              </a>{" "}
              on the current certificates available on Skills Passport.
            </p>
          </>
        ),
      },
      {
        question: "Is my personal data safe on the blockchain?",
        answer: (
          <p>
            Academic records of the certificate and personal data are not published on the blockchain. A hash is
            generated from the certificate and is used to prove that the certificate is legitimate. The process of
            computing the hash from the certificate is not reversible. Since the hash is the only information published
            into the blockchain, no personal information can be obtained from content on the blockchain.
          </p>
        ),
      },
      {
        question: "Why is OpenCerts backed by blockchain technology?",
        answer: (
          <p>
            Using blockchain, we can greatly reduce the barrier to entry of publishing cryptographically protected
            educational credentials, as compared to currently existing costly proprietary software. In addition, a
            public blockchain is owned and maintained by the community and is easily accessible by anyone. As a result,
            there is no need to run or maintain services to verify OpenCerts.
          </p>
        ),
      },
      {
        question: "Why use the Ethereum blockchain?",
        answer: (
          <p>
            Ethereum is the blockchain network with the largest developer base, as well as having a large number of
            participants securing the network.
          </p>
        ),
      },
      {
        question: "How do I send my OpenCerts certificate to someone?",
        answer: (
          <p>
            You may use the share button that is visible when you view your certificate, or you can simply email the
            OpenCerts file to them.
          </p>
        ),
      },
      {
        question: "Why can't I print the certificate?",
        answer: (
          <p>
            Printing the certificate discards all the advanced cryptographic protections we have built into OpenCerts,
            hence printed certificates are not to be considered authentic.
          </p>
        ),
      },
      {
        question: "What happens if I modify the OpenCerts file?",
        answer: <p>The modified certificate will fail validation and show up as having been tampered with.</p>,
      },
      {
        question: "What does it mean by Signature?",
        answer: (
          <p>
            In every properly issued OpenCerts certificate file, there is a hash-based message authentication code which
            cryptographically certifies that the content of the certificate has not been altered. If you would like to
            know more about the technical nitty-gritty of how this works, check out our{" "}
            <a href="https://docs.opencerts.io">technical documentation</a>.
          </p>
        ),
      },
    ],
  },

  {
    category: "Verifications",
    faq: [
      {
        question: "What does it mean by Unascertained Issuer?",
        answer: (
          <p>
            OpenCerts has to maintain a list of identified issuing institutes in order to detect fraudulent issuing
            institutes masquerading as legitimate ones. At this point in time, it is not unlikely that a legitimate
            issuing institute is not on our list of recognised institutions. If you are sure that your certificate is
            from a legitimate issuer, contact the institute directly.
          </p>
        ),
      },
      {
        question: "What does it mean by Ethereum Blockchain?",
        answer: (
          <p>
            The Ethereum Blockchain is a publicly usable distributed ledger based on blockchain technology. You can
            think of it as a publicly readable database.
          </p>
        ),
      },
      {
        question: "What does it mean by Revoked?",
        answer: (
          <p>
            The issuer has explicitly published a notice of revocation for this certificate and it is no longer a valid
            certificate.
          </p>
        ),
      },
      {
        question: "Is this safe to use? Can't anyone just copy my certificate file and pass off as me?",
        answer: (
          <p>
            Yes, the certificate file can trivially be duplicated. However, the recipient's name in the certificate
            cannot be altered without failing our verification process. Thus it is extremely important that the person
            doing the verification ensures that the recipient indicated in the certificate is actually the entity
            presenting the certificate. For more advanced institutions, there is the possibility of using Distributed
            IDs to associate the certificate recipient's public key for further authentication using public/private key
            signing in the future.
          </p>
        ),
      },
    ],
  },

  {
    category: "Institutes",
    faq: [
      {
        question: "How can I add my institute to the list of recognised issuers?",
        answer: (
          <p>
            Please see our{" "}
            <a
              href="https://docs.opencerts.io/docs/registry#application-to-skillsfuture-singapore"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>
            .
          </p>
        ),
      },
      {
        question: "How can I change the appearance of the certificates I issue?",
        answer: (
          <p>
            Each certificate can have a 'template' field. This field identifies the template to be used for that
            certificate. Once you are a recognised issuer, you may submit a pull request at our GitHub repository to add
            your certificate template to the verification site.
          </p>
        ),
      },
    ],
  },
];
