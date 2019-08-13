import React from "react";
import { useRouter } from "next/router";

class ViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      encryptionKey: ""
    };
  }

  componentDidMount() {
    const hash = window.location.hash;

    this.setState({
      encryptionKey: hash
    });
  }

  render() {
    const router = useRouter();
    const { id } = router.query;
    return `${JSON.stringify(id, this.state.encryptionKey)}`;
  }
}

export default ViewPage;
