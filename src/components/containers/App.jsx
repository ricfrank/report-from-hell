import React from 'react'
import ProjectIssuesList from './ProjectIssuesList.jsx'
import ProjectsList from './ProjectsList.jsx'
import Authentication from './Authentication.jsx'


const App = React.createClass({

    render: function () {
        return (
            <div>
                <ProjectsList />
                <ProjectIssuesList />
                <Authentication />
            </div>
        )
    }
});

export default App
