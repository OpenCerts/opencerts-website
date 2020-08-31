import React, { useState } from "react";
import css from "./RegistryCard.module.scss";

interface RegistryCardProps {
  info: {
    id: string;
    website: string;
    name: string;
    address?: string;
    logo: string;
    email?: string;
    phone?: string;
    description: string;
  }[];
}

export const RegistryCard: React.FunctionComponent<RegistryCardProps> = (props) => {
  const [contactInfo, setContactInfo] = useState(false);

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className={`${css.card}`}>
        <div className={`${css.logo}`}>
          <img className="img-fluid" src={props.info[0].logo} alt="" />
        </div>
        <div className={`${css.content}`}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h5>{props.info[0].name}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className={`${css.contact}`}>
          <div
            className={`${css.button} ${contactInfo ? css["is-active"] : ""}`}
            role="button"
            onClick={() => {
              setContactInfo(!contactInfo);
            }}
          >
            Contact Info
          </div>
          {contactInfo && (
            <div className={`${css["contact-info"]}`}>
              <div className={`${css["contact-info-content"]} py-3`}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      {props.info.map((info) => (
                        <div key={info.id} className="py-2">
                          {info.name && <h6 className="mb-2">{info.name}</h6>}
                          {info.address && info.website && (
                            <div>
                              <a href={info.website} target="_blank" rel="noopener noreferrer">
                                {info.website}
                              </a>
                            </div>
                          )}
                          {info.email && (
                            <div>
                              <a href={`mailto:${info.email}`}>{info.email}</a>
                            </div>
                          )}
                          {info.phone && (
                            <div>
                              <a href={`tel:${info.phone}`}>{info.phone}</a>
                            </div>
                          )}
                          {info.description && <div>{info.description}</div>}
                          {info.address && (
                            <div className="mt-2">
                              <div className="text-uppercase">Certificate Store:</div>
                              <a
                                href={`https:etherscan.io/address/${info.address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {info.address}
                              </a>
                            </div>
                          )}
                          <br />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
