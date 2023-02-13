//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./FilteredPrice.module.scss";
import { Button, Form } from "react-bootstrap";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generatePath, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Routes from "../../../../Routes/Routes";
import {
  getPageCount,
  getPaginatedProducts,
} from "../../../../store/states/products";
import { setMaxPrice, setMinPrice } from "../../../../store/states/productFilters";

const FilteredPrice = () => {
  const [defaultMinPrice, setDefaultMinPrice] = useState(0);
  const [defaultMaxPrice, setDefaultMaxPrice] = useState(0);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.data)
      .then((products) => {
        const mappedProducts = products.map((product) => product.price);
        setDefaultMinPrice(Math.min(...mappedProducts));
        setDefaultMaxPrice(Math.max(...mappedProducts));
      });
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePriceFilter = (e) => {
    e.preventDefault();
    navigate(generatePath(Routes.Homepage));
    dispatch(getPageCount());
    dispatch(getPaginatedProducts(1));
  };
  const handleMinPrice = ({ target: { value } }) => {
    dispatch(setMinPrice(value));
  };
  const handleMaxPrice = ({ target: { value } }) => {
    dispatch(setMaxPrice(value));
  };

  return (
    <Form onSubmit={handlePriceFilter}>
      <h4>Price</h4>
      <div className="d-flex align-items-center gap-2">
        <span>€</span>
        <Form.Control
          type="number"
          name="minPriceRange"
          min={defaultMinPrice}
          max={defaultMaxPrice}
          placeholder={defaultMinPrice}
          className="w-25"
          onChange={handleMinPrice}
        />
        <span>to</span>
        <Form.Control
          type="number"
          name="maxPriceRange"
          min={defaultMinPrice}
          max={defaultMaxPrice}
          placeholder={defaultMaxPrice}
          className="w-25"
          onChange={handleMaxPrice}
        />
        <Button type="submit">
          <FontAwesomeIcon icon={faGreaterThan} />
        </Button>
      </div>
    </Form>
  );
};
export default FilteredPrice;
