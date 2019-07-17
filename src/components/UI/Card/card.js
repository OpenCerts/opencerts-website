import PropTypes from "prop-types";
import css from "./card.scss";

const Card = props => (
  <div
    id={props.info.id}
    className={`col-lg-4 col-md-6 col-sm-12 ${css["mb-3"]} ${css["m-pd-0"]}`}
    style={{ paddingBottom: "36px", wordWrap: "break-word" }}
  >
    <a
      href={props.info.website}
      target="_blank"
      rel="noopener noreferrer nofollow"
      style={{ color: "#000", textDecoration: "none" }}
    >
      <div className={css["partner-block"]}>
        <img
          className={`${css.logo}`}
          src={props.info.logo}
          id={css[props.info.key]}
        />
        <h4 className={css["partner-name"]} style={{ fontWeight: "bold" }}>
          {props.info.name}
        </h4>
        {props.info.address ? (
          <div>
            Certificate Store:{" "}
            <a href={`https://etherscan.io/address/${props.info.address}`}>
              {props.info.address}
            </a>
          </div>
        ) : (
          ""
        )}
        {props.info.address && props.info.website ? (
          <div>
            Website:{" "}
            <a
              href={props.info.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.info.website}
            </a>
          </div>
        ) : (
          ""
        )}
        {props.info.email ? (
          <div>
            Email: <a href={`mailto:${props.info.email}`}>{props.info.email}</a>
          </div>
        ) : (
          ""
        )}
        {props.info.phone ? (
          <div>
            Phone: <a href={`tel:${props.info.phone}`}>{props.info.phone}</a>
          </div>
        ) : (
          ""
        )}
        {props.info.description ? <div>{props.info.description}</div> : ""}
      </div>
    </a>
  </div>
);

export default Card;

Card.propTypes = {
  info: PropTypes.object
};
