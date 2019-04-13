import { v4 } from 'node-uuid';
import * as api from '../api';
import { getIsFetching } from '../reducers';

export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) { // avoiding race conditions
    return Promise.resolve();
  }

  dispatch({ // loading indicators
    type: 'FETCH_TODOS_REQUEST',
    filter,
  });

  return api.fetchTodos(filter).then( // handle response state & error
    response => (
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response,
      })
    ),
    error => (
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.',
      })
    ),
  );
};

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});
