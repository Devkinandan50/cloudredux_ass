import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@material-ui/core';





const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch(`${host}/api/auth/login`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email: credentials.email, password: credentials.password })
        // });
        // const json = await response.json()
        // // console.log(json);
        // if (json.success) {
        //     // Save the auth token and redirect
        //     localStorage.setItem('token', json.authtoken);
        //     set_checK_loginOr_not(true);
        //     setloginusername(json.firstname);
        //     toast.success(`${json.message}`, {
        //         position: "top-center"
        //     });
        //     history.push("/");
        // }
        // else {
        //     toast.error(`${json.error || json.error.msg}`, {
        //         position: "top-center"
        //     });
        // }
    }

    const onChange = (e) => {
        // get by id or name
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div>
                <Container>
                    <Row className="vh-100 d-flex justify-content-center align-items-center">
                        <Col md={8} lg={6} xs={12}>
                            <Card className="px-4">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-center text-uppercase ">
                                            Logo
                                        </h2>
                                        <div className="mb-3">
                                            <Form onSubmit={handleSubmit}>
                                                
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center">
                                                        email
                                                    </Form.Label>
                                                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                                                </Form.Group>


                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicPassword"
                                                >
                                                    <Form.Label>Password</Form.Label>
                                                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                                                </Form.Group>
                                                

                                                {/* <Form.Label>Are You admin</Form.Label> */}
                                                



                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicCheckbox"
                                                ></Form.Group>
                                                <div className="d-grid">
                                                    <Button variant="primary" type="submit">
                                                        login
                                                    </Button>
                                                </div>
                                            </Form>
                                            
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>


        </div>
    )
}

export default Login
