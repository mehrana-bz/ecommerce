//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductsToStore,
  selectProducts,
} from "../../../store/states/products";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Product from "./Product/Product";
import PaginationPart from "./pagination/PaginationPart";

const Products = () => {
  // const [products , setProducts] = useState([]);

  //dispatch
  const dispatch = useDispatch();

  //useSelectors
  const products = useSelector(selectProducts);

  //useStates
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const limit = 20;

    const p1 = axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.data)
      .then((productsData) => {
        setPageCount(Math.ceil(productsData.length / limit));
      });

    const p2 = axios
      .get(`https://api.escuelajs.co/api/v1/products?offset=0&limit=${limit}`)
      .then((res) => res.data)
      .then((productsData) => {
        console.log(productsData);
        // setProducts(productsData);
        dispatch(addProductsToStore(productsData));
      });

    Promise.all([p1, p2]).finally(() => {
      setIsLoading(false);
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
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <PaginationPart pageCount={pageCount} />
        </>
      )}
      {!isLoading && products.length === 0 && <div>😥 No Result found!!!</div>}
    </>
  );
};

export default Products;
