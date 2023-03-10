import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generatePath, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";

import Routes from "../../../../Routes/Routes";
import {
  ProductsState,
  getPageCount,
  getPaginatedProducts,
} from "../../../../store/states/products";
import {
  setMaxPrice,
  setMinPrice,
} from "../../../../store/states/productFilters";

const FilteredPrice = () => {
  const [defaultMinPrice, setDefaultMinPrice] = useState<number>(0);
  const [defaultMaxPrice, setDefaultMaxPrice] = useState<number>(0);

  useEffect(() => {
    axios
      .get<ProductsState>("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.data)
      .then((products) => {
        const productsPrice = products.map((product) => product.price);
        setDefaultMinPrice(Math.min(...productsPrice));
        setDefaultMaxPrice(Math.max(...productsPrice));
      });
  }, []);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePriceFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(generatePath(Routes.Homepage));
    dispatch(getPageCount());
    dispatch(getPaginatedProducts(1));
  };
  const handleMinPrice = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMinPrice(value ? parseInt(value) : undefined));
  };
  const handleMaxPrice = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMaxPrice(value ? parseInt(value) : undefined));
  };

  return (
    <Form onSubmit={handlePriceFilter}>
      <h4>Price</h4>
      <div className="d-flex align-items-center gap-2">
        <InputGroup className="flex-nowrap">
          <InputGroup.Text>€</InputGroup.Text>
          <Form.Control
            type="number"
            name="minPriceRange"
            min={defaultMinPrice}
            max={defaultMaxPrice}
            placeholder={defaultMinPrice.toLocaleString()}
            className="w-100"
            onChange={handleMinPrice}
          />
        </InputGroup>

        <span>to</span>
        <InputGroup className="flex-nowrap">
          <InputGroup.Text>€</InputGroup.Text>
          <Form.Control
            type="number"
            name="maxPriceRange"
            min={defaultMinPrice}
            max={defaultMaxPrice}
            placeholder={defaultMaxPrice.toLocaleString()}
            className="w-100"
            onChange={handleMaxPrice}
          />
        </InputGroup>
      </div>
      <Button type="submit" className="mt-2">
        Filter by price
        <FontAwesomeIcon icon={faGreaterThan} className="ms-2" />
      </Button>
    </Form>
  );
};
export default FilteredPrice;
