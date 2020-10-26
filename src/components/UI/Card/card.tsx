import React from "react";

interface CardProps {
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
export const Card: React.FunctionComponent<CardProps> = (props) => (
  <div id={props.info[0].id} className="flex w-full md:w-1/2 lg:w-1/3 px-4 mb-8 break-words cursor-pointer">
    <div
      className="flex-1 p-6 bg-gray-200 rounded-lg"
      key={props.info[0].id}
      onClick={() => window.open(props.info[0].website)}
    >
      <h3 className="font-montserrat font-bold">{props.info[0].name}</h3>
      <img className="h-12 max-w-10 mx-auto m-6" src={props.info[0].logo} />
      {props.info.map((info, index) => (
        <div className="links-blue" key={info.id}>
          {info.address && (
            <p>
              {index > 0 && `${info.name} `}
              Certificate Store:{" "}
              <a href={`https://etherscan.io/address/${info.address}`} onClick={(event) => event.stopPropagation()}>
                {info.address}
              </a>
            </p>
          )}
          {info.address && info.website && (
            <p>
              Website:{" "}
              <a href={info.website} target="_blank" rel="noopener noreferrer">
                {info.website}
              </a>
            </p>
          )}
          {info.email && (
            <p>
              Email: <a href={`mailto:${info.email}`}>{info.email}</a>
            </p>
          )}
          {info.phone && (
            <p>
              Phone: <a href={`tel:${info.phone}`}>{info.phone}</a>
            </p>
          )}
          {info.description && <p>{info.description}</p>}
        </div>
      ))}
    </div>
  </div>
);
