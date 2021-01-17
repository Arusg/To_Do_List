import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Card, Button } from 'react-bootstrap';
import styles from './taskStyle.module.css';
import PropTypes from 'prop-types'; 


class Task extends Component {
    state = {
        selected: false
    };

    handleChange = () => {
        const { data, onCheck } = this.props;
        onCheck(data._id);
        this.setState({
            selected: !this.state.selected,
        });
    };

    render() {
        const task = this.props.data;
        const { disabled, onDelete } = this.props;
        const { selected } = this.state;

        return (
            <Card className={`${styles.task} ${selected ? styles.selected : ""}`}>

                    <Card.Body>
                    <input type="checkbox" onChange={ this.handleChange } />
                        <Card.Title>{task.title.slice(0, 8)}</Card.Title>
                        <Card.Text>Description:{task.title}</Card.Text>
                        <Button variant="warning" className={styles.icon}><FontAwesomeIcon icon={faEdit} /></Button>
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
};

export default Task;