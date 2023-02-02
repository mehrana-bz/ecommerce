//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./FilteredPrice.module.scss"
const FilteredPrice = () => {
  const [categoryItems, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(" https://api.escuelajs.co/api/v1/categories")
      .then((res) => res.data)
      .then((categories) => {
        setCategories(
          categories.map((category) => ({
            name: category.name,
            id: category.id,
            image: category.image,
          }))
        );
      });
  }, []);

  return (
    <div>
      <ul className={styles.listStyle}>
        <h5>CATEGORY</h5>
        {categoryItems.map((category) => (
          <li>
            <input className="form-check-input mx-2" type="checkbox" value="" id={category.id}/>
            <label className="form-check-label" for={category.id}>
              {category.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredPrice;