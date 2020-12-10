import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          To-Do List
        </div>
        <div className="todo-content">
          <ul id="todo-list">
            <NewTodo />
            <Todo />

          </ul>
        </div>
      </div>
    );
  }
}

export default App;
