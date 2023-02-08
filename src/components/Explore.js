import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { randomColor } from "randomcolor";
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
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

function Explore(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [usuarios, setUsuarios] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/usuarios")
      .then((response) => response.json())
      .then((json) => {
        const newUsers = json.map((user) => {
          return { ...user, color: randomColor() };
        });
        setUsuarios(newUsers);
      });
  }, []);

  useEffect(() => {
    const myHeaders = new Headers({
      Authorization: "bearer " + sessionStorage.getItem("tokenLogin"),
      "Content-Type": "application/x-www-form-urlencoded",
    });

    fetch("http://localhost:3000/api/posts/explore", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("respuesta de post:");
        console.log(json);
        setPost(json)
      });
  }, []);

  const boton = () => {
    console.log("boton");
  };

  return (
    <>
      <Navbar {...args}>
        <NavbarBrand href="/">Desafiogram</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/registro">Registro</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      <h6>Descubrir usuarios</h6>
      <div className="App">
        <Container>
          <Row>
            {usuarios.map((element) => (
              <Col key={element._id}>
                <br></br>

                <Card
                  style={{
                    width: "18rem",
                  }}
                >
                  <CardBody>
                    <div>
                      <div
                        className="estiloUser"
                        style={{ background: element.color }}
                      ></div>
                      <p>{element.username}</p>
                      <Button color="primary" onClick={() => boton()}>
                        Ver Perfil
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <h6>Explorar</h6>

      <div className="App">
        <Container>
          <Row>
            {post.map((element) => (
              <Col key={element._id}>
                <br></br>

                <Card
                  style={{
                    width: "18rem",
                  }}
                >
                {/*   <p>{element.url}</p> */}
                  <img alt="Sample" src={`${process.env.REACT_APP_API_URL}${element.url}`} /> 
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Explore;
