//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductsToStore,
  selectProducts,
} from "../../../store/states/products";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Product from "./Product";



const Products = () => {
  const dispatch = useDispatch();
  // const [products , setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const products = useSelector(selectProducts);
  // const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.data)
      .then((productsData) => {
        setIsLoading(false);
        // setProducts(productsData);
        dispatch(addProductsToStore(productsData));
      });
  }, []);

  return (
    <>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isLoading && products.length !== 0 && (
        <Row>
          {products.map((product) => (
            <Col key={product.id}>
              <Product product={product} sm={3} className="mb-2" />
            </Col>
          ))}
        </Row>
      )}
      {!isLoading && products.length === 0 && (
        <div>😥 No Result found!!!</div>
      )}
    </>
  );
};

export default Products;
