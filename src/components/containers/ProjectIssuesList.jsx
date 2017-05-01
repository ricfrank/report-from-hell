import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash';
import Issue from '../presentationals/Issue.jsx';
import {logTimeEntry, logTimeEntryDone} from '../../actions'

class ProjectIssuesList extends React.Component {
  constructor(props) {
    super(props);
  }

  onScroll() {
    console.log("SCROLL!!!!!!");
  }

  render() {
    const issues = this.props.issues.map(issue => {
      return (
        <Issue key={'projectIssues-' + issue.id}
               id={issue.id}
               subject={issue.subject}
               onLogTimeEntry={this.props.onLogTimeEntry}
               onLogTimeEntryDone={this.props.onLogTimeEntryDone}
               loggedIssueId={this.props.loggedIssueId}
        />
      );
    });
    if (issues.length !== 0) {
      return (
        <div className="col-md-10 rfh-no-padding">
          <h3 className="rfh-project-name">Issues for {this.props.issues[0].project.name}</h3>
          <ul className="list-group rfh-issues-list" ref="issuesList" onScroll={ () => {
            this.onScroll()
          }}>
            <div>{issues}</div>
          </ul>
        </div>
      )
    }

    return null;
  }
}

const mapStateToProps = (state) => {

  if (_.isUndefined(state.projectIssues.issues)) {
    return {issues: []}
  }

  if (!_.isEmpty(state.projectIssues.error)) {
    alert(state.projectIssues.error.data + '\n' + state.projectIssues.error.status + '\n');
    return {issues: []}
  }

  return {issues: state.projectIssues.issues, loggedIssueId: state.projectIssues.loggedIssueId}
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogTimeEntry: (issueId, timeEntryDate, hours, comment) => {
      dispatch(logTimeEntry(issueId, timeEntryDate, hours, comment));
    },
    onLogTimeEntryDone: () => {
      dispatch(logTimeEntryDone());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectIssuesList)
