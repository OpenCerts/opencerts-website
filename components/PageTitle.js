import PropTypes from "prop-types";

const PageTitle = ({ text }) => (
  <div>
    <h1>{text}</h1>
  </div>
);

PageTitle.propTypes = {
  text: PropTypes.string
};

export default PageTitle;
