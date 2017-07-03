import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash';
import Issue from '../components/Issue.jsx';
import IssueSearchBox from '../components/IssueSearchBox.jsx'
import {logTimeEntry, logTimeEntryDone, getProjectIssues, searchProjectIssues} from '../actions'
import {ISSUES_INFINITE_SCROLL_THRESHOLD, ISSUES_INFINITE_SCROLL_LIMIT} from '../constants'

class ProjectIssuesList extends React.Component {
  constructor(props) {
    super(props);
    this.scrollListener = this.scrollListener.bind(this);

    this.props.onLoadIssues(this.props.params['projectId']);
    window.addEventListener('scroll', this.scrollListener);
  }

  componentDidUpdate() {
    if (this.props.params['projectId'] != this.props.projectId) {
      this.props.onLoadIssues(this.props.params['projectId']);
    }
    window.addEventListener('scroll', this.scrollListener);
  }

  scrollListener() {
    if (window.scrollY > this.props.threshold) {
      window.removeEventListener('scroll', this.scrollListener);
      this.props.onLoadIssues(
        this.props.issues[0].project.id,
        this.props.offset + ISSUES_INFINITE_SCROLL_LIMIT,
        this.props.threshold + ISSUES_INFINITE_SCROLL_THRESHOLD
      )
    }
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
    return (
      <div className="col-md-10 rfh-no-padding">
        <div className="row">
          <div className="col-md-9">
            <h3 className="rfh-project-name">
              Issues for {this.props.projectName} - <span className="rfh-color-red">{this.props.totalCount}</span> opened issues
            </h3>
          </div>
          <div className="col-md-3">
            <span className="rfh-white-rabbit">
              Check your time on <a target="_blank" href="https://time.ideato.it/">white rabbit</a>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <IssueSearchBox onSearchIssue={this.props.onSearchIssue}/>
          </div>
        </div>
        <ul className="list-group rfh-issues-list" ref="issuesList">
          {issues}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if (!_.isEmpty(state.projectIssues.error)) {
    alert(state.projectIssues.error.data + '\n' + state.projectIssues.error.status + '\n');
  }

  let issues = state.projectIssues.issues;
  if (state.projectIssues.resetIssuesList === false && state.projectIssues.filteredIssues.length >= 0) {
    issues = state.projectIssues.filteredIssues;
  }

  return {
    issues: issues,
    projectName: state.projectIssues.projectName,
    projectId: state.projectIssues.projectId,
    loggedIssueId: state.projectIssues.loggedIssueId,
    offset: state.projectIssues.offset,
    threshold: state.projectIssues.threshold,
    totalCount: state.projectIssues.totalCount,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogTimeEntry: (issueId, timeEntryDate, hours, comment) => {
      dispatch(logTimeEntry(issueId, timeEntryDate, hours, comment));
    },
    onLogTimeEntryDone: () => {
      dispatch(logTimeEntryDone());
    },
    onLoadIssues: (projectId, offset = 0, threshold = ISSUES_INFINITE_SCROLL_THRESHOLD) => {
      dispatch(getProjectIssues(projectId, offset, threshold, ISSUES_INFINITE_SCROLL_LIMIT));
    },
    onSearchIssue: (text) => {
      dispatch(searchProjectIssues(text));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectIssuesList)
