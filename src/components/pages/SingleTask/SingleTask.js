
import React, {Component} from 'react';
import {Card, Button, Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrash, faEdit, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../helpers/utils';

import EditTaskModal from '../../editTaskModal';
import { getTask, deleteTask, editTask } from '../../../Store/Actions';
import { connect } from 'react-redux';
import styles from './singleTaskStyle.module.css';


class SingleTask extends Component {
    state = {

        openEditModal: false
    };


    componentDidMount(){

        const taskId = this.props.match.params.taskId;

        this.props.getTask(taskId);

    }


    componentDidUpdate(prevProps) {
        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.setState({
                openEditModal: false

            });
            return;
        }
    }

    deleteTask = () => {
        const taskId = this.props.task._id;
        this.props.deleteTask(taskId, 'single');
    }



    toggleEditModal = () => {

        this.setState({
            openEditModal: !this.state.openEditModal
        });
    };


    render() {
        const { openEditModal } = this.state;
        const { task, disabled, editTask } = this.props;
        
        return (
            <div className={styles.singleTaskPage}>
                <Container >
                    <Row >
                        <Col xs={12}>
                            {
                                task ?
                                    <Card className='text-center'>

                                        <Card.Body>
                                            <Card.Title>{task.title}</Card.Title>
                                            <Card.Text>
                                                Description: {task.description}
                                            </Card.Text>
                                            <Card.Text>
                                                Status: {task.status}
                                            </Card.Text>
                                            <Card.Text> 
                                                Created at: {formatDate(task.created_at)}
                                            </Card.Text>
                                            <Card.Text>
                                                Date: {formatDate(task.date)}
                                            </Card.Text>
                                            {
                                                task.status === "active" ?
                                                    <Button
                                                        className='m-1'
                                                        variant="success"
                                                        disabled={disabled}
                                                        onClick={() => editTask({
                                                            status: 'done',
                                                            _id: task._id
                                                        }, "single")}
                                                    >
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </Button> :

                                                    <Button
                                                        className='m-1'
                                                        variant="secondary"
                                                        disabled={disabled}
                                                        onClick={() => editTask({
                                                            status: 'active',
                                                            _id: task._id
                                                        }, "single")}
                                                    >
                                                        <FontAwesomeIcon icon={faRedo} />
                                                    </Button>
                                            }
                                            <Button
                                                className='m-1'
                                                variant="warning"
                                                onClick={this.toggleEditModal}

                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>

                                            <Button
                                                className='m-1'
                                                variant="danger"
                                                onClick={this.deleteTask}

                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>

                                        </Card.Body>
                                    </Card> :
                                    <p>Task data not exists!</p>
                            }

                        </Col>
                    </Row>
                </Container>

                {
                    openEditModal &&
                    <EditTaskModal
                        data={task}
                        onClose={this.toggleEditModal}
                        from='single'
                    />
                }
            </div>
        );
    }



};

const mapStateToProps = (state) => {
    return {
        task: state.task,
        editTaskSuccess: state.editTaskSuccess
    };
};

const mapDispatchToProps = {
    getTask,
    deleteTask,
    editTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);