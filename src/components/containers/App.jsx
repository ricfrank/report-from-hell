import React from 'react'
import ProjectIssuesList from './ProjectIssuesList.jsx'
import ProjectsList from './ProjectsList.jsx'


const App = React.createClass({

    render: function () {
        return (
            <div>
                <ProjectsList />
                <ProjectIssuesList />
            </div>
        )
    }
});

export default App
