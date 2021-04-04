import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { Card, Button } from 'react-bootstrap';
import styles from './taskStyle.module.css';
import PropTypes from 'prop-types';
import {formatDate, textTruncate} from '../../helpers/utils';
import { Link } from 'react-router-dom';
import {editTask} from '../../Store/Actions';
import {connect} from 'react-redux';


class Task extends PureComponent {
    
    handleChange = () => {
        const { data, onCheck } = this.props;
        onCheck(data._id);
        
    };

    render() {
        const task = this.props.data;
        const { disabled, onDelete, selected, onEdit, editTask } = this.props;
        
        return (
            <Card className={`${styles.task} ${selected ? styles.selected : ""}`}>

                    <Card.Body>
                    <input type="checkbox" onChange={ this.handleChange } checked={selected}/>

                    <Link to={`/task/${task._id}`}><Card.Title>{textTruncate(task.title, 25)}</Card.Title></Link>
                    <Card.Text>Description: {textTruncate(task.description, 50)}</Card.Text>
                    <Card.Text>Status: {task.status}</Card.Text>
                    <Card.Text> Created at: {formatDate(task.created_at)}</Card.Text>
                    <Card.Text> Date: {formatDate(task.date)}</Card.Text>
                        {task.status==="active" ?
                            <Button className='m-1' variant="success" disabled={disabled} 
                            onClick={() => editTask({
                                status: 'done',
                                _id: task._id
                                })}
                            >
                            <FontAwesomeIcon icon={faCheck} />
                            </Button> :

                            <Button className='m-1' variant="secondary" disabled={disabled}
                            onClick={() =>  editTask({
                                status: 'active',
                                _id: task._id
                                }) }
                            >
                            <FontAwesomeIcon icon={faRedo} />
                            </Button>
                        }

                        <Button variant="warning" className={styles.icon} disabled={disabled}
                        onClick={() => onEdit(task)}><FontAwesomeIcon icon={faEdit} /></Button>
                        <Button variant="danger" className={styles.icon} onClick={() => onDelete(task._id)} disabled={disabled}><FontAwesomeIcon icon={faTrash} /></Button>
                    </Card.Body>
                
            </Card>
        )
    }
}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
    editTask
};

export default connect(null, mapDispatchToProps)(Task);