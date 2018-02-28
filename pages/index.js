import withRedux from "next-redux-wrapper";
import initStore from "../store";
import PageTitle from "../components/PageTitle";
import PeopleTableContainer from "../components/PeopleTableContainer";

const IndexPage = () => (
  <div>
    <PageTitle text="Hello World" />
    <PeopleTableContainer />
  </div>
);

export default withRedux(initStore)(IndexPage);
