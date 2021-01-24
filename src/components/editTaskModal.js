import React, {Component} from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types'; 

class EditTaskModal extends Component{
  constructor(props){
    super(props);
    this.state = {
        ...props.data
    };
  }

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    };

    handleSubmit = ()=>{
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return;
        }

        this.props.onSave({
          _id: this.state._id,
          title,
          description
        });
    };

    render(){
        const {onClose} = this.props;
        const {title, description} = this.state;

        return(
            <Modal
            show={true}
            onHide={onClose}
            size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <FormControl
              placeholder="Title"
              onChange={this.handleChange}
            name='title'
            value={title}
              onKeyPress={this.handleKeyDown}
              className='mb-3'
          />
          <FormControl 
          placeholder="Description"
          as="textarea" 
          rows={5} 
          name='description'
          value={description}
          onChange={this.handleChange}
          />

          </Modal.Body>
          <Modal.Footer>
            <Button 
            onClick={this.handleSubmit}
            variant='success'
            >
            Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>
        );
    }
}

EditTaskModal.propTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default EditTaskModal;