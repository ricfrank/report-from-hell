import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash';
import Project from '../presentationals/Project.jsx';
import {getProjectIssues} from '../../actions'

class ProjectsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const projects = this.props.projects.map(project => {
      return (
        <Project key={'project-' + project.id}
                 id={project.id}
                 name={project.name}
                 onProjectClick={this.props.onProjectClick}
        />
      );
    });
    return (
      <div className="col-md-2 rfh-sidebar">
        <div className="rfh-logo">
          <img src="https://www.ideato.it/assets/themes/ideato/img/theme/ideato-logo-header.svg"
               alt="logo ideato"/>
        </div>
        <div className="list-group">
          {projects}
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {

  if (_.isUndefined(state.projects.projects)) {
    return {projects: []}
  }

  if (!_.isEmpty(state.projects.error)) {
    alert(state.projects.error.data + '\n' + state.projects.error.status + '\n');
    return;
  }

  return {projects: state.projects.projects}
};

const mapDispatchToProps = (dispatch) => {
  return {
    onProjectClick: (projectId) => {
      dispatch(getProjectIssues(projectId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
