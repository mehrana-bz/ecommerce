import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import DescriptionLengthControl from "./DescriptionLengthControl";
import styles from "./Product.module.scss";
import { Product as ProductType } from "../../../../store/states/products";

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  const markedStarsCount = Math.floor(Math.random() * 5);

  return (
    <Card className="h-100">
      <div className="ratio ratio-16x9">
        <Card.Img
          variant="top"
          src={product.images[0]}
          className={styles.pics}
        />
      </div>
      <Card.Body className="d-flex flex-column bg-light">
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
            color={markedStarsCount === 5 ? "yellow" : "gray"}
          />
        </div>
        <DescriptionLengthControl product={product} />
        <Card.Text className="small mt-auto">{product.category.name}</Card.Text>
        <div className="d-flex justify-content-between">
          <Card.Text className={styles.style}>
            <FontAwesomeIcon icon={faEuroSign} className="me-1" />
            {product.price}
          </Card.Text>
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
