import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './contactStyle.module.css';
import {connect} from 'react-redux';
import {sendContactForm} from '../../../Store/Actions';

const requiredErrorMessage = 'Field is required';

function Contact(props) {
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null
    });

    const handleChange = ({ target: { name, value } }) => {

        if (!value) {
            setErrors({
                ...errors,
                [name]: requiredErrorMessage
            });
        }
        else {
            setErrors({
                ...errors,
                [name]: null
            });
        }

        if (name === 'email' && value) {
            const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailReg.test(value)) {
                setErrors({
                    ...errors,
                    email: 'Invalid email'
                });
            }
        }


        setValues({
            ...values,
            [name]: value
        });

    };

     const handleSubmit = () => {
        const errorsArr = Object.values(errors);
        const errorsExist = !errorsArr.every(el => el === null);

        const valuesArr = Object.values(values);
        const valuesExist = !valuesArr.some(el => el === '');

        if (valuesExist && !errorsExist) {

            props.sendContactForm(values);

        }

        if (!valuesExist && !errorsExist) {
            setErrors({
                name: requiredErrorMessage,
                email: requiredErrorMessage,
                message: requiredErrorMessage
            });
        }

    };

    const {sendFormSuccess} = props;

    useEffect(() => {
        if (sendFormSuccess) {
            setValues({
                name: '',
                email: '',
                message: ''
            });
        }
    }, [sendFormSuccess]);

    return (
        <Container className={styles.contactPage}>
            <Row className='justify-content-center'>
                <Col xs={7}>
                    <Form className='mt-5'>
                        <h2 className='text-center'>Contact us</h2>
                        <Form.Group>
                            <Form.Control
                                className={errors.name ? styles.invalid : ''}
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-danger">
                                {errors.name}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className={errors.email ? styles.invalid : ''}
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                            <Form.Text className="text-danger">
                                {errors.email}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                className={errors.message ? styles.invalid : ''}
                                placeholder="Enter your message"
                                rows={5}
                                name="message"
                                value={values.message}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-danger">
                                {errors.message}
                            </Form.Text>
                        </Form.Group>
                        <div className="text-center">
                            <Button
                                variant="primary"
                                onClick={handleSubmit}
                                className={styles.submitButton}
                            >
                                Send
                </Button>
                        </div>

                    </Form>

                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        sendFormSuccess: state.sendFormSuccess
    };
};

const mapDispatchToProps = {
    sendContactForm
}
export default connect(mapStateToProps, mapDispatchToProps)(Contact);