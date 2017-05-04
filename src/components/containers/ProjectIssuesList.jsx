import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash';
import Issue from '../presentationals/Issue.jsx';
import SearchBox from '../presentationals/SearchBox.jsx'
import {logTimeEntry, logTimeEntryDone, getProjectIssues} from '../../actions'
import {ISSUES_INFINITE_SCROLL_THRESHOLD, ISSUES_INFINITE_SCROLL_LIMIT} from '../../constants'

class ProjectIssuesList extends React.Component {
  constructor(props) {
    super(props);
    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener);
  }

  componentDidUpdate() {
    window.addEventListener('scroll', this.scrollListener);
  }

  scrollListener() {
    if(window.scrollY > this.props.threshold){
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
    if (issues.length !== 0) {
      return (
        <div className="col-md-10 rfh-no-padding">
          <h3 className="rfh-project-name">Issues for {this.props.issues[0].project.name} - <span className="rfh-color-red">
            {this.props.totalCount}
          </span> opened issues</h3>
          <div className="row">
            <div className="col-md-12">
              <SearchBox/>
            </div>
          </div>
          <ul className="list-group rfh-issues-list" ref="issuesList">
            {issues}
          </ul>
        </div>
      )
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  if (!_.isEmpty(state.projectIssues.error)) {
    alert(state.projectIssues.error.data + '\n' + state.projectIssues.error.status + '\n');
  }

  return {
    issues: state.projectIssues.issues,
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
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectIssuesList)
