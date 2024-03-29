import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { selectShoppingCart } from "../../store/states/shoppingCart";
import { Product as ProductType } from "../../store/states/products";
import styles from "./ShoppingCart.module.scss";
import CartProduct from "./CartProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import PayCard from "../icons/PayCard";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Routes from "../../Routes/Routes";
import PageHeader from "../PageHeaders/PageHeader";

const ShoppingCart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const shoppingCartsState = useAppSelector(selectShoppingCart);

  const totalAmount = products.reduce((sum, product) => {
    const cartProduct = shoppingCartsState.find(
      (cart) => cart.id === product.id
    );
    if (!cartProduct) return sum;

    return sum + product.price * cartProduct.count;
  }, 0);

  useEffect(() => {
    setIsLoading(shoppingCartsState.length > 0);
    setProducts([]);
    const cartProductsLength = shoppingCartsState.length;
    let successfulRequests = 0;
    shoppingCartsState.forEach(({ id: productId }) => {
      axios
        .get<ProductType>(
          `https://api.escuelajs.co/api/v1/products/${productId}`
        )
        .then((res) => res.data)
        .then((fetchedProduct) => {
          setProducts((currentProducts) =>
            [...currentProducts, fetchedProduct].sort((a, b) =>
              a.id < b.id ? 1 : -1
            )
          );
          successfulRequests++;
        })
        .finally(() => {
          if (cartProductsLength === successfulRequests) {
            setIsLoading(false);
          }
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingCartsState.length]);

  return (
    <Container className={styles.margin}>
      <PageHeader>SHOPPING CART</PageHeader>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {!isLoading && products.length === 0 && (
        <div className="d-flex flex-column align-items-center gap-4">
          <div
            className={classNames(
              styles.noCartText,
              "fw-bolder",
              "fs-4",
              "text-center"
            )}
          >
            There's nothing in your shopping cart😟
          </div>
          <Link
            to={Routes.Homepage}
            className="btn btn-success text-decoration-none px-4 py-2"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {!isLoading && products.length !== 0 && (
        <>
          <Row className="flex-nowrap g-5">
            <Col sm={9}>
              {products.map((product, index) => (
                <CartProduct product={product} key={index} />
              ))}
            </Col>
            <Col sm={3}>
              <span className="d-block fw-semibold fs-5 mb-4">
                Delivery and service
              </span>
              <div className="d-flex justify-content-between">
                <div className="fw-bold">Total amount</div>
                <div>
                  <FontAwesomeIcon icon={faEuroSign} className="me-1" />
                  {totalAmount.toLocaleString()}
                </div>
              </div>
              <Button className="w-100 mt-3 btn-success d-flex align-items-center gap-2 justify-content-center">
                <PayCard />I am ready to order
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ShoppingCart;
