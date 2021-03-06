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

export const addTodo = text => (dispatch) => {
  api.addTodo(text).then((response) => {
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response,
    });
  });
};

export const toggleTodo = id => (dispatch) => {
  api.toggleTodo(id).then((response) => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response,
    });
  });
};
