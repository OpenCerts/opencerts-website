// import _ from "lodash";
import React, { useEffect, useState } from "react";
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

const searchThreshold = 2; // a typical address starts with `0x`, hence length 2

export const RegistryCard: React.FunctionComponent<RegistryCardProps> = ({ zIndex, search, contact }) => {
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpand(false);
    };

    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  useEffect(() => {
    if (search.length <= searchThreshold) setExpand(false);
    if (search.length > searchThreshold) setExpand(true);
  }, [search]);

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
        <div
          className={`${css.contact} ${expand ? css["is-active"] : ""}`}
          onClick={() => {
            setExpand(!expand);
          }}
        >
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
