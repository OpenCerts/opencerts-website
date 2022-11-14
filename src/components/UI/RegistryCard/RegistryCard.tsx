import React, { useEffect, useState } from "react";

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
    const keydownHandler = (event: KeyboardEvent): void => {
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
    <div className="w-full md:w-1/2 lg:w-1/3 px-4" style={{ zIndex: zIndex }}>
      <div className="ie-fix-min-height">
        <div
          className="relative flex flex-col bg-navy-200 mb-32"
          style={{ minHeight: "210px" }}
          data-testid="registry-card"
        >
          <div
            className="absolute bg-white flex items-center p-4 left-1/2 border border-gray-300"
            style={{ marginTop: "-60px", marginLeft: "-90px", width: "180px", height: "120px" }}
          >
            <img
              className="max-h-full mx-auto ie-fix-img-width"
              src={contact[0].logo}
              alt=""
              data-testid="institute-logo"
            />
          </div>
          <div className="flex-1 pt-16 px-4">
            <h4 className="font-montserrat font-bold" data-testid="institute-name">
              {contact[0].name}
            </h4>
          </div>
          <div className="relative">
            <div
              className={`ease-colors text-white uppercase font-bold text-center p-2 ${
                expand ? "bg-orange" : "bg-navy-300 hover:bg-navy"
              }`}
              role="button"
              data-testid="btn-contact"
              onClick={() => {
                setExpand(!expand);
              }}
            >
              Contact Info
            </div>
            <div
              className={`absolute w-full bg-white shadow-xl left-0 ${expand ? "block" : "hidden"}`}
              data-testid="contact-info"
            >
              <div className="relative overflow-auto py-3" style={{ maxHeight: "360px" }}>
                {contact.map(
                  (info) =>
                    info.address?.includes(search) && (
                      <div key={info.id} className="p-4" data-testid="info">
                        {info.name && <h5 className="font-bold font-montserrat mb-4">{info.name}</h5>}
                        {info.address && info.website && (
                          <a
                            className="block text-gray-700 hover:text-gray-700 hover:underline"
                            href={info.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {info.website}
                          </a>
                        )}
                        {info.email && (
                          <a
                            className="block text-gray-700 hover:text-gray-700 hover:underline"
                            href={`mailto:${info.email}`}
                          >
                            {info.email}
                          </a>
                        )}
                        {info.phone && (
                          <a
                            className="block text-gray-700 hover:text-gray-700 hover:underline"
                            href={`tel:${info.phone}`}
                          >
                            {info.phone}
                          </a>
                        )}
                        {info.description && <div>{info.description}</div>}
                        {info.address && (
                          <div className="mt-4">
                            <div className="text-uppercase">Certificate Store:</div>
                            <a
                              className="block text-gray-700 hover:text-gray-700 hover:underline break-words"
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
  );
};
