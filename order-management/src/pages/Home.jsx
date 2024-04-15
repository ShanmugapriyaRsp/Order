import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Container } from "react-bootstrap";
import NavBar from "./NavBar";
import {FaTruck} from "react-icons/fa"

export default function Home() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const getOrders = () => {
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:8081/getOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setOrders(res.data);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      return navigate("/login");
    }
    getOrders();
  }, []);
  return (
    <div>
      <>
        <NavBar />
        <Container>
          <Row className="mt-3">
            {orders.map((order, i) => (
              <Col className="mt-2" md={3} key={i}>
                <Card className="shadow p-3 mb-5 bg-body-tertiary rounded">
                  <Card.Body>
                    <h1>{order.productName}</h1>
                    <h5><FaTruck/> <span>{new Date(order.deliveryDate).toLocaleDateString()}</span></h5>
                    <h5>&#8377; {order.totalAmount}</h5>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </>
    </div>
  );
}
