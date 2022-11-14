import React from "react";

interface HeroProps {
  heading: string;
  subHeading?: string;
  children?: React.ReactNode;
}

export const Hero: React.FunctionComponent<HeroProps> = ({ heading, subHeading, children }: HeroProps) => (
  <section className={`bg-navy text-white pt-6 pb-12`}>
    <div className="container">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-auto lg:mr-20">
          <h1 className="font-montserrat">{heading}</h1>
        </div>
        <div className="w-full" style={{ maxWidth: "410px" }}>
          {subHeading && <h3 className="font-montserrat mb-6">{subHeading}</h3>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  </section>
);
