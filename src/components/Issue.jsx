import React from 'react'
import { connect } from 'react-redux'
import { ExternalLink } from './ExternalLink.jsx'
import moment from 'moment'

class Issue extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: 'none' }
  }

  toggleTimeLogEntry() {
    if (this.state.show === 'block') {
      this.setState({ show: 'none' })
      return
    }
    this.setState({ show: 'block' })
  }

  render() {
    let loggedIssueClass = ''
    if (this.isLoggedIssue()) {
      this.state.show = 'none'
      loggedIssueClass = 'rfh-logged-issue-msg'

      setTimeout(() => {
        this.props.onLogTimeEntryDone()
      }, 3000)
    }

    const options =
      this.props.activities &&
      this.props.activities.map(a => {
        return (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        )
      })

    return (
      <li className={'list-group-item ' + loggedIssueClass}>
        <h4
          className="rfh-issue-title"
          onClick={() => {
            this.toggleTimeLogEntry()
          }}
        >
          <span className="issue-time">{this.props.id}</span>{' '}
          <span className="issue-title">{this.props.subject}</span>
        </h4>
        <form
          style={{ display: this.state.show }}
          onSubmit={e => {
            e.preventDefault()

            this.props.onLogTimeEntry(
              this.props.id,
              this.date.value,
              this.hours.value,
              this.comment.value,
              this.activity.value
            )

            this.date.value = ''
            this.hours.value = ''
            this.comment.value = ''
            this.activity.value = ''
          }}
        >
          <div className="row">
            <div className="col-md-3 rfh-time-log-date">
              <input
                type="date"
                className="form-control"
                placeholder="Date"
                value={moment().format('YYYY-MM-DD')}
                ref={value => {
                  this.date = value
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
                ref={value => {
                  this.hours = value
                }}
                required="required"
              />
            </div>
            <div className="col-md-5 rfh-time-log-hours-comment">
              <input
                type="text"
                className="form-control"
                placeholder="Comment"
                ref={value => {
                  this.comment = value
                }}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-control"
                ref={value => {
                  this.activity = value
                }}
                defaultValue={this.props.defaultActivityId}
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
        <ul className="issue-meta">
          <li>
            Edit issue:{' '}
            <ExternalLink
              className="edit-issue-link"
              target={'_blank'}
              href={`${ENDPOINT}/issues/${this.props.id}`}
            >
              {this.props.id}
            </ExternalLink>
          </li>
          <li>
            Description:{' '}
            <span className="issue-comment">{this.props.description}</span>
          </li>
        </ul>
      </li>
    )
  }

  isLoggedIssue() {
    return this.props.loggedIssueId === this.props.id
  }
}

const mapStateToProps = state => {
  const defaultActivityId = state.globalActivities.defaultActivityId
  return {
    defaultActivityId
  }
}

export default connect(mapStateToProps)(Issue)
