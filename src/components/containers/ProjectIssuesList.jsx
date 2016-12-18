import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash';
import Issue from '../presentationals/Issue.jsx';

const ProjectIssuesList = React.createClass({

    render: function () {
        const issues = this.props.issues.map(issue => {
            return (
                <Issue key={'projectIssues-' + issue.id}
                       id={issue.id}
                       subject={issue.subject}
                />
            );
        });

        return (
            <div className="col-md-10">
                <div className="panel panel-default">
                    <div className="panel-heading">Issues</div>
                    <ul className="list-group">
                        <div>{issues}</div>
                    </ul>
                </div>
            </div>
        )
    }
});

const mapStateToProps = (state) => {

    if (_.isUndefined(state.projectIssues.issues)) {
        return {issues: []}
    }

    if (!_.isEmpty(state.projectIssues.error)) {
        alert(state.projectIssues.error.data + '\n' + state.projectIssues.error.status + '\n');
        return {issues: []}
    }

    return {issues: state.projectIssues.issues}
};

const ProjectIssuesListRedux = connect(mapStateToProps)(ProjectIssuesList);

export default ProjectIssuesListRedux
