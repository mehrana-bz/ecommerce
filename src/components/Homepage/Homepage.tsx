import { Container, Row, Col } from "react-bootstrap";

import Aside from "./Aside/Aside";
import Products from "./Products/Products";

import classNames from "classnames";
import styles from "./Homepage.module.scss";

const Homepage = () => {
  return (
    <div className={classNames("Homepage", styles.margin)}>
      <Container>
        <Row>
          <Col xs={false} lg={3}>
            <div className="bg-light h-100 p-3">
              <Aside />
            </div>
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
