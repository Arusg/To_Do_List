import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Card, Button } from 'react-bootstrap';
import styles from './taskStyle.module.css';
import PropTypes from 'prop-types';
import {formatDate, textTruncate} from '../../helpers/utils';
import { Link } from 'react-router-dom';


class Task extends PureComponent {
    

    handleChange = () => {
        const { data, onCheck } = this.props;
        onCheck(data._id);
        
    };

    render() {
        const task = this.props.data;
        const { disabled, onDelete, selected, onEdit } = this.props;
        
        return (
            <Card className={`${styles.task} ${selected ? styles.selected : ""}`}>

                    <Card.Body>
                    <input type="checkbox" onChange={ this.handleChange } checked={selected}/>
                    <Link to={`/task/${task._id}`}><Card.Title>{task.title}</Card.Title></Link>
                    <Card.Text>Description: {textTruncate(task.description)}</Card.Text> 
                        <Card.Text> Date: {formatDate(task.date)}</Card.Text>
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

export default Task;