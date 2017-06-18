import React from 'react'

const ProjectSearchBox = ({onSearchProject}) => (
  <input onKeyUp={(event) => {onSearchProject(event.target.value)}}
         className="form-control rfh-search--project-box" type="text" placeholder="Search project"/>
);

export default ProjectSearchBox;
