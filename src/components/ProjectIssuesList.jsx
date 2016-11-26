import React from 'react'
import {connect} from 'react-redux'
// import {loadData, vote} from './actions'

const ProjectIssuesList = React.createClass({

    render: function () { // We should not access state directly anymore!

        const  issues = 'quela è la lista';

        // const talks = this.props.talks.map(talk => {
        //     return (
        //         <Talk
        //             key={'talk-' + talk.id} // used by React
                    {/*id={talk.id}*/}
                    {/*name={talk.name}*/}
                    {/*author={talk.author}*/}
        //             short={talk.short}
        //             votes={talk.votes}
        //             onVote={this.props.handleVote} // changed, we get the function from props
        //         ></Talk>
        //     )
        // })
        return (<div>{issues}</div>)
    }
});

const mapStateToProps = (state) => {
    return {
        issues: state
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         handleVote: (id) => {
//             dispatch(vote(id))
//         }
//     }
// };

// Connect Redux state to props and handlers
// const TalkListRedux = connect(mapStateToProps, mapDispatchToProps)(TalkList)
const ProjectIssuesListRedux = connect(mapStateToProps)(ProjectIssuesList);

export default ProjectIssuesListRedux
