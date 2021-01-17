import React, {Component} from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types'; 

class NewTask extends Component{
    state = {
        title: '',
        
    };

    handleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    };

    handleSubmit = ()=>{
        const title = this.state.title.trim();
       

        if (!title) {
            return;
        }

        const newTask = {
            _id: idGenerator(),
            title,
           
        };

        this.props.onAdd(newTask);
        this.setState({
            title: '',
            
        });
    };

    render(){
        const {title} = this.state;
        const {disabled} = this.props;

        return(
            <InputGroup>
                            <FormControl
                                placeholder="Title" value={title} type="text" onChange={this.handleChange} onKeyDown={this.handleKeyDown} disabled={disabled}
                            />
                            <InputGroup.Append>
                                <Button variant="outline-primary" onClick={this.handleSubmit} disabled={disabled}> Add task</Button>
                            </InputGroup.Append>
            </InputGroup>
           
        );
    }
}

NewTask.propTypes = {
    onAdd: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};

export default NewTask;