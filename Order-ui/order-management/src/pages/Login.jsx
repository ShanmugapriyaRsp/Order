import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
    const [formData, setFormData] = useState({ userName: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/auth/login", formData).then((res) => {
            console.log(res.data);
            if (res.status == 200) {
                localStorage.setItem("token", res.data);
                return navigate("/")
            }

        });
    }
    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            return navigate("/")
        }

    })
    return (
        <>
            <Container>
                <Row className='d-flex justify-content-center align-items-center'>
                    <Col md={5}>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>userName</Form.Label>
                                        <Form.Control type='text' name='userName' id='userName' value={formData.userName} onChange={handleChange} required />
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type='password' name='password' id='password' value={formData.password} onChange={handleChange} required />
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                        <Button type='submit'>Submit</Button>
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                        <Link to={'/register'}>Register</Link>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
