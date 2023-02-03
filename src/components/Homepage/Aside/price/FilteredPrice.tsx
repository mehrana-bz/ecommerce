//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./FilteredPrice.module.scss";

const FilteredPrice = () => {
  const [filterPrice, setFilterPrice] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.escuelajs.co/api/v1/products/?price_min=0&price_max=1000"
      )
      .then((res) => res.data)
      .then((productsPrice) => {
        setFilterPrice(
          productsPrice.map((productPrice) => console.log(productPrice))
        );
      });
  }, []);

  return (
    <>
      <h4>Price</h4>
      
    </>
  );
};
export default FilteredPrice;
