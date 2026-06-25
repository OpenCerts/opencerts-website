import React, { ReactNode } from "react";

interface FagElement {
  category: string;
  subtitle?: string;
  faq: { question: string; answer: ReactNode; id?: string }[];
}
export const faqContent: FagElement[] = [
  {
    category: "General",
    subtitle: "What OpenCerts is and how to get a certificate",
    faq: [
      {
        question: "What is OpenCerts?",
        answer: (
          <>
            <p>OpenCerts is the umbrella trademark under which we have released a few key components:</p>
            <ol className="list-decimal pl-8">
              <li>
                An{" "}
                <a href="https://github.com/OpenCerts/open-certificate" target="_blank" rel="noopener noreferrer">
                  open source schema
                </a>{" "}
                for publishing educational credentials{" "}
              </li>
              <li>
                <a href="https://github.com/OpenCerts/certificate-cli" target="_blank" rel="noopener noreferrer">
                  {" "}
                  A set of tools
                </a>{" "}
                for generating cryptographic protections for educational credentials{" "}
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
          </>
        ),
      },
      {
        question: "How do I send my OpenCerts certificate to someone?",
        answer: (
          <p>
            You may use the email button that is visible when you view your certificate, or you can simply email the
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
    ],
  },

  {
    category: "Verifying your certificate",
    subtitle: "What the verifier checks, and what the results mean",
    faq: [
      {
        question: "How does certificate verification work?",
        answer: (
          <>
            <p>
              When you drop a certificate onto opencerts.io, three key verifications are performed. All three must pass
              for the certificate to be marked as verified.
            </p>
            <ol className="list-decimal pl-8">
              <li>
                <strong>Document integrity.</strong> Every OpenCerts certificate is sealed when it's issued. If anyone
                changes anything inside the file afterwards — even a single character in a name, a date, or a grade —
                the seal breaks and verification fails.
              </li>
              <li>
                <strong>Issuer's identity.</strong> Each institution publishes proof on its own official website domain.
                OpenCerts checks the certificate against that proof, and if it claims to be from somewhere it isn't,
                this check fails.
              </li>
              <li>
                <strong>Document status.</strong> Sometimes a certificate needs to be withdrawn after it's been issued —
                for example, if it was issued in error. Institutions can mark a certificate as revoked, and OpenCerts
                checks for this. A revoked certificate may still be authentic, but it is no longer valid.
              </li>
            </ol>
            <p>If all three checks pass, you can trust that the certificate is real, unchanged, and currently valid.</p>
          </>
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
        question: "What happens if I modify the OpenCerts file?",
        answer: <p>The modified certificate will fail validation and show up as having been tampered with.</p>,
      },
      {
        question: "Can anyone copy my certificate file and pretend to be me?",
        answer: (
          <p>
            Yes, the certificate file can trivially be duplicated. However, the recipient's name in the certificate
            cannot be altered without failing our verification process. Thus it is extremely important that the person
            doing the verification ensures that the recipient indicated in the certificate is actually the entity
            presenting the certificate.
          </p>
        ),
      },
    ],
  },

  {
    category: "About the technology",
    subtitle: "For the curious, and for issuers planning a migration",
    faq: [
      {
        question: "Is my personal data safe?",
        answer: (
          <>
            <p>
              Yes. Your personal information stays inside the certificate file itself — it isn't published to any
              external registry or database when the certificate is issued or verified.
            </p>
            <p>
              When OpenCerts checks whether a certificate is authentic, it doesn't upload the certificate or its
              contents anywhere. The check works by comparing the certificate against proof that the issuing institution
              has publicly declared on their own domain. Nothing about you, the recipient, is involved in that public
              proof.
            </p>
          </>
        ),
      },
      {
        question: "What is a digital signature?",
        answer: (
          <>
            <p>
              A digital signature is the cryptographic &ldquo;seal&rdquo; that proves an OpenCerts certificate is
              genuine and unaltered. When an institution issues a certificate, it adds a signature that is
              mathematically tied to the exact contents of that certificate and to the institution itself.
            </p>
            <p>Two things follow from this:</p>
            <ol className="list-decimal pl-8">
              <li>
                <strong>If anything inside the certificate changes</strong> — a name, a date, a grade, even a single
                character — the signature no longer matches, and verification fails. There's no way to edit a
                certificate without breaking its signature.
              </li>
              <li>
                <strong>Only the issuing institution could have produced the signature.</strong> It can't be forged by
                someone else and then attributed to the institution, because the signature depends on information that
                only the institution controls.
              </li>
            </ol>
            <p>
              So when OpenCerts shows that a certificate is verified, it means both that the file is exactly as the
              institution issued it, and that the institution itself produced it.
            </p>
          </>
        ),
      },
      {
        question: "What are W3C Verifiable Credentials and TrustVC?",
        answer: (
          <>
            <p>
              <strong>W3C Verifiable Credentials</strong> is an international open standard for digital credentials — a
              common set of rules for how any digital certificate can be issued and verified online. It's developed by
              the World Wide Web Consortium (W3C), the same body responsible for the standards behind the web itself.
            </p>
            <p>
              The standard matters because it means a digital certificate isn't tied to one country's system or one
              company's software. A credential issued under the W3C standard can be checked by anyone, anywhere, using
              compatible tools.
            </p>
            <p>
              <strong>TrustVC</strong> is Singapore's open-source implementation of that standard, maintained by IMDA.
              It's the framework now used to issue new OpenCerts certificates.
            </p>
            <p>
              In practice, this means OpenCerts now works the same way as a growing number of digital credential systems
              around the world. That makes it easier for your certificates to be recognised across borders, and for
              OpenCerts to keep up with how digital credentials are evolving internationally.
            </p>
          </>
        ),
      },
      {
        question: "Are older OpenCerts certificates still valid?",
        answer: (
          <p>
            Yes. Certificates issued under the older OpenAttestation standard continue to be accepted on opencerts.io.
            No action is needed by recipients.
          </p>
        ),
      },
      {
        question: "I'm an educational institution — where do I find migration resources?",
        answer: (
          <p>
            Institutions should migrate to TrustVC by 30 June 2027. Visit{" "}
            <a href="https://trustvc.io/contact" target="_blank" rel="noopener noreferrer">
              trustvc.io/contact
            </a>{" "}
            to get in touch with the team for migration support.
          </p>
        ),
      },
    ],
  },
];
