import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { toggleTodo } from '../actions';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(t => t.completed);
    case 'active':
      return todos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <li
        key={todo.id}
        onClick={() => onTodoClick(todo.id)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.text}
      </li>
    ))}
  </ul>
);

const mapStateToProps = (state, { match: { params } }) => ({
  todos: getVisibleTodos(state.todos, params.filter || 'all'),
});

const mapDispatchToProps = dispatch => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
});

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList));

export default VisibleTodoList;