import React from 'react'
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
        comment: props.comment
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      timeEntryForm: {
        date: moment().format('YYYY-MM-DD'),
        hours: nextProps.hours,
        comment: nextProps.comment
      }
    })
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

  render() {
    let loggedTimeEntryClass = ''
    if (this.isLoggedTimeEntry()) {
      loggedTimeEntryClass = 'rfh-logged-issue-msg'

      setTimeout(() => {
        this.props.onLogTimeEntryDone()
      }, 3000)
    }

    return (
      <li className={'list-group-item ' + loggedTimeEntryClass}>
        <h4 className="rfh-issue-title">
          {this.props.logDate} #{' '}
          <span className={'rfh-color-red'}>{this.props.projectName}</span> #{' '}
          {this.props.subject}
        </h4>
        <ul>
          <li>
            Edit issue:{' '}
            <ExternalLink
              target={'_blank'}
              href={`${ENDPOINT}/issues/${this.props.issueId}`}
            >
              {this.props.issueId}
            </ExternalLink>
          </li>
          <li>
            Time: {this.props.hours} h
          </li>
          <li>
            Comment: {this.props.comment}
          </li>
        </ul>
        <div className={'row'}>
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
              this.state.timeEntryForm.comment
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
            <div className="col-md-7 rfh-time-log-hours-comment">
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

  isLoggedTimeEntry() {
    return this.props.loggedTimeEntryId === this.props.id
  }
}

export default LogTimeEntry
