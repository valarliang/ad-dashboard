import { createStore } from 'redux';
import todoApp from './reducers';

const logger = store => (next) => {
  /* eslint-disable no-console */
  if (!console.group) {
    return next;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
  /* eslint-enable no-console */
};

const thunk = store => next => action => (typeof action === 'function' ? action(next, store.getState) : next(action));

const wrapDispatchWithMiddlewares = (store, middlewares) => middlewares.slice().reverse()
  .forEach((middleware) => {
    store.dispatch = middleware(store)(store.dispatch); // eslint-disable-line no-param-reassign
  });

const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  return store;
};

export default configureStore;
