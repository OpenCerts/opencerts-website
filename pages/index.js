import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, fetchData } from '../store'
import withRedux from 'next-redux-wrapper'
import Page from '../components/Page'

class Counter extends React.Component {
  static getInitialProps ({ store, isServer }) {
    return { isServer }
  }

  componentDidMount () {
    //this.timer = this.props.startClock()
    this.props.fetchData();
  }

  componentWillUnmount () {
    //clearInterval(this.timer)
  }

  render () {
    return (
      <Page title='Index Page' linkTo='/other' />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData()),
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Counter)
