import Link from "next/link";
import React from "react";

const copyrightYear = new Date().getFullYear();

export const FooterBar: React.FunctionComponent = () => (
  <footer className="flex-shrink-0 bg-navy text-white py-2">
    <div className="container pt-8 pb-12">
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-40 mb-8 lg:mb-0">
          <p className="font-poppins font-bold mb-2">Support</p>
          <ul className="text-sm">
            <li>
              <Link legacyBehavior href="/faq">
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
          </ul>
        </div>
        <div className="w-full lg:w-40">
          <p className="font-poppins font-bold mb-2">Legal</p>
          <ul className="text-sm">
            <li>
              <Link legacyBehavior href="/privacy">
                <a>Privacy Policy</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/terms">
                <a>Terms of Use</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="border-t border-gray-600" />
      <p className="text-center text-xs py-4">Copyright © {copyrightYear} OpenCerts</p>
    </div>
  </footer>
);
