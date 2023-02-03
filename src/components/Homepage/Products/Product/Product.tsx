//@ts-nocheck
import { Button, Card, ListGroup } from "react-bootstrap";
import styles from "./Product.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DescriptionLengthControl from "./DescriptionLengthControl";

const Product = ({ product }) => {
  const markedStarsCount = Math.floor(Math.random() * 5);

  return (
    <Card className="h-100">
      <div className="ratio ratio-16x9">
        <Card.Img
          variant="top"
          src={product.category.image}
          className={styles.pics}
        />
      </div>
      <Card.Body className="d-flex flex-column bg-light">
        <Card.Title>{product.category.name}</Card.Title>
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
            color={markedStarsCount === 5 ? "yellow" : "gray"}
          />
        </div>
        <DescriptionLengthControl product={product} />
        <Card.Text className="small">{product.title}</Card.Text>
        <div className="d-flex justify-content-between mt-auto">
          <Card.Text className={styles.style}>{product.price}</Card.Text>
          <Button variant="primary" className="px-4">
            <FontAwesomeIcon icon={faPlus} />
            <FontAwesomeIcon icon={faCartShopping} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
