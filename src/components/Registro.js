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

function Registro() {
  const formRef = useRef();
  const [modal, setModal] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const toggle = () => setModal(!modal);

  const registrarse = (e) => {
    e.preventDefault();
    const datosForm = new FormData(formRef.current);
    const valores = Object.fromEntries(datosForm);
/* 
    let formBody = new FormData();
    formBody.append("username", valores.username) */

    console.log(valores);

/*     El nombre del
    usuario debe ser alfanúmerico y tener entre 3 y 30 caracteres. La
    contraseña debe tener entre 6 y 200 caracteres. Asegúrate de que el
    email sea válido */

    var regxpUsername = /^([a-zA-Z0-9_-]){3,30}$/;
    let usernameVal = regxpUsername.test(valores.username);
    const validaemail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    let emailVal = validaemail.test(valores.email);

    console.log("username 3 a 30 y alfanumerico: "+usernameVal)
    console.log("password menor 6: "+(valores.password.length < 6))
    console.log("password mayor 200: "+(valores.password.length > 200))
    console.log("email valido: "+ emailVal)

    if(usernameVal == false || valores.password.length < 6 || valores.password.length > 200 || emailVal == false){
      setMensaje("Información del usuario no cumple los requisitos. El nombre del usuario debe ser alfanúmerico y tener entre 3 y 30 caracteres. La contraseña debe tener entre 6 y 200 caracteres. Asegúrate de que el email sea válido");
      setModal(true);
    }
    else{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      fetch("http://localhost:3000/api/usuarios/signup", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          username: valores.username,
          email: valores.email,
          bio: valores.bio,
          password: valores.password,
          nombre: valores.nombre
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          sessionStorage.setItem("tokenRegistro",json);
          setMensaje("Registro correcto! se redireccionará en 5 segundos");
          setModal(true);
          setTimeout(()=> {return navigate("/login")},5000)
        })
        .catch((error) => console.log(error));
    }
    
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <img src="/screenshot1.png"></img>
          </Col>
          <Col>
            <Card
              style={{
                width: "18rem",
              }}
            >
              <CardBody>
                <CardTitle tag="h5">Desafiogram</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Registrate para que veas el clon de instagram
                </CardSubtitle>
                <hr></hr>
                <form onSubmit={registrarse} ref={formRef}>
                  <Input placeholder="mail" name="email" />
                  <br></br>
                  <Input placeholder="name" name="nombre" />
                  <br></br>
                  <Input placeholder="username" name="username" />
                  <br></br>
                  <Input placeholder="descrption" name="bio" />
                  <br></br>
                  <Input
                    type="password"
                    placeholder="password"
                    name="password"
                  />
                  <br></br>
                  <Button color="primary" type="submit">
                    Signup
                  </Button>
                </form>
                <br></br>
                <br></br>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  ya tienes cuenta ? <a href="/login">Login</a>
                </CardSubtitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Mensaje</ModalHeader>
        <ModalBody>
          {mensaje}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            ok
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Registro;
