import React, { PureComponent } from 'react';
import { Button, FormControl,Modal } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types';

class NewTask extends PureComponent {
    state = {
        title: '',
        description: ''
    };

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return;
        }

        const newTask = {
            _id: idGenerator(),
            title,
            description
        };

        this.props.onAdd(newTask);

    };

    render() {
        const { onClose } = this.props;

        return (

            <>
                <Modal
                    className={this.props.className}
                    show={true}
                    onHide={onClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add new Task
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            placeholder="Title" onChange={this.handleChange} name='title' onKeyPress={this.handleKeyDown} className='mb-3'
                        />
                        <FormControl
                            placeholder="Description" as="textarea" 
                            rows={5} 
                            name='description' onChange={this.handleChange} 
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={this.handleSubmit}
                            variant='success'
                        >
                            Add
            </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>

        );
    }
}

NewTask.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default NewTask;