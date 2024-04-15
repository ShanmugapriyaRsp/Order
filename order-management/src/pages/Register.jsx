import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", roles: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        formData.roles = "USER_ROLES";
        axios.post("http://localhost:8080/auth/Register", formData).then((res) => {
            console.log(res);
            if (res.status == 200) {
                return navigate("/login")
            }
        });
    }

    return (
        <>
            <Container>
                <Row className='d-flex justify-content-center align-items-center'>
                    <Col>
                        <Card className='shadow-lg'>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>userName</Form.Label>
                                        <Form.Control type='text' name='name' id='name' value={formData.name} onChange={handleChange} required />
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type='password' name='password' id='password' value={formData.password} onChange={handleChange} required />
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='email' name='email' id='email' value={formData.email} onChange={handleChange} required />
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                        <Button type='submit'>Submit</Button>
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                        <Link to={'/login'}>Login</Link>
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
