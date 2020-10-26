import React from "react";
// import css from "./card.module.scss";

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
  <div id={props.info[0].id} className="px-4 pb-8 break-words md:w-1/3 flex flex-col cursor-pointer">
    <div
      className="p-6 rounded-lg px-4 bg-gray-200 flex-1"
      key={props.info[0].id}
      onClick={() => window.open(props.info[0].website)}
    >
      <h3 className="font-montserrat font-bold px-4">{props.info[0].name}</h3>
      <img className="h-12 max-w-10 mx-auto m-6" src={props.info[0].logo} />
      {props.info.map((info, index) => (
        <div className="p-4" key={info.id}>
          {info.address ? (
            <div>
              {index > 0 && `${info.name} `}
              Certificate Store:{" "}
              <a href={`https://etherscan.io/address/${info.address}`} onClick={(event) => event.stopPropagation()}>
                {info.address}
              </a>
            </div>
          ) : (
            ""
          )}
          {info.address && info.website ? (
            <div>
              Website:{" "}
              <a href={info.website} target="_blank" rel="noopener noreferrer">
                {info.website}
              </a>
            </div>
          ) : (
            ""
          )}
          {info.email ? (
            <div>
              Email: <a href={`mailto:${info.email}`}>{info.email}</a>
            </div>
          ) : (
            ""
          )}
          {info.phone ? (
            <div>
              Phone: <a href={`tel:${info.phone}`}>{info.phone}</a>
            </div>
          ) : (
            ""
          )}
          {info.description ? <div>{info.description}</div> : ""}
        </div>
      ))}
    </div>
  </div>
);
