import React from 'react'

class Issue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: 'none'};
  }

  toggleTimeLogEntry() {
    if (this.state.show === 'block') {
      this.setState({show: 'none'});
      return;
    }
    this.setState({show: 'block'})
  }

  render() {
    let loggedIssueClass = '';
    if (this.isLoggedIssue()) {
      this.state.show = 'none';
      loggedIssueClass = 'rfh-logged-issue-msg';

      setTimeout(() => {
        this.props.onLogTimeEntryDone();
      }, 3000);
    }

    return (
      <li className={'list-group-item ' + loggedIssueClass}>
        <h4 className="rfh-issue-title" onClick={() => {
          this.toggleTimeLogEntry()
        }}>{this.props.id} - {this.props.subject}</h4>
        <form style={{display: this.state.show}} onSubmit={(e) => {
          e.preventDefault();

          this.props.onLogTimeEntry(this.props.id, this.date.value, this.hours.value, this.comment.value);

          this.date.value = '';
          this.hours.value = '';
          this.comment.value = ''
        }}>
          <div className="row">
            <div className="col-md-3 rfh-time-log-date">
              <input type="date" className="form-control" placeholder="Date"
                     ref={(value) => {
                       this.date = value;
                     }} required="required"/>
            </div>
            <div className="col-md-1 rfh-time-log-time">
              <input type="number" className="form-control" placeholder="Time" step="0.5" pattern="[0-8]?(\.[0,5])?"
                     ref={(value) => {
                       this.hours = value;
                     }} required="required"/>
            </div>
            <div className="col-md-7 rfh-time-log-hours-comment">
              <input type="text" className="form-control" placeholder="Comment"
                     ref={(value) => {
                       this.comment = value;
                     }}/>
            </div>
            <div className="col-md-1">
              <button type="submit" className="btn btn-default rfh-btn-default rfh-time-log-button">Save</button>
            </div>
          </div>
        </form>
      </li>
    )
  }

  isLoggedIssue() {
    return this.props.loggedIssueId === this.props.id;
  }
}

export default Issue
