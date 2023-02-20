import { Badge, Button } from "react-bootstrap";
import { Product as ProductType } from "../../store/states/products";
import styles from "./ProductPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faEuroSign, faPlus } from "@fortawesome/free-solid-svg-icons";
interface ProductProps {
  product: ProductType;
}

const ProductShoppingInfo = ({ product }: ProductProps) => {
  return (
    <>
      <div className={styles.description}>{product.description}</div>
      <div className="mt-2">
        <Badge bg="secondary">{product.category.name}</Badge>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-5">
        <span>
          <FontAwesomeIcon icon={faEuroSign} className="me-1" />
          {product.price}
        </span>
        <Button variant="primary" className="px-4">
          <FontAwesomeIcon icon={faPlus} />
          <FontAwesomeIcon icon={faCartShopping} />
        </Button>
      </div>
    </>
  );
};
export default ProductShoppingInfo;
