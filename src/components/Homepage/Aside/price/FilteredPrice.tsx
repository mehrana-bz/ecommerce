//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./FilteredPrice.module.scss";
import { Button, Form } from "react-bootstrap";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FilteredPrice = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.data)
      .then((products) => {
        const mappedProducts = products.map((product) => product.price);
        setMinPrice(Math.min(...mappedProducts));
        setMaxPrice(Math.max(...mappedProducts));
      });
  }, []);

  const handlePriceFilter = (e) => {
    e.preventDefault();
    
    
  };
  const handleMinPrice = ({target: {value}}) => {
    dispatchEvent(setMinPrice(value));
  }
  const handleMaxPrice = ({target: {value}}) => {
    dispatchEvent(setMaxPrice(value));
  }

  return (
    <Form onSubmit={handlePriceFilter}>
      <h4>Price</h4>
      <div className="d-flex align-items-center gap-2">
        <span>€</span>
        <Form.Control
          type="number"
          name="minPriceRange"
          min={minPrice}
          max={maxPrice}
          placeholder={minPrice}
          className="w-25"
          onChange={handleMinPrice}
        />
        <span>to</span>
        <Form.Control
          type="number"
          name="maxPriceRange"
          min={minPrice}
          max={maxPrice}
          placeholder={maxPrice}
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
