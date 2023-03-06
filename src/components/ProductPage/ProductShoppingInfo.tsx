import { Badge } from "react-bootstrap";
import { Product as ProductType } from "../../store/states/products";
import styles from "./ProductPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import BookmarkBtn from "../BookmarkBtn/BookmarkBtn";
import ShoppingCartBtn from "../ShoppingCartBtn/ShoppingCartBtn";
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
        <div className="d-flex align-items-center gap-1">
          <BookmarkBtn productId={product.id} />
          <ShoppingCartBtn productId={product.id} />
        </div>
      </div>
    </>
  );
};
export default ProductShoppingInfo;
