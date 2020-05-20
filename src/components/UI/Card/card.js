import PropTypes from "prop-types";
import React from "react";
import css from "./card.scss";

const Card = (props) => (
  <div
    id={props.info[0].id}
    className={`col-lg-4 col-md-6 col-sm-12 ${css["mb-3"]} ${css["m-pd-0"]}`}
    style={{ paddingBottom: "36px", wordWrap: "break-word" }}
  >
    <span
      onClick={() => window.open(props.info[0].website)}
      style={{ color: "#000", textDecoration: "none", cursor: "pointer" }}
    >
      <div className={css["partner-block"]} key={props.info[0].id}>
        <h4 className={css["partner-name"]} style={{ fontWeight: "bold" }}>
          {props.info[0].name}
        </h4>
        <img className={`${css.logo}`} src={props.info[0].logo} />
        {props.info.map((info, index) => (
          <div key={info.id} className={css["partner-info"]}>
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
    </span>
  </div>
);

export default Card;

Card.propTypes = {
  info: PropTypes.array,
};
