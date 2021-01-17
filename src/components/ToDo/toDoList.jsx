import React, { Component } from 'react';
import styles from './style.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../Task/task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../confirm';

export default class Todo extends Component {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false
    };

   
    addNewTask = (newTask) => {
        const tasks = [...this.state.tasks, newTask];

        this.setState({
            tasks
        });

    };

    removeTask = (taskId) => {
        const newTasks = this.state.tasks.filter((task) => taskId !== task._id);

        this.setState({
            tasks: newTasks
        });
    };

    checkTasks = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        }
        else {
            selectedTasks.add(taskId);
        }

        this.setState({
            selectedTasks
        });
    };

    removeSelectedTasks = () => {
        const { selectedTasks, tasks } = this.state;

        const newTasks = tasks.filter((task) => {
            if (selectedTasks.has(task._id)) {
                return false;
            }
            return true;
        });

        this.setState({
            tasks: newTasks,
            selectedTasks: new Set(),
            showConfirm: false
        });
    };

    checkConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

   
    render() {
        const { tasks, selectedTasks, showConfirm } = this.state;

        const taskComponents = tasks.map((task) => {
            return <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Task
                    data={task}
                    onCheck={this.checkTasks}
                    disabled={!!selectedTasks.size}
                    onDelete={this.removeTask}
                />
            </Col>
        });



        return (
        <div>
            <Container>
                <Row >
                    <Col className="text-center">
                        <h2>ToDo List</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="styles.addingTasks" xs={4} sm={6} >
                        <NewTask 
                        disabled = {!!selectedTasks.size}
                        onAdd = {this.addNewTask}
                        />
                        
                    </Col>
                </Row>
                <Row className="justify-content-center" >
                    <Col xs={2} sm={3}>
                        <Button variant="outline-danger" onClick={this.checkConfirm} disabled={!selectedTasks.size} className={styles.removeSelected}>
                            Remove selected
                    </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center">{taskComponents}</Row>
            </Container>
            {showConfirm && 
                <Confirm 
                    onClose={this.checkConfirm}
                    onConfirm={this.removeSelectedTasks}
                    count={selectedTasks.size}
                />
            } 
        </div>
        );
    }
}
