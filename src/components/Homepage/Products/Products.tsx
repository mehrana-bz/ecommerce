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
import PaginationPart from "./PaginationPart";

const Products = () => {
  // const [products , setProducts] = useState([]);

  //dispatch
  const dispatch = useDispatch();

  //useSelectors
  const products = useSelector(selectProducts);

  //useStates
  const [isLoading, setIsLoading] = useState(true);

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
        <>
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={4} className="my-3">
                <Product product={product} className=""/>
              </Col>
            ))}
          </Row>
          <PaginationPart />
        </>
      )}
      {!isLoading && products.length === 0 && <div>😥 No Result found!!!</div>}
    </>
  );
};

export default Products;
