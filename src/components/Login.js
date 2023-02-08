import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const formRef = useRef();
  const [modal, setModal] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const toggle = () => setModal(!modal);

  const logueo = async (e) => {
    e.preventDefault();
    const datosForm = new FormData(formRef.current);
    const valores = Object.fromEntries(datosForm);

    console.log(valores);

    if (valores.email.length < 1 || valores.password.length < 1) {
      setMensaje("debe ingresar usuario y contraseña");
      setModal(true);
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const llamada = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          email: valores.email,
          password: valores.password,
        }),
      })

      console.log("status=>",llamada.status)

      const jeison = await llamada.json()

      console.log("respuesta json=>",jeison)

      if (llamada.status == 400) {
        setMensaje(jeison.message);
        setModal(true);
      }

      if (llamada.status == 200) {
        console.log("respuesta de posible token: ")
        console.log(jeison)
        sessionStorage.setItem("tokenLogin", jeison.token);
        return navigate("/explore");
      }

    }
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <br></br>
            <br></br>
            <br></br>
            <Card
              style={{
                width: "18rem",
              }}
            >
              <CardBody>
                <CardTitle tag="h5">Desafiogram</CardTitle>
                <hr></hr>
                <form onSubmit={logueo} ref={formRef}>
                  <Input placeholder="email" name="email" />
                  <br></br>
                  <Input
                    placeholder="password"
                    name="password"
                    type="password"
                  />
                  <br></br>
                  <Button color="primary" type="submit">
                    Login
                  </Button>
                </form>
                <br></br>
                <br></br>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  No tienes cuenta ? <a href="/registro">Signup</a>
                </CardSubtitle>
              </CardBody>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Advertencia</ModalHeader>
        <ModalBody>{mensaje}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            ok
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Login;
