const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS': // eslint-disable-line no-case-declarations
      return action.response.reduce((nextState, todo) => {
        nextState[todo.id] = todo;
        return nextState;
      }, { ...state });
    case 'ADD_TODO_SUCCESS':
      return ({
        ...state,
        [action.response.id]: action.response,
      });
    case 'TOGGLE_TODO_SUCCESS':
      return ({
        ...state,
        [action.response.id]: action.response,
      });
    default:
      return state;
  }
};

export default byId;
