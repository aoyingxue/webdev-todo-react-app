// App component that does initial setup and composes your other components
import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

const apiKey = '9a7a46-c55be6-55eb1f-861696-a468db';
const apiUrl = 'https://cse204.work/todos';

class App extends Component {
  // actions
  constructor() {
    super(); // call parent class's constructor

    // setting up state with initial values
    this.state = {
      // the list of todos is saved in this.state.todos in our container component which lives in App.js
      todos: [] //empty array of todos
    };

    // bindings for each event handler
    // Don't forget this line for every event handler!
    this.addTodo = this.addTodo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.removeDeletedTodo = this.removeDeletedTodo.bind(this);
  }

  // SOLVED
  // Add new Todo into the list and submit
  addTodo(event) {
    // Handle new Todo form submit
    event.preventDefault();
    var self = this;
    // read input value from state
    const newTodoText = self.state.input;

    var data = {
      text: newTodoText
    }

    //AJAX
    // when using XMLHttpRequest for AJAX calls, the onreadystatechange() method overrites this.
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // save new Todo to state
        self.setState({ todos: [...self.state.todos, JSON.parse(this.responseText)] })
        // clear out the form input value by updating this.state.input after submitting
        self.setState({input:''});
        
      } else if (this.readyState === 4) {
        console.log(this.responseText);
      }
    }
    xhttp.open('POST', apiUrl, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.setRequestHeader('x-api-key', apiKey);
    xhttp.send(JSON.stringify(data));
    console.log('Sent successfully!');
  }

  onChange(event) {
    // set the state to the value of the input
    // modify state using this.setState(), which receives an object of the new state.
    this.setState({
      input: event.target.value
    });
  }

  // complete  todo
  completeTodo(event) {
    event.preventDefault();
    const element = event.target;
    const elementId = element.id.substring(7,);
    const elementComplete = element.completed;

    var data ={};
    if (elementComplete === true) {
      data = { completed: false }
    } else {
      data = { completed: true }
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // icons for check and uncheck
        const check = 'fa-check-circle';
        const uncheck = 'fa-circle';

        // toggle classes between check and uncheck
        element.classList.toggle(check);
        element.classList.toggle(uncheck);
        element.parentNode.parentNode.querySelector('.text').classList.toggle('checked');
      } else if (this.readyState === 4) {
        // this.status !== 200, error from server
        console.log(this.responseText);
      }
    }

    let url=apiUrl.concat(`/${elementId}`);
    xhttp.open("PUT",url,true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.setRequestHeader('x-api-key',apiKey);
    xhttp.send(JSON.stringify(data));
    console.log('Update successfully!');
  }

  // SOLVED
  // delete todo
  removeDeletedTodo(event) {
    event.preventDefault();
    // id of the todo 
    var elementId = event.target.id.substring(6,);

    var self = this;
    const remainingTodos = self.state.todos.filter((todo) => {
      if (todo.id !== elementId) {
        return todo;
      }
    });
    // AJAX
    // when using XMLHttpRequest for AJAX calls, the onreadystatechange() method overrites this.
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // save filtered todo list
        self.setState({ todos: [...remainingTodos] });

      } else if (this.readyState === 4) {
        console.log(this.responseText);
      }
    }

    let url = apiUrl.concat(`/${elementId}`);
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send();
    console.log('Delete successfully!');
  }

  render() {
    // sort todos array 
    this.state.todos.sort(function (a, b) {
      return a.text.localeCompare(b.text); // alphabetically
      // return parseFloat(b.created)-parseFloat(a.created); //sort descending by a number
    });
    return (
      <div className="container">
        <div className="header">
          To-Do List
        </div>
        <div className="todo-content">
          <ul id="todo-list">
            <NewTodo addTodo={this.addTodo} onChange={this.onChange} input={this.state.input} />
            {this.state.todos.map((todo) =>
            // bind method to the component and make sure Todo component can access
              <Todo key={todo.id} text={todo.text} completed={todo.completed}
                id={todo.id} removeDeletedTodo={this.removeDeletedTodo} completeTodo={this.completeTodo}/>
            )}
          </ul>
        </div>
      </div>
    );
  }

  // SOLVED
  // initial GET AJAX request to load existing Todos once the main App has loaded 
  componentDidMount() {
    // AJAX
    const self = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var todos = JSON.parse(this.responseText);
        
        self.setState({ todos: todos });
      } else if (this.readyState === 4) {
        console.log(this.responseText);
      }
    }
    xhttp.open('GET', apiUrl, true);
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send();
  }
}


export default App;
