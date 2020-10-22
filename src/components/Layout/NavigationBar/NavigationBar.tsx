import Link from "next/link";
import React from "react";

const navItems: { id: string; label: string; path: string }[] = [
  {
    id: "registry",
    label: "Registry",
    path: "/registry",
  },
  {
    id: "collaborate",
    label: "Collaborate",
    path: "/collaborate",
  },
  {
    id: "faq",
    label: "FAQ",
    path: "/faq",
  },
];

export const NavigationBar: React.FunctionComponent = () => (
  <nav className="bg-navy py-6">
    <div className="container">
      <div className="flex flex-wrap items-center">
        <div className="w-1/3 md:w-1/4 lg:w-1/6 mr-auto mb-6 md:mb-0">
          <Link href="/">
            <a className="font-montserrat">
              <img src="/static/images/opencertslogo.svg" alt="OpenCerts" />
            </a>
          </Link>
        </div>
        {navItems.map((n, i) => (
          <div className="w-full md:w-auto md:pl-8 mb-2 md:mb-0" key={i}>
            <Link href={n.path}>
              <a className="font-montserrat">{n.label}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </nav>
);
