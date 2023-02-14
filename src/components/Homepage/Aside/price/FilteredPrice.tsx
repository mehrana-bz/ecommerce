import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
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

  const handlePriceFilter = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(generatePath(Routes.Homepage));
    dispatch(getPageCount());
    dispatch(getPaginatedProducts(1));
  };
  const handleMinPrice = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMinPrice(parseInt(value)));
  };
  const handleMaxPrice = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMaxPrice(parseInt(value)));
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
          placeholder={defaultMinPrice.toString()}
          className="w-25"
          onChange={handleMinPrice}
        />
        <span>to</span>
        <Form.Control
          type="number"
          name="maxPriceRange"
          min={defaultMinPrice}
          max={defaultMaxPrice}
          placeholder={defaultMaxPrice.toString()}
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
