import classNames from "classnames";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./TwoBoxLayout.module.scss";
import { ReactNode } from "react";

interface TwoBoxLayoutProps {
  leftChild: ReactNode;
  rightChild?: ReactNode;
}

const TwoBoxLayout = ({ leftChild, rightChild }: TwoBoxLayoutProps) => {
  return (
    <Container className={classNames("mb-4", styles.marginTopForForm)}>
      <Row className={styles.responsiveRow}>
        <Col md={6}>
          <div>
            <div className="mx-auto px-4 py-4 rounded bg-white shadow">
              {leftChild}
            </div>
          </div>
        </Col>
        <Col md={6} className="d-none d-md-flex align-items-md-center">
          <div className="text-white w-50">{rightChild}</div>
          <div
            className={classNames(styles.blackLayerStyle, "rounded-md")}
          ></div>
        </Col>
        <Col className="d-block d-md-none mt-3">{rightChild}</Col>
      </Row>
    </Container>
  );
};
export default TwoBoxLayout;
