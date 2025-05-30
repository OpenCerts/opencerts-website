import React from "react";
import { Card } from "../UI/Card/card";
import { Hero } from "../UI/Hero";
import collaborators from "./collaborators.json";

export const CollaboratePage: React.FunctionComponent = () => (
  <>
    <Hero heading="Collaborate">
      <p>
        If you are from an institution and need help issuing certificates on OpenCerts, here are some companies you may
        want to contact.
      </p>
      <p>
        Do note that being on this list implies that these companies have demonstrated knowledge of implementing
        OpenCerts, but does not imply endorsement by GovTech.
      </p>
    </Hero>
    <section className="py-8">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          {collaborators.map((collaborator, index) => (
            <Card key={index} info={[collaborator]} />
          ))}
        </div>
      </div>
    </section>
  </>
);
