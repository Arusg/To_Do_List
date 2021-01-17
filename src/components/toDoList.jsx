import React, { Component } from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button, InputGroup, FormControl, Card} from 'react-bootstrap';
import idGenerator from '../helpers/idGenerator';


export default class Todo extends Component {

    state = {
        inputValue: '',
        tasks: [],
        selectedTasks: new Set()
    };

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

        const newTask = {
            _id: idGenerator(),
            title: inputValue
        };

        const tasks = [...this.state.tasks, newTask];


        this.setState({
            tasks: tasks,
            inputValue: ""
        });
    }

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

    removeSelectedTasks = (taskId)=>{
        const { selectedTasks, tasks } = this.state;

        const newTasks = tasks.filter((task) => {
            if (selectedTasks.has(task._id)) {
                return false;
            }
            return true;
        });

        this.setState({
            tasks: newTasks,
            selectedTasks: new Set()
        });
    };

    handleKeyDown = (event)=>{                     
        if(event.key==="Enter"){
            this.addNewTask();
        }
    };

    render() {
        const { tasks, inputValue, selectedTasks } = this.state;

        const taskComponents = tasks.map((task) => {
            return <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card className={styles.task}>
                    <Card.Body>
                        <input type="checkbox" onChange={() => this.checkTasks(task._id)} />
                        <Card.Title>{task.title.slice(0, 8)}</Card.Title>
                        <Card.Text>Description:{task.title}</Card.Text>
                        <Button variant="warning" className={styles.icon}><FontAwesomeIcon icon={faEdit} /></Button>
                        <Button variant="danger" className={styles.icon} onClick={() => this.removeTask(task._id)} disabled={!!selectedTasks.size}><FontAwesomeIcon icon={faTrash} /></Button>
                    </Card.Body>
                </Card>
            </Col>
        });
       

       
        return (

            <Container>
                <Row >
                    <Col className="text-center">
                        <h2>ToDo List</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="styles.addingTasks" xs={4} sm={6} >
                        <InputGroup>
                            <FormControl
                                value={inputValue} type="text" onChange={this.handleChange} onKeyDown = {this.handleKeyDown} disabled={!!this.state.selectedTasks.size}
                            />
                            <InputGroup.Append>
                                <Button variant="outline-primary" onClick={this.addNewTask} disabled={!!selectedTasks.size}>Add task</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="justify-content-center" >
                    <Col xs={2} sm={3}>
                        <Button variant="outline-danger" onClick={this.removeSelectedTasks} disabled={!selectedTasks.size} className={styles.removeSelected}>
                            Remove selected
                    </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center">{taskComponents}</Row>
            </Container>

        );
    }
}
