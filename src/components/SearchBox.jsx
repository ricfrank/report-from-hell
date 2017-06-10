import React from 'react'

class Searchbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-12">
        <input onKeyUp={(event) => {this.props.onSearchIssue(event.target.value)}}
               className="form-control rfh-search-box" type="text" placeholder="Search yuor issue"/>
      </div>
    )
  }
}

export default Searchbox
