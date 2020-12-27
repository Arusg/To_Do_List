import React, { Component } from 'react';
import './style.css';
import 'font-awesome/css/font-awesome.min.css';


export default class Todo extends Component {

    state = {
        tasks: [],
        inputValue: ''
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };
    addNewTask = () => {
        const inputValue = this.state.inputValue.trim();

        if (!inputValue) {
            return;
        }

        const tasks = [...this.state.tasks, inputValue];


        this.setState({
            tasks: tasks,
            inputValue: ''
        });
    }

    removeTask = (event) => {
        console.log(event);
    };

  
    
render(){
    const { tasks, inputValue } = this.state;

    const taskComponents = tasks.map((task, index) => {
        return <li key={index}>
            <div>
                <h5>{task}</h5>
                <i className='fa fa-trash' onClick={this.removeTask}></i>
            </div>
        </li>
    });

    return (
        <div className="task">
            <h2>ToDo List</h2>
            <input value={inputValue} type="text" onChange={this.handleChange} />
            <button onClick={this.addNewTask}>Add task</button>
            <ol className="card">{taskComponents}</ol>
        </div>
    );
}
    }
