import PropTypes from "prop-types";

const Template = ({ certificate }) => (
  <div
    style={{ overflow: "hidden", paddingTop: "56.25%", position: "relative" }}
  >
    <iframe
      style={{
        height: "100%",
        left: "0px",
        top: "0px",
        width: "100%",
        position: "absolute"
      }}
      src="https://www.youtube.com/embed/oskddwGpwUw?autoplay=1"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Template;
