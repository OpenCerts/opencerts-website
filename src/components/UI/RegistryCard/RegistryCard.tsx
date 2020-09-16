// import _ from "lodash";
import React from "react";
import css from "./RegistryCard.module.scss";

interface RegistryCardProps {
  zIndex: number;
  search: string;
  contact: {
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

export const RegistryCard: React.FunctionComponent<RegistryCardProps> = ({ zIndex, search, contact }) => {
  const hasAddress = contact.find((info) => info.address?.includes(search));
  if (!hasAddress) return null;

  return (
    <div className="col-lg-4 col-md-6 col-sm-12" style={{ zIndex: zIndex }}>
      <div className={`${css.card}`} data-testid="registry-card">
        <div className={`${css.logo}`}>
          <img className="img-fluid" src={contact[0].logo} alt="" data-testid="institute-logo" />
        </div>
        <div className={`${css.content}`}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h5 data-testid="institute-name">{contact[0].name}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className={`${css.contact}`} tabIndex={0}>
          <div className={`${css.button}`} role="button" data-testid="btn-contact">
            Contact Info
          </div>
          <div className={`${css["contact-info"]}`} data-testid="contact-info">
            <div className={`${css["contact-info-content"]} py-3`}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    {contact.map(
                      (info) =>
                        info.address?.includes(search) && (
                          <div key={info.id} className="py-2" data-testid="info">
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
                                  href={`https://etherscan.io/address/${info.address}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {info.address}
                                </a>
                              </div>
                            )}
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
