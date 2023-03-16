import { Container, Row, Col } from "react-bootstrap";

import Aside from "./Aside/Aside";
import Products from "./Products/Products";

const Homepage = () => {
  return (
    <div className="Homepage">
      <Container>
        <Row className="mt-5">
          <Col xs={false} lg={3}>
            <Aside />
          </Col>
          <Col lg={9}>
            <Products />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Homepage;
