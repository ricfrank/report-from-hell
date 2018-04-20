jest.mock('../../services/LocalStorage')

import storage from '../../services/LocalStorage'
import { ISSUES_INFINITE_SCROLL_THRESHOLD } from '../../constants'
import projectIssuesReducer from './projectIssues.reducer'
import {
  errorToGetProjectIssues,
  logTimeEntryDone,
  logTimeEntryOk,
  searchProjectIssues,
  showProjectIssues,
  updateProjectIssues
} from 'core/actions'

describe('project issues', () => {
  const state = {
    issues: [],
    offset: 0,
    totalCount: 0,
    threshold: ISSUES_INFINITE_SCROLL_THRESHOLD,
    filteredIssues: [],
    resetIssuesList: true,
    projectName: '',
    projectId: null
  }
  const stateWithIssue = {
    issues: [
      {
        id: 3,
        project: {
          id: 1,
          name: 'Banana Joe'
        },
        subject: 'prova',
        description: 'stica'
      }
    ],
    totalCount: 10,
    threshold: 100,
    filteredIssues: [],
    resetIssuesList: true,
    projectName: 'Banana Joe',
    projectId: 1
  }

  const newIssues = {
    issues: [
      {
        id: 4,
        project: {
          id: 1,
          name: 'Banana Joe'
        },
        subject: 'sti',
        description: 'stica2'
      }
    ],
    threshold: 100,
    projectId: 1,
    totalCount: 10
  }

  test('should save project issues', () => {
    const issues = {
      issues: [
        {
          id: 1,
          project: {
            id: 1,
            name: 'Banana Joe'
          },
          subject: 'prova1',
          description: 'stica'
        }
      ],
      threshold: 100,
      projectId: 1,
      totalCount: 10
    }
    const expectedState = {
      issues: issues.issues,
      totalCount: issues.totalCount,
      threshold: issues.threshold,
      filteredIssues: [],
      resetIssuesList: true,
      projectName: issues.issues[0].project.name,
      projectId: issues.projectId
    }

    const action = showProjectIssues(issues, issues.threshold, issues.projectId)
    const newState = projectIssuesReducer(state, action)

    expect(newState).toEqual(expectedState)
  })

  test('should save an empty project name, when there are no issues', () => {
    const issues = {
      issues: [],
      threshold: 100,
      projectId: 1,
      totalCount: 0
    }
    const expectedState = {
      issues: issues.issues,
      totalCount: issues.totalCount,
      threshold: issues.threshold,
      filteredIssues: [],
      resetIssuesList: true,
      projectName: '',
      projectId: issues.projectId
    }

    const action = showProjectIssues(issues, issues.threshold, issues.projectId)
    const newState = projectIssuesReducer(state, action)

    expect(newState).toEqual(expectedState)
  })

  test('should save error', () => {
    const error = { error: 'error' }

    const newState = projectIssuesReducer(state, errorToGetProjectIssues(error))

    expect(newState.error).toEqual(error)
  })

  test('should update project issues', () => {
    const expectedState = {
      issues: [stateWithIssue.issues[0], newIssues.issues[0]],
      totalCount: newIssues.totalCount,
      threshold: newIssues.threshold,
      filteredIssues: [],
      resetIssuesList: true,
      projectName: newIssues.issues[0].project.name,
      projectId: newIssues.projectId
    }

    const action = updateProjectIssues(
      newIssues,
      newIssues.threshold,
      newIssues.projectId
    )
    const newState = projectIssuesReducer(stateWithIssue, action)

    expect(newState).toEqual(expectedState)
  })

  test('should log entry time', () => {
    const loggedIssueId = 1
    const loggedTimeEntryId = 2

    const action = logTimeEntryOk(loggedIssueId, loggedTimeEntryId)
    const newState = projectIssuesReducer(stateWithIssue, action)

    expect(newState.loggedIssueId).toEqual(loggedIssueId)
    expect(newState.loggedTimeEntryId).toEqual(loggedTimeEntryId)
  })

  test('should clear entry time info when logging done', () => {
    const loggedIssueId = 1
    const loggedTimeEntryId = 2
    const state = { ...stateWithIssue, loggedTimeEntryId, loggedIssueId }

    const action = logTimeEntryDone(loggedIssueId, loggedTimeEntryId)
    const newState = projectIssuesReducer(state, action)

    expect(newState.loggedIssueId).toEqual('')
    expect(newState.loggedTimeEntryId).toEqual('')
  })

  test('should search issue by subject', () => {
    const issues = stateWithIssue.issues.concat(newIssues.issues[0])
    const stateWithTwoIssues = { ...stateWithIssue, issues }

    let newState = projectIssuesReducer(
      stateWithTwoIssues,
      searchProjectIssues('pro')
    )

    expect(newState.filteredIssues).toEqual([stateWithTwoIssues.issues[0]])

    newState = projectIssuesReducer(
      stateWithTwoIssues,
      searchProjectIssues('sti')
    )

    expect(newState.filteredIssues).toEqual([stateWithTwoIssues.issues[1]])
  })

  test('should search issue by id', () => {
    const issues = stateWithIssue.issues.concat(newIssues.issues[0])
    const stateWithTwoIssues = { ...stateWithIssue, issues }

    let newState = projectIssuesReducer(
      stateWithTwoIssues,
      searchProjectIssues('3')
    )

    expect(newState.filteredIssues).toEqual([stateWithTwoIssues.issues[0]])

    // newState = projectIssuesReducer(stateWithTwoIssues, searchProjectIssues('4'))
    //
    // expect(newState.filteredIssues).toEqual([stateWithTwoIssues.issues[1]])
  })

  test('should return no issues when search not match id neither subject', () => {
    const issues = stateWithIssue.issues.concat(newIssues.issues[0])
    const stateWithTwoIssues = { ...stateWithIssue, issues }

    let newState = projectIssuesReducer(
      stateWithTwoIssues,
      searchProjectIssues('punk')
    )

    expect(newState.filteredIssues).toEqual([])

    newState = projectIssuesReducer(
      stateWithTwoIssues,
      searchProjectIssues('5')
    )

    expect(newState.filteredIssues).toEqual([])
  })
})
