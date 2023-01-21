//@ts-nocheck
import { Card, ListGroup } from "react-bootstrap";
import styles from "./Product.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Product = ({ product }) => {
  const markedStarsCount = Math.floor(Math.random() * 5);
  console.log(product);

  return (
    <Card className="h-100">
      <div className="ratio ratio-16x9">
        <Card.Img variant="top" src={product.images} className={styles.pics}/>
      </div>
      <Card.Body className="flex-grow-0">
        <Card.Title>{product.title}</Card.Title>
        <div className="rates">
          <FontAwesomeIcon
            icon={faStar}
            color={markedStarsCount >= 1 ? "yellow" : "gray"}
          />
          <FontAwesomeIcon
            icon={faStar}
            color={markedStarsCount >= 2 ? "yellow" : "gray"}
          />
          <FontAwesomeIcon
            icon={faStar}
            color={markedStarsCount >= 3 ? "yellow" : "gray"}
          />
          <FontAwesomeIcon
            icon={faStar}
            color={markedStarsCount >= 4 ? "yellow" : "gray"}
          />
          <FontAwesomeIcon
            icon={faStar}
            color={markedStarsCount == 5 ? "yellow" : "gray"}
          />
        </div>
        <Card.Text className={styles.cardDescription}>{product.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush mt-auto">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body className="flex-grow-0">
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
