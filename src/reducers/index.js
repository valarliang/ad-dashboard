import { combineReducers } from 'redux';
import byId from './byId';
import createList from './createList';

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  listByFilter,
});

export default todos;

export const getVisibleTodos = (state, filter) => {
  const { ids } = state.listByFilter[filter];
  return ids.map(id => state.byId[id]);
};

export const getIsFetching = (state, filter) => {
  const { isFetching } = state.listByFilter[filter];
  return isFetching;
};
