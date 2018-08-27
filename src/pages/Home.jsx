import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { ExternalLink } from 'src/components/ExternalLink.jsx'
import {
  getProjects,
  getActivities,
  getLoggedUser,
  getUserLogTimeEntries,
  logTimeEntry
} from 'src/actions'
import { logTimeEntryDone } from 'src/actions/projectIssues.action'
import LogTimeEntry from 'src/components/LogTimeEntry.jsx'
import whiterabbitLogo from 'src/assets/wr-logo.svg'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.props
      .getProjects()
      .then(() => {
        this.props.getActivities()
        this.props.getLoggedUser().then(() => {
          this.props.getUserLogTimeEntries(this.props.user.id)
        })
      })
      .catch(error => {})
    this.state = {
      showMessage: false
    }
    this.showMessage = this.showMessage.bind(this)
    this.hideMessage = this.hideMessage.bind(this)
  }

  getActivitiesFromProjectId(id) {
    if (!this.props.projects) {
      return []
    }

    const project = this.props.projects.projects.find(p => p.id === id)
    return project ? project.activities : []
  }

  showMessage() {
    this.setState({
      showMessage: true,
      className: 'rfh-logged-issue-msg'
    })
  }

  hideMessage() {
    this.setState({
      showMessage: false
    })
  }

  render() {
    const userLogTimeEntries = _.uniqBy(
      this.props.userLogTimeEntries,
      'issue.id'
    ).map(timeEntry => {
      return (
        <LogTimeEntry
          key={'logTimeEntry-' + timeEntry.id}
          loggedTimeEntryId={this.props.loggedTimeEntryId}
          id={timeEntry.id}
          issueId={timeEntry.issue.id}
          activityId={timeEntry.activityId}
          subject={timeEntry.issue.subject}
          comment={timeEntry.comments}
          hours={timeEntry.hours}
          logDate={timeEntry.spentOn}
          projectName={timeEntry.projectName}
          projectActivities={this.getActivitiesFromProjectId(
            timeEntry.projectId
          )}
          onLogTimeEntry={this.props.onLogTimeEntry}
          onLogTimeEntryDone={this.props.onLogTimeEntryDone}
          loggedIssueId={this.props.loggedIssueId}
          show={this.showMessage}
          hide={this.hideMessage}
        />
      )
    })
    return (
      <div className="col-md-10">
        <div className="row">
          <div className="col-md-9">
            <div className="page-header">
              <h1>Outatime</h1>
              <p className="lead">Welcome back {this.props.user.firstname}!</p>
              <p className="">See your last time entries</p>
            </div>
          </div>
          <div className="col-md-3">
            <ExternalLink
              className="whiterabbit-link"
              target="_blank"
              href="https://time.ideato.it/"
            >
              <span className="rfh-white-rabbit">Check your time on </span>
              <img src={whiterabbitLogo} />
            </ExternalLink>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group rfh-issues-list" ref="issuesList">
              {userLogTimeEntries}
            </ul>
          </div>
        </div>
        <div
          id="messages"
          className={this.state.showMessage ? this.state.className : ''}
        >
          New entry just recorded!
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  if (!_.isEmpty(state.user.error)) {
    alert(state.user.error.data + '\n' + state.user.error.status + '\n')
    return
  }
  if (!_.isEmpty(state.userLogTimeEntries.error)) {
    alert(
      state.user.userLogTimeEntries.data +
        '\n' +
        state.user.userLogTimeEntries.status +
        '\n'
    )
    return
  }

  return {
    user: state.user,
    projects: state.projects,
    userLogTimeEntries: state.userLogTimeEntries,
    loggedIssueId: state.projectIssues.loggedIssueId,
    loggedTimeEntryId: state.projectIssues.loggedTimeEntryId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogTimeEntry: (issueId, timeEntryDate, hours, comment, activityId) => {
      dispatch(logTimeEntry(issueId, timeEntryDate, hours, comment, activityId))
    },
    getProjects: () => dispatch(getProjects()),
    getActivities: () => dispatch(getActivities()),
    getLoggedUser: () => dispatch(getLoggedUser()),
    getUserLogTimeEntries: userId => {
      dispatch(getUserLogTimeEntries(userId))
    },
    onLogTimeEntryDone: () => {
      dispatch(logTimeEntryDone())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
