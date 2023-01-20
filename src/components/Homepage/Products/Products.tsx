//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductsToStore,
  selectProducts,
} from "../../../store/states/products";
import { Col, Container, Row } from "react-bootstrap";
import Product from "./Product";

const Products = () => {
  const dispatch = useDispatch();
  // const [products , setProducts] = useState([]);

  const products = useSelector(selectProducts);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.data)
      .then((productsData) => {
        // setProducts(productsData);
        dispatch(addProductsToStore(productsData));
      });
  }, []);
  console.log(products);
  return (
      <Row>
        {products.map((product) => (
          <Col key={product.id}>
            <Product product={product} sm={3} className = "mb-2"/>
          </Col>
        ))}
      </Row>
  );
};

export default Products;
