import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { selectShoppingCart } from "../../store/states/shoppingCart";
import { Product as ProductType } from "../../store/states/products";
import styles from "./ShoppingCart.module.scss";
import CartProduct from "./CartProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEuroSign } from "@fortawesome/free-solid-svg-icons";
import PayCard from "../icons/PayCard";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Routes from "../../Routes/Routes";

const ShoppingCart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const shoppingCartsState = useAppSelector(selectShoppingCart);

  const totalAmount = products.reduce((sum , product) => {
    const cartProduct = shoppingCartsState.find((cart) => cart.id === product.id);
    if(!cartProduct) return sum;
    
    return sum + (product.price * cartProduct.count);
  },0)



  useEffect(() => {
    setIsLoading(shoppingCartsState.length > 0);
    setProducts([]);
    shoppingCartsState.forEach(({ id: productId }) => {
      axios
        .get<ProductType>(
          `https://api.escuelajs.co/api/v1/products/${productId}`
        )
        .then((res) => res.data)
        .then((fetchedProduct) => {
          setProducts((currentProducts) => [
            ...currentProducts,
            fetchedProduct,
          ]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, [shoppingCartsState, shoppingCartsState.length]);

  return (
    <Container>
      <h2 className={styles.shoppingCartText}>SHOPPING CART</h2>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {!isLoading && products.length === 0 && (
        <div>
          <div className={classNames(styles.noCartText , "fw-bolder" , "fs-4" , "text-center")}>There's nothing in your shopping cart😟</div>
          <Link to={Routes.Homepage} className="d-flex justify-content-center text-decoration-none mt-3">
            <Button variant="success" className="px-4 py-2">Continue Shopping</Button>
          </Link>

        </div>
      )}

      {!isLoading && products.length !== 0 && (
        <>
          
          <Row className="flex-nowrap gap-4">
            <Col sm={9}>
              {products.map((product, index) => (
                <CartProduct product={product} key={index} />
              ))}
            </Col>
            <Col sm={3}>
              <span className="d-block fw-semibold fs-5 mb-4">Delivery and service</span>
              <div className="d-flex justify-content-between">
                <div className="fw-bold">Total amount</div>
                <div>
                  <FontAwesomeIcon icon={faEuroSign} className="me-1" />
                  {totalAmount.toLocaleString()}
                  </div>
              </div>
              <Button className="w-100 mt-3 btn-success d-flex align-items-center gap-2 justify-content-center">
                <PayCard/>
                  I am ready to order</Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ShoppingCart;
