import { Badge, Button, Card } from "react-bootstrap";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";

import DescriptionLengthControl from "./DescriptionLengthControl";
import styles from "./Product.module.scss";
import { Product as ProductType } from "../../../../store/states/products";
import { Link, generatePath } from "react-router-dom";
import Routes from "../../../../Routes/Routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rates from "../../../icons/Rates";

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  return (
    <Card className="h-100">
      <Link to={generatePath(Routes.Product, { id: product.id.toString() })}>
        <div className="ratio ratio-16x9">
          <Card.Img
            variant="top"
            src={product.images[0]}
            className={styles.pics}
          />
        </div>
      </Link>
      <Card.Body className="d-flex flex-column bg-light">
        <Card.Title>{product.title}</Card.Title>
        <Rates />
        <DescriptionLengthControl product={product} />
        <Card.Text className="mt-auto">
          <Badge bg="secondary">
            {product.category.name}
          </Badge>
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Text as="span">
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
