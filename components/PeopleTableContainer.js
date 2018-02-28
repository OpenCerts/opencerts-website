import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchData, getPeople } from '../reducers/content'
import PeopleTable from './PeopleTable'

class PeopleTableContainer extends Component {
  componentWillMount(){
    this.props.fetchData()
  }

  render () {
    const { people, fetchData} = this.props
    return (
      <PeopleTable
        people={people}
        fetchData={fetchData}
      />
    )
  }
}

const mapStateToProps = (store) => ({
  people: getPeople(store),
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleTableContainer)
