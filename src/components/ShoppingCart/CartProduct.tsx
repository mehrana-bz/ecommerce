import { Button, Col, InputGroup, Row, Form } from "react-bootstrap";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";

import styles from "./ShoppingCart.module.scss";
import { Product } from "../../store/states/products";
import BookmarkBtn from "../BookmarkBtn/BookmarkBtn";
import { Link, generatePath } from "react-router-dom";
import Routes from "../../Routes/Routes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addProductToCart, decrementProductInCart, removeProductFromCart, selectShoppingCart } from "../../store/states/shoppingCart";

interface CartProductProps {
  product: Product;
}

const CartProduct = ({ product }: CartProductProps) => {
const dispatch = useAppDispatch();

  const link = generatePath(Routes.Product, { id: product.id.toString() });
  const shoppingCartsState = useAppSelector(selectShoppingCart);

  const cartProduct = shoppingCartsState.find(
    (cartProduct) => cartProduct.id === product.id
  );
  if (!cartProduct) {
    return null;
  }

  const { count } = cartProduct;

  const handleIncrementProduct = () => {
    dispatch(addProductToCart(product.id))
  };
  const handleDecrementProduct = () => {
    dispatch(decrementProductInCart(product.id));
  };
  const handleRemoveProduct = () => {
    dispatch(removeProductFromCart(product.id))
  };

  return (
    <div>
      <Row>
        <Col sm={4}>
          <Link className="d-block ratio ratio-16x9 mb-2 mt-2" to={link}>
            <img
              src={product.images[0]}
              className={styles.pics}
              alt={product.title}
            />
          </Link>
        </Col>
        <Col sm={8}>
          <Link
            className="d-block fs-6 text-primary fs-5 fw-semibold mt-2 text-decoration-none mb-3"
            to={link}
          >
            {product.title}
          </Link>
          <div className="d-flex justify-content-between">
            <div className="d-flex  align-items-center gap-2">
              <Button variant="link" className={styles.fs} onClick={handleRemoveProduct}>
                Remove
              </Button>
              <InputGroup className="">
                <Button variant="outline-secondary fw-bolder" onClick={handleDecrementProduct}  >-</Button>
                <Form.Control
                  type="text"
                  readOnly
                  className={classNames(
                    "text-center",
                    "cursor-default",
                    styles.productCount
                  )}
                  value={count}
                />
                <Button
                  variant="outline-secondary fw-bolder"
                  onClick={handleIncrementProduct}
                >
                  +
                </Button>
              </InputGroup>
              <BookmarkBtn productId={product.id} />
            </div>
            <div>
              <FontAwesomeIcon icon={faEuroSign} className="me-1" />
              {product.price.toLocaleString()}
            </div>
          </div>
        </Col>
      </Row>
      <hr className="m-0" />
    </div>
  );
};
export default CartProduct;
