import { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Navbar,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function Order() {
  const [formData, setFormData] = useState({
    orderId: "",
    productName: "",
    deliveryDate: "",
    totalAmount: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    axios
      .post("http://localhost:8081/saveOrders", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          alert(res.data);
          return navigate("/");
        }
      });
  };

  return (
    <>
      <NavBar />
      <Container>
        <Row className="d-flex justify-content-center align-items-center mt-4">
          <Col md={5}>
            <Card className="shadow-lg">
              <Card.Body >
                <Form onSubmit={handleSubmit}>
                  {/* <Form.Group className="mb-2">
                    <Form.Label>OrderId</Form.Label>
                    <Form.Control
                      type="text"
                      name="orderId"
                      id="orderId"
                      value={formData.orderId}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group> */}
                  <Form.Group className="mb-2">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="productName"
                      id="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>delivery Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="deliveryDate"
                      id="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Total Amount</Form.Label>
                    <Form.Control
                      type="number"
                      name="totalAmount"
                      id="totalAmount"
                      value={formData.totalAmount}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Button type="submit">Submit</Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
