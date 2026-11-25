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
    {/* The whole card opens the website: the name is the real link, and its ::after stretches
        over the card. The links inside sit above it (relative z-10) so they stay clickable. */}
    <div className="relative flex-1 p-6 bg-gray-200 rounded-lg" key={props.info[0].id}>
      <h2 className="font-poppins font-bold text-lg">
        <a
          href={props.info[0].website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-inherit hover:text-inherit after:content-[''] after:absolute after:inset-0"
        >
          {props.info[0].name}
        </a>
      </h2>
      <img className="h-12 mx-auto m-6" src={props.info[0].logo} alt={props.info[0].name} />
      {props.info.map((info, index) => (
        <div className="links-blue" key={info.id}>
          {info.address && (
            <p>
              {index > 0 && `${info.name} `}
              Certificate Store:{" "}
              <a className="relative z-10" href={`https://etherscan.io/address/${info.address}`}>
                {info.address}
              </a>
            </p>
          )}
          {info.address && info.website && (
            <p>
              Website:{" "}
              <a className="relative z-10" href={info.website} target="_blank" rel="noopener noreferrer">
                {info.website}
              </a>
            </p>
          )}
          {info.email && (
            <p>
              Email:{" "}
              <a className="relative z-10" href={`mailto:${info.email}`}>
                {info.email}
              </a>
            </p>
          )}
          {info.phone && (
            <p>
              Phone:{" "}
              <a className="relative z-10" href={`tel:${info.phone}`}>
                {info.phone}
              </a>
            </p>
          )}
          {info.description && <p>{info.description}</p>}
        </div>
      ))}
    </div>
  </div>
);
