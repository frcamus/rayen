import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Explore from "./components/Explore";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Container,
  Row,
  Col,
  Input,
} from "reactstrap";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setPost(json));
  }, []);

  return (
    <>
      <Router>
        <Routes>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registro" element={<Registro/>}/>
            <Route path="/explore" element={<Explore/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
