import React, { PureComponent } from 'react';
//import styles from './todo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../../Task/task';
import NewTask from '../../NewTask/NewTask';
import Confirm from '../../confirm';
import EditTaskModal from '../../editTaskModal';

export default class Todo extends PureComponent {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false,
        openNewTaskModal: false,
        editTask: null
    };

    componentDidMount(){
        fetch('http://localhost:3001/task', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json();

                if(response.status >=400 && response.status < 600){
                    if(res.error){
                        throw res.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }

                this.setState({
                    tasks: res
                });

            })
            .catch((error)=>{
                console.log('catch error', error);
            });

    }
    addNewTask = (newTask) => {
        fetch('http://localhost:3001/task', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }

                const tasks = [...this.state.tasks, res];

                this.setState({
                    tasks,
                    openNewTaskModal: false
                });

            })
            .catch((error) => {
                console.log('catch error', error);
            });
    };

    removeTask = (taskId) => {
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }

                const newTasks = this.state.tasks.filter((task) => taskId !== task._id);

                this.setState({
                    tasks: newTasks
                });
            })
            .catch((error) => {
                console.log('catch error', error);
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

        const body = {
            tasks: [...selectedTasks]
        };
        fetch(`http://localhost:3001/task`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }

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
            })
            .catch((error) => {
                console.log('catch error', error);
            });
    };

    checkConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    selectAll = () => {
        const taskIds = this.state.tasks.map((task) => task._id);
        this.setState({
            selectedTasks: new Set(taskIds)
        });
    };

    deSelectAll = () => {
        this.setState({
            selectedTasks: new Set()
        });
    };

    toggleNewTaskModal = ()=>{
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        });
    };

    handleEdit = (editTask)=>{
        this.setState({ editTask });
    };

     
    handleSaveTask = (editedTask)=>{
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedTask),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }

            const tasks = [...this.state.tasks];
            const foundIndex = tasks.findIndex((task) => task._id === editedTask._id);
            tasks[foundIndex] = editedTask;

            this.setState({
                tasks,
                editTask: null
            });
            })
            .catch((error) => {
                console.log('catch error', error);
            });
        
    };

   
    render() {
        const { tasks, selectedTasks, showConfirm, openNewTaskModal, editTask } = this.state;

        const taskComponents = tasks.map((task) => {
            return <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Task
                    data={task}
                    onCheck={this.checkTasks}
                    disabled={!!selectedTasks.size}
                    onDelete={this.removeTask} selected={selectedTasks.has(task._id)}
                    onEdit={this.handleEdit}
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
                
                <Row className="justify-content-center" >
                    <Col> 
                        <Button
                                variant="outline-primary" onClick={this.toggleNewTaskModal}
                            >
                                Add new Task
                        </Button>
                    </Col>
                    <Col>
                        <Button
                                variant="outline-warning" onClick={this.selectAll}
                            >
                                Select All
                        </Button>

                    </Col>
                    <Col>
                        <Button
                                variant="outline-warning" onClick={this.deSelectAll}
                            >
                                Deselect All
                        </Button>
                    </Col>
                    <Col xs={2} sm={3}>
                        <Button 
                        variant="outline-danger" onClick={this.checkConfirm} disabled={!selectedTasks.size} >
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
            {
            openNewTaskModal &&
                    <NewTask
                    className='modal'
                    onClose = {this.toggleNewTaskModal}
                        onAdd={this.addNewTask}
                />
            }
            {
            editTask && 
                    <EditTaskModal
                        data = {editTask}
                        onClose = {()=> this.handleEdit(null)}
                        onSave = {this.handleSaveTask}
                />
            }
        </div>
        );
    }
}
