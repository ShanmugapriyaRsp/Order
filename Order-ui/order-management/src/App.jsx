import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import Order from "./pages/Order";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addOrder" element={<Order />} />
      </Routes>
    </>
  );
}

export default App;
