jest.mock('src/services/LocalStorage')

import storage from '../services/LocalStorage'
import { showProjects, errorToGetProjects, searchProject } from 'src/actions'
import projectReducer from 'src/reducers/projects.reducer'

test('should save projects', () => {
  const projectActionPayload = {
    projects: [
      {
        id: 1,
        name: 'Banana Joe',
        identifier: 'banana-joe',
        description: '',
        status: 1,
        is_public: true,
        created_on: '2018-02-09T19:29:07Z',
        updated_on: '2018-02-09T19:29:07Z'
      },
      {
        id: 1,
        name: 'A Team',
        identifier: 'a-team',
        description: '',
        status: 1,
        is_public: true,
        created_on: '2018-02-09T19:29:07Z',
        updated_on: '2018-02-09T19:29:07Z'
      }
    ],
    total_count: 2,
    offset: 0,
    limit: 100
  }
  const expectedProject = [
    {
      id: 1,
      name: 'A Team',
      identifier: 'a-team',
      description: '',
      status: 1,
      is_public: true,
      activities: [],
      created_on: '2018-02-09T19:29:07Z',
      updated_on: '2018-02-09T19:29:07Z'
    },
    {
      id: 1,
      name: 'Banana Joe',
      identifier: 'banana-joe',
      description: '',
      status: 1,
      is_public: true,
      activities: [],
      created_on: '2018-02-09T19:29:07Z',
      updated_on: '2018-02-09T19:29:07Z'
    }
  ]
  const initialState = {
    projects: [],
    filteredProjects: [],
    totalCount: 0
  }
  const action = showProjects(projectActionPayload)

  const newState = projectReducer(initialState, action)

  expect(newState.projects).toEqual(expectedProject)
  expect(newState.projects.length).toEqual(2)
  expect(newState.totalCount).toEqual(projectActionPayload.total_count)
  expect(newState.filteredProjects).toEqual([])
})

test('should save error', () => {
  const initialState = {
    projects: [],
    filteredProjects: [],
    totalCount: 0
  }

  const error = { error: 'error' }
  const action = errorToGetProjects(error)

  const newState = projectReducer(initialState, action)

  expect(newState.error).toEqual(error)
})

test('should search projects', () => {
  const projectActionPayload = {
    projects: [
      {
        id: 1,
        name: 'Banana Joe',
        identifier: 'banana-joe',
        description: '',
        status: 1,
        is_public: true,
        created_on: '2018-02-09T19:29:07Z',
        updated_on: '2018-02-09T19:29:07Z'
      },
      {
        id: 1,
        name: 'A Team',
        identifier: 'a-team',
        description: '',
        status: 1,
        is_public: true,
        created_on: '2018-02-09T19:29:07Z',
        updated_on: '2018-02-09T19:29:07Z'
      }
    ],
    total_count: 2,
    offset: 0,
    limit: 100
  }
  const expectedProject = [
    {
      id: 1,
      name: 'A Team',
      identifier: 'a-team',
      description: '',
      status: 1,
      is_public: true,
      activities: [],
      created_on: '2018-02-09T19:29:07Z',
      updated_on: '2018-02-09T19:29:07Z'
    }
  ]
  const initialState = {
    projects: [],
    filteredProjects: [],
    totalCount: 0
  }

  const state = projectReducer(initialState, showProjects(projectActionPayload))
  const newState = projectReducer(state, searchProject('tea'))

  expect(newState.filteredProjects).toEqual(expectedProject)
  expect(newState.filteredProjects.length).toEqual(1)
  expect(newState.projects.length).toEqual(2)
})
