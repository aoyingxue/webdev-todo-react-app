// NewTodo component containing the form for a new Todo

import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
    render() {
        return (
            // create addTodo method inside App component and pass to NewTodo
            <form id="todo-form" onSubmit={this.props.addTodo}> 
                <div className="add-todo d-flex flex-row justify-content-between align-items-center">
                    <input type="text" className='form-control' id='input' 
                        placeholder='New To-Do...' 
                        value={this.props.input} 
                        onChange={this.props.onChange}/>
                    <button type="submit" className="btn" >
                        <i className="fas fa-plus-circle button add-button"></i>
                    </button>
                </div>
            </form>
        );
    }
}

export default NewTodo;
