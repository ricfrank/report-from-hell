import React from 'react'

class ProjectSearchBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: ''
    }
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <input onKeyUp={(event) => {this.props.onSearchProject(event.target.value)}}
               className="form-control rfh-search--project-box"
               type="text"
               placeholder="Search project"
               value={this.state.searchValue}
               onChange={(event) => {this.setState({searchValue: event.target.value})}}
        />
        <span
          style={{right: '5px', top: '12px', position: 'absolute'}}
          className={'glyphicon glyphicon-remove-sign'}
          onClick={(event) => {
            this.setState({searchValue: ''});
            this.props.onSearchProject('');
          }}
        />
      </div>
    )
  }
}

export default ProjectSearchBox;
