import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './registerStyle.module.css';
import { connect } from 'react-redux';
import { register } from '../../../Store/Actions';

function Register(props) {
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: ''
    });

    const [errors, setErrors] = useState({
        email: null,
        password: null,
        confirmPassword: null,
        name: null,
        surname: null
    });

    const handleSubmit = () => {
        const { email, password, confirmPassword, name, surname } = values;
        let valid = true;
        let confirmPasswordMessage = null;
        let passwordMessage = null;
        let emailMessage = null;
        const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-?;,./{}|":<>[\]\\' ~_]).{8,}/
        const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!confirmPassword) {
            confirmPasswordMessage = "Password is required";
            valid = false;
        }
        if (password !== confirmPassword) {
            confirmPasswordMessage = "Passwords didn't match";
            valid = false;
        }

        if (!password) {
            passwordMessage = "Password is required";
            valid = false;
        }

        if (password && (!passwordReg.test(password))) {
            passwordMessage = "Invalid password, it must be a minimum of 8 characters including number, Upper, Lower And one special character";
            valid = false;
        }

        if (!email) {
            emailMessage = "Email is required";
            valid = false;
        }

        else if (email && (!emailReg.test(email))) {
            emailMessage = "Invalid email";
            valid = false;

        }

        setErrors({
            name: name ? null : "Name is required",
            surname: surname ? null : "Surname is required",
            email: emailMessage,
            confirmPassword: confirmPasswordMessage,
            password: passwordMessage,
        });

        if (valid) {
            props.register(values);
        }

    };

    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: null
        });

    };

    return (

        <div className={styles.main}>
            <Container>

                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <Form>
                            <h3 className={styles.heading}>Register</h3>
                            <Form.Group>
                                <Form.Control
                                    className={errors.name ? styles.invalid : ''}
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    className={errors.surname ? styles.invalid : ''}
                                    type="text"
                                    name="surname"
                                    placeholder="Enter your surname"
                                    value={values.surname}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>

                                <Form.Control
                                    className={errors.email ? styles.invalid : ''}
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger" >
                                        {errors.email}
                                    </Form.Text>
                                }

                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    className={errors.password ? styles.invalid : ''}
                                    type="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    name="password"
                                />
                                {
                                    <Form.Text className="text-danger">
                                        {errors.password}
                                    </Form.Text>
                                }

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                    className={errors.confirmPassword ? styles.invalid : ''}
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    name="confirmPassword"
                                />
                                <Form.Text className="text-danger">
                                    {errors.confirmPassword}
                                </Form.Text>
                            </Form.Group>

                            <div className={styles.submitContainer}>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Register
                            </Button>
                            </div>

                            <Link to='/login'>Already registered? Try to login.</Link>

                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

const mapDispatchToProps = {
    register
}
export default connect(null, mapDispatchToProps)(Register);