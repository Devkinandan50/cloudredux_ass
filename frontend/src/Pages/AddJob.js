import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import StateContext from "../context/some_State/stateContext"
import { Form, Button } from 'react-bootstrap';


const AddJob = () => {
    const check_admin = localStorage.getItem("admin");
    const statecontext = useContext(StateContext);
    const { login, setlogin } = statecontext;



    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    const handleJobTitleChange = (event) => {
        setJobTitle(event.target.value);
    };

    const handleJobDescriptionChange = (event) => {
        setJobDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("job posted")
        setJobTitle('');
        setJobDescription('');
    };
    return (
        <div>

            <h3>Add Job From here</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="jobTitle">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={jobTitle}
                        onChange={handleJobTitleChange}
                        placeholder="Enter job title"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="jobDescription">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={jobDescription}
                        onChange={handleJobDescriptionChange}
                        placeholder="Enter job description"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Post Job
                </Button>
            </Form>


        </div>
    )
}
export default AddJob

