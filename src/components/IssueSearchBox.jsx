import React from 'react'

class IssueSearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: ''
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <input
          onChange={event => {
            this.props.onSearchIssue(event.target.value)
            this.setState({ searchValue: event.target.value })
          }}
          className="form-control rfh-search-box"
          type="text"
          placeholder="Search yuor issue"
          value={this.state.searchValue}
        />
        <span
          style={{ right: '25px', top: '26px', position: 'absolute' }}
          className={'glyphicon glyphicon-remove-sign'}
          onClick={() => {
            this.setState({ searchValue: '' })
            this.props.onSearchIssue('')
          }}
        />
      </div>
    )
  }
}

export default IssueSearchBox
