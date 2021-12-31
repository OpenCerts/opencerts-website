import Link from "next/link";
import React from "react";

export const FooterBar: React.FunctionComponent = () => (
  <footer className="flex-shrink-0 bg-navy text-white py-2">
    <div className="container pt-8 pb-12">
      <div className="flex flex-wrap">
        <div className="w-40 lg:mr-40 mb-8 lg:mb-0">
          <h6 className="font-montserrat font-bold mb-2">Powered by</h6>
          <a
            className="inline-block transition-opacity hover:opacity-75"
            href="https://hive.tech.gov.sg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/static/images/common/gds-logo.svg" alt="Government Digital Services logo" />
          </a>
        </div>
        <div className="w-full lg:w-40 mb-8 lg:mb-0">
          <h6 className="font-montserrat font-bold mb-2">Partners</h6>
          <ul className="text-sm">
            <li>
              <Link href="/collaborate">
                <a>Collaborate</a>
              </Link>
            </li>
            <li>
              <a href="https://go.gov.sg/opencerts-feedback" target="_blank" rel="noopener noreferrer">
                Feedback
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-40 mb-8 lg:mb-0">
          <h6 className="font-montserrat font-bold mb-2">Support</h6>
          <ul className="text-sm">
            <li>
              <Link href="/faq">
                <a>FAQ</a>
              </Link>
            </li>
            <li>
              <a href="https://github.com/OpenCerts" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://docs.opencerts.io/docs/" target="_blank" rel="noopener noreferrer">
                Documentation
              </a>
            </li>
            <li>
              <a href="https://docs.opencerts.io/blog/" target="_blank" rel="noopener noreferrer">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-40">
          <h6 className="font-montserrat font-bold mb-2">Legal</h6>
          <ul className="text-sm">
            <li>
              <Link href="/privacy">
                <a>Privacy Policy</a>
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <a>Terms of Use</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="border-t border-gray-600" />
      <p className="text-center text-xs py-4">Copyright © 2020 OpenCerts</p>
    </div>
  </footer>
);
