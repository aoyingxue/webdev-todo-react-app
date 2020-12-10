import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
    render() {
        return (
            <form id="todo-form">
                <div className="add-todo d-flex flex-row justify-content-between align-items-center">
                    <input type="text" className='form-control' id='input' placeholder='New To-Do...' />
                    <button type="submit" className="btn">
                        <i className="fas fa-plus-circle button add-button"></i>
                    </button>
                </div>
            </form>
        );
    }
}

export default NewTodo;
