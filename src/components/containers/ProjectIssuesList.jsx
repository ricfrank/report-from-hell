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
        return (<ul className="list-group"><div>{issues}</div></ul>)
    }
});

const mapStateToProps = (state) => {
    if (!_.isUndefined(state.error)) {
        alert(state.error.data + '\n' + state.error.status + '\n');
        return;
    }

    if (_.isUndefined(state.issues)) {
        return {issues: state}
    }

    return {issues: state.issues.issues}
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         handleVote: (id) => {
//             dispatch(vote(id))
//         }
//     }
// };

// Connect Redux state to props and handlers
// const TalkListRedux = connect(mapStateToProps, mapDispatchToProps)(TalkList)
const ProjectIssuesListRedux = connect(mapStateToProps)(ProjectIssuesList);

export default ProjectIssuesListRedux
