import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { ExternalLink } from './ExternalLink.jsx'

class LogTimeEntry extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: 'none',
      timeEntryForm: {
        date: moment().format('YYYY-MM-DD'),
        hours: props.hours,
        comment: props.comment,
        activityId: props.activityId
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      timeEntryForm: {
        date: moment().format('YYYY-MM-DD'),
        hours: nextProps.hours,
        comment: nextProps.comment,
        activityId: nextProps.activityId
      }
    })
  }

  componentDidMount() {
    if (this.isLoggedTimeEntry()) {
      this.props.show(this.props.subject, this.props.issueId)

      setTimeout(() => {
        this.props.onLogTimeEntryDone()
        this.props.hide()
      }, 5000)
    }
  }

  isLoggedTimeEntry() {
    return this.props.loggedTimeEntryId === this.props.id
  }

  toggleTimeLogEntry() {
    if (this.state.show === 'block') {
      this.setState({ show: 'none' })
      return
    }
    this.setState({ show: 'block' })
  }

  changeDate(date) {
    this.setState({
      timeEntryForm: { ...this.state.timeEntryForm, date }
    })
  }

  changeHours(hours) {
    this.setState({
      timeEntryForm: { ...this.state.timeEntryForm, hours }
    })
  }

  changeComment(comment) {
    this.setState({
      timeEntryForm: { ...this.state.timeEntryForm, comment }
    })
  }

  changeActivityId(activityId) {
    this.setState({
      timeEntryForm: { ...this.state.timeEntryForm, activityId }
    })
  }

  render() {
    const options = this.props.projectActivities.map(a => {
      return (
        <option key={a.id} value={a.id}>
          {a.name}
        </option>
      )
    })

    return (
      <li className={'list-group-item'}>
        <div className={'row'}>
          <div className={'col-md-10'}>
            <h4 className="rfh-issue-title">
              <span className="issue-date">{this.props.logDate}</span>{' '}
              {this.props.logDate && <span className="issue-divider"># </span>}
              <span className="issue-project">
                {this.props.projectName}
              </span>{' '}
              <span className="issue-divider"># </span>
              <span className="issue-title">{this.props.subject}</span>
            </h4>
            <ul className="issue-meta">
              <li>
                Edit issue:{' '}
                <ExternalLink
                  className="edit-issue-link"
                  target={'_blank'}
                  href={`${ENDPOINT}/issues/${this.props.issueId}`}
                >
                  {this.props.issueId}
                </ExternalLink>
              </li>
              {this.props.hours && (
                <li>
                  Time: <span className="issue-time">{this.props.hours}h</span>
                </li>
              )}
              {this.props.comment && (
                <li>
                  Comment:{' '}
                  <span className="issue-comment">{this.props.comment}</span>
                </li>
              )}
            </ul>
          </div>
          <div className={'col-md-2'}>
            <button
              type="button"
              className="btn btn-default rfh-btn-default rfh-time-log-button"
              onClick={() => {
                this.toggleTimeLogEntry()
              }}
            >
              Log again
            </button>
          </div>
        </div>
        <form
          style={{ display: this.state.show }}
          onSubmit={e => {
            e.preventDefault()

            this.props.onLogTimeEntry(
              this.props.issueId,
              this.state.timeEntryForm.date,
              this.state.timeEntryForm.hours,
              this.state.timeEntryForm.comment,
              this.state.timeEntryForm.activityId
            )

            this.toggleTimeLogEntry()
          }}
        >
          <div className="row">
            <div className="col-md-3 rfh-time-log-date">
              <input
                type="date"
                className="form-control"
                placeholder="Date"
                value={this.state.timeEntryForm.date}
                onChange={event => {
                  this.changeDate(event.target.value)
                }}
                required="required"
              />
            </div>
            <div className="col-md-1 rfh-time-log-time">
              <input
                type="number"
                className="form-control"
                placeholder="Time"
                step="0.5"
                pattern="[0-8]?(\.[0,5])?"
                value={this.state.timeEntryForm.hours}
                onChange={event => {
                  this.changeHours(event.target.value)
                }}
                required="required"
              />
            </div>
            <div className="col-md-5 rfh-time-log-hours-comment">
              <input
                type="text"
                className="form-control"
                placeholder="Comment"
                value={this.state.timeEntryForm.comment}
                onChange={event => {
                  this.changeComment(event.target.value)
                }}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-control"
                value={this.state.timeEntryForm.activityId}
                onChange={event => {
                  this.changeActivityId(event.target.value)
                }}
                required="required"
              >
                <option value="">Please select an activity</option>
                {options}
              </select>
            </div>
            <div className="col-md-1">
              <button
                type="submit"
                className="btn btn-default rfh-btn-default rfh-time-log-button"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </li>
    )
  }
}

export default LogTimeEntry
