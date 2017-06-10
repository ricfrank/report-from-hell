import React from 'react'
import {connect} from 'react-redux';
import {getProjects} from '../actions'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(getProjects());
  }

  render() {
    return (
      <div>
        <h1>CIAO</h1>
      </div>
    )
  }
}
export default connect()(Home);
