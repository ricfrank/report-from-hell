import React from 'react'
import {connect} from 'react-redux'
// import _ from 'lodash';
// import Project from '../presentationals/Project.jsx';
// import {getProjectIssues} from '../../actions'

class Searchbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-10 rfh-no-padding">
        <input className="form-control rfh-search-box" type="text" placeholder="Search yuor issue"/>
      </div>
    )
  }
}


//
// const mapStateToProps = (state) => {
//
//   if (_.isUndefined(state.projects.projects)) {
//     return {projects: []}
//   }
//
//   if (!_.isEmpty(state.projects.error)) {
//     alert(state.projects.error.data + '\n' + state.projects.error.status + '\n');
//     return;
//   }
//
//   return {projects: state.projects.projects}
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onProjectClick: (projectId) => {
//       dispatch(getProjectIssues(projectId));
//     }
//   }
// };

// Connect Redux state to props and handlers
// const ProjectsListRedux = connect(mapStateToProps, mapDispatchToProps)(ProjectsList);

export default connect()(Searchbox)
