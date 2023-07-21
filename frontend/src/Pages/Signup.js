import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@material-ui/core';





const Signup = () => {

    
        const [isAdmin, setIsAdmin] = useState(false);
      
        const handleSwitchChange = () => {
          setIsAdmin((prevIsAdmin) => !prevIsAdmin);
        };

    const [credentials, setCredentials] = useState({ firstname: "", lastname: "", email: "", password: "", cpass: "" })

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstname, lastname, email, password, cpass } = credentials;

        if (cpass === password) {
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstname: firstname, lastname: lastname, email: email, password: password, admin: isAdmin })
            });
            const json = await response.json()
            console.log(json);
            if (json.success) {
                setCredentials({ firstname: "", lastname: "", email: "", password: "", cpass: ""});
                alert(`${json.message}`, {
                    position: "top-center"
                });
            }
            else {
                
                alert(`${json.error}`, {
                    position: "top-center"
                });
            }
        }
        else {
            alert("Password are not same", {
                position: "top-center"
            });
        }
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
                                                <Form.Group className="mb-3" controlId="Name">
                                                    <Form.Label className="text-center">Name</Form.Label>
                                                    <input type="text" id="firstname" name="firstname" value={credentials.firstname} className="form-control" aria-describedby="emailHelp" placeholder="Enter name" onChange={onchange} required minLength={3} maxLength={18} />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center">
                                                        Last name
                                                    </Form.Label>
                                                    <input type="text" id="lastname" name="lastname" value={credentials.lastname} className="form-control" aria-describedby="emailHelp" placeholder="Enter name" onChange={onchange} required minLength={3} maxLength={18} />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center">
                                                        email
                                                    </Form.Label>
                                                    <input type="email" id="email" name="email" value={credentials.email} className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} required />
                                                </Form.Group>


                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicPassword"
                                                >
                                                    <Form.Label>Password</Form.Label>
                                                    <input type="password" id="password" name="password" value={credentials.password} className="form-control" placeholder="Password" onChange={onchange} minLength={5} required />
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicPassword"
                                                >
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <input type="password" id="cpass" name="cpass" value={credentials.cpass} className="form-control" placeholder="Confirm Password" onChange={onchange} minLength={5} required />
                                                </Form.Group>

                                                {/* <Form.Label>Are You admin</Form.Label> */}
                                                <div className="custom-control custom-switch">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="admin-switch"
                                                        checked={isAdmin}
                                                        onChange={handleSwitchChange}
                                                    />
                                                    <label className="custom-control-label" htmlFor="admin-switch">
                                                        Admin
                                                    </label>
                                                </div>



                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicCheckbox"
                                                ></Form.Group>
                                                <div className="d-grid">
                                                    <Button variant="primary" type="submit">
                                                        Create Account
                                                    </Button>
                                                </div>
                                            </Form>
                                            <div className="mt-3">
                                                <p className="mb-0  text-center">
                                                    Already have an account??{' '}
                                                    <a href="{''}" className="text-primary fw-bold">
                                                        log In
                                                    </a>
                                                </p>
                                            </div>
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

export default Signup
