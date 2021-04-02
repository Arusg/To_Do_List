import React, { Component } from 'react';
import styles from './style.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../../Task/task';
import NewTask from '../../NewTask/NewTask';
import Confirm from '../../confirm';
import EditTaskModal from '../../editTaskModal';
import { connect } from 'react-redux';
import { getTasks, deleteTask,deleteTasks } from '../../../Store/Actions';
import Search from '../../Search/Search';

class Todo extends Component {

    state = {
        selectedTasks: new Set(),
        showConfirm: false,
        openNewTaskModal: false,
        editTask: null
    };

     componentDidMount() {
        this.props.getTasks();
    }


    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.setState({
                openNewTaskModal: false
            });
            return;
        }

        if (!prevProps.deleteTasksSuccess && this.props.deleteTasksSuccess) {
            this.setState({
                selectedTasks: new Set(),
                showConfirm: false
            });
            return;
        }

        if (!prevProps.editTasksSuccess && this.props.editTasksSuccess) {
            this.setState({
               editTask: null
            });
            return;
        }
    }

    
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
        const { selectedTasks } = this.state;
        this.props.deleteTasks(selectedTasks);
    };

    checkConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    selectAll = () => {
        const taskIds = this.props.tasks.map((task) => task._id);
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
        const {selectedTasks, showConfirm, openNewTaskModal, editTask } = this.state;
        const { tasks } = this.props;
        const taskComponents = tasks.map((task) => {
            return <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Task
                    data={task}
                    onCheck={this.checkTasks}
                    disabled={!!selectedTasks.size}
                    onDelete={this.props.deleteTask} selected={selectedTasks.has(task._id)}
                    onEdit={this.handleEdit}
                />
            </Col>
        });
 
        return (
        <div>
            <Container>
                <Row >
                    <Col className="text-center">
                        <h2 className={styles.title}>ToDo List</h2>
                    </Col>
                </Row>
                    <Row >
                    <Col>
                        <Search />
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

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        deleteTasksSuccess: state.deleteTasksSuccess,
        editTasksSuccess: state.editTasksSuccess
    };
};
const mapDispatchToProps = {
    getTasks,
    deleteTask,
    deleteTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);