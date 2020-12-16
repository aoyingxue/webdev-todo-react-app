// Todo component containing HTML for a single Todo

import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  constructor(props){
    super(props);
    this.state={};
    
  }

  render() {
    var circleId='circle-';
    circleId=circleId.concat(`${this.props.id}`);

    var trashId='trash-';
    trashId=trashId.concat(`${this.props.id}`);

    // initialize the completed status
    // icons for check and uncheck
    var circleClass = 'far fa-circle todo-icon todo-icon-complete';
    var textClass='text';
    
    if (this.props.completed){
      circleClass = 'far fa-check-circle todo-icon todo-icon-complete';
      textClass='text checked';
    }

    return (
      <li className="d-flex justify-content-between align-items-center">
        {/* Display the props inside the component */}
        <p className={textClass}>{this.props.text}</p>
        <span>
          <i className={circleClass} id={circleId} onClick={this.props.completeTodo}></i>
          <i className="far fa-trash-alt todo-icon todo-icon-delete" id={trashId} 
            onClick={this.props.removeDeletedTodo}></i>
        </span>
      </li>
    );
  }
}

export default Todo;
