import { Badge, Button } from "react-bootstrap";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Product as ProductType } from "../../store/states/products";
import styles from "./ProductPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faEuroSign,
  faPlus,
  faHeart as faSolidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectBookmarks, toggleBookmark } from "../../store/states/bookmarks";
interface ProductProps {
  product: ProductType;
}

const ProductShoppingInfo = ({ product }: ProductProps) => {
  const dispatch = useAppDispatch();

  const handleToggleBookmark = () => {
    dispatch(toggleBookmark(product.id));
  };

  const bookmarksState = useAppSelector(selectBookmarks);

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
          <Button variant="outline-danger" onClick={handleToggleBookmark}>
            <FontAwesomeIcon
              icon={
                bookmarksState.includes(product.id) ? faSolidHeart : faHeart
              }
            />
          </Button>
          <Button variant="primary" className="px-4">
            <FontAwesomeIcon icon={faPlus} />
            <FontAwesomeIcon icon={faCartShopping} />
          </Button>
        </div>
      </div>
    </>
  );
};
export default ProductShoppingInfo;
