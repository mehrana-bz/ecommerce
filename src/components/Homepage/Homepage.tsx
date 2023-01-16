import { Container, Row, Col } from "react-bootstrap";
import Aside from "./Aside/Aside";
import Products from "./Products/Products";



const Homepage = () => {
  return (
    <div className="Homepage">
      <Container>
        <Row>
          <Col sm={3}>
            <Aside />
          </Col>
          <Col sm={9}>
            <Products />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Homepage;
