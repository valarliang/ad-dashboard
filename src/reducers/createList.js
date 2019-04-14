import { combineReducers } from 'redux';

const createList = (filter) => { // eslint-disable-line arrow-body-style
  const handleToggle = (state, todo) => {
    const shouldRemove = (filter === 'active' && todo.completed) || (filter === 'completed' && !todo.completed);
    return shouldRemove ? state.filter(i => i !== todo.id) : state;
  };
  const ids = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return filter === action.filter ? action.response.map(todo => todo.id) : state;
      case 'ADD_TODO_SUCCESS':
        return filter !== 'completed' ? [...state, action.response.id] : state;
      case 'TOGGLE_TODO_SUCCESS':
        return handleToggle(state, action.response);
      default:
        return state;
    }
  };
  const isFetching = (state = false, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false;
      default:
        return state;
    }
  };
  const errorMessage = (state = null, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_FAILURE':
        return action.message;
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;
