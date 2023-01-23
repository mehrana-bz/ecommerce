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
import { useParams } from "react-router-dom";

const limit = 20;

const Products = () => {
  // const [products , setProducts] = useState([]);

  //dispatch
  const dispatch = useDispatch();

  //useSelectors
  const products = useSelector(selectProducts);

  //useStates
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  //get routes parts in url with useParams
  const { number: pageNumber = 1 } = useParams();
  const currentPage = parseInt(pageNumber);

  useEffect(() => {
    const p1 = axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.data)
      .then((productsData) => {
        setPageCount(Math.ceil(productsData.length / limit));
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const p2 = axios
      .get(
        `https://api.escuelajs.co/api/v1/products?offset=${
          (currentPage - 1) * limit
        }&limit=${limit}`
      )
      .then((res) => res.data)
      .then((productsData) => {
        // setProducts(productsData);
        dispatch(addProductsToStore(productsData));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage]);

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
          <PaginationPart pageCount={pageCount} currentPage={currentPage} />
        </>
      )}
      {!isLoading && products.length === 0 && <div>😥 No Result found!!!</div>}
    </>
  );
};

export default Products;
