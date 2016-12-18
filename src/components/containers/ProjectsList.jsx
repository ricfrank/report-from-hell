import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash';
import Project from '../presentationals/Project.jsx';
import {getProjectIssues} from '../../actions'

const ProjectsList = React.createClass({

    render: function () {
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
            <div className="col-md-2">
                <div className="panel panel-default">
                    <div className="panel-heading">Projects</div>
                    <ul className="list-group">
                        {projects}
                    </ul>
                </div>
            </div>
        )
    }
});

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

// Connect Redux state to props and handlers
const ProjectsListRedux = connect(mapStateToProps, mapDispatchToProps)(ProjectsList);

export default ProjectsListRedux
