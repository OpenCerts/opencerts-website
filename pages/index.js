import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import PageTitle from '../components/PageTitle'
import PeopleTableContainer from '../components/PeopleTableContainer'

const IndexPage = ({ text }) => {
  return (
    <div>
      <PageTitle text='Hello World'/>
      <PeopleTableContainer/>
    </div>
  )
}


export default withRedux(initStore)(IndexPage)
