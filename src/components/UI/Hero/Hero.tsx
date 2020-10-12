import React from "react";
import css from "./Hero.module.scss";

interface HeroProps {
  heading: string;
  subHeading?: string;
  children?: React.ReactNode;
}

export const Hero: React.FunctionComponent<HeroProps> = ({ heading, subHeading, children }: HeroProps) => (
  <section className={`bg-brand-dark text-white ${css["sec-hero"]}`}>
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-3 mb-4 mb-lg-0">
          <h1>{heading}</h1>
        </div>
        <div className="col-12 col-lg-5">
          <div className={`${css["hero-content"]}`}>
            {subHeading && <h5 className="mb-3">{subHeading}</h5>}
            {children}
          </div>
        </div>
      </div>
    </div>
  </section>
);
