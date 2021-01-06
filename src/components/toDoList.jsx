import React, { Component } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import {Container, Row, Col, Button, InputGroup, FormControl} from 'react-bootstrap';


export default class Todo extends Component {

    state = {
        tasks: [],
        inputValue: {title: ""}
    }

    handleChange = (event) => {
        this.setState({
            inputValue: {title: event.target.value}
        });
    };
    addNewTask = () => {
        const inputValue = {title: this.state.inputValue.title.trim()};

        if (!inputValue.title) {
            return;
        }

        const tasks = [...this.state.tasks, inputValue];


        this.setState({
            tasks: tasks,
            inputValue: {title: ""}
        });
    }

    removeTask = (event) => {
        console.log(event);
    };

  
    
render(){
    const { tasks, inputValue } = this.state;

    const taskComponents = tasks.map((task, index) => {
        return <Col key={index} xs = {12} sm ={6} md={4} lg={3} xl={2}>
                   <div className="card">
                        <input type="checkbox" />
                        <h5>{task.title.slice(0,6)}</h5>
                        <p>Description:{task.title} </p>
                        <Button variant="warning" className="icon"><FontAwesomeIcon icon={faEdit} /></Button>
                        <Button variant="danger" className="icon" onClick={this.removeTask}><FontAwesomeIcon icon={faTrash} /></Button>
                    </div>
                </Col>
    });

    return (
          
            <Container className="task">
                <Row >
                <Col className="title">
                        <h2>ToDo List</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                <Col className="addingTasks" xs = {4} sm ={6} >
                    <InputGroup>
                        <FormControl
                            value={inputValue.title} type="text" onChange={this.handleChange}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-primary" onClick={this.addNewTask}>Add task</Button>
                        </InputGroup.Append>
                    </InputGroup>
                        
                    </Col>
                </Row>
                <Row className="justify-content-center">{taskComponents}</Row>
            </Container>
        
    );
}
    }
