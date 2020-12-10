import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  render() {
    return (
      <li className="d-flex justify-content-between align-items-center">
        <p className="text">Do a thing</p>
        <span>
          <i className="far fa-circle todo-icon todo-icon-complete" id="circle-${toDoId}"></i>
          <i className="far fa-trash-alt todo-icon todo-icon-delete" id="trash-${toDoId}"></i>
        </span>
      </li>
    );
  }
}

export default Todo;
