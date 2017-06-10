import React from 'react'
import ProjectsList from './components/ProjectsList.jsx'
import Authentication from './components/Authentication.jsx'
import {connect} from 'react-redux';
import {getProjects} from './actions'

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
        {this.props.children}
      </div>
    )
  }
}
export default connect()(App);
