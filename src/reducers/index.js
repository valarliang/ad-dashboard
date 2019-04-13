import { combineReducers } from 'redux';
import todos, { getVisibleTodosR } from './todos';

const todoApp = combineReducers({
  todos,
});

export default todoApp;

export const getVisibleTodos = (state, filter) => getVisibleTodosR(state.todos, filter);
