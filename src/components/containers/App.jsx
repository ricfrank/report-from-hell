import React from 'react'
import ProjectIssuesList from './ProjectIssuesList.jsx'
import ProjectsList from './ProjectsList.jsx'
import SearchBox from './SearchBox.jsx'
import Authentication from './Authentication.jsx'
import {connect} from 'react-redux';
import {getProjects} from '../../actions'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(getProjects());
  }

  render() {
    return (
      <div>
        <Authentication />
        <ProjectsList />
        <SearchBox/>
        <ProjectIssuesList />
      </div>
    )
  }
}
export default connect()(App);