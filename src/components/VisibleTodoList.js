import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as actions from '../actions';
import { getVisibleTodos, getIsFetching } from "../reducers";

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, requestTodos, fetchTodos } = this.props;
    requestTodos(filter);
    fetchTodos(filter);
  }

  render() {
    const { todos, isFetching, toggleTodo } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    return (
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const filter = params.filter || 'all';
  return ({
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  });
};

export default withRouter(connect(
  mapStateToProps,
  actions,
)(VisibleTodoList));
