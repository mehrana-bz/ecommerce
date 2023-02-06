//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Filteredcategory.module.scss";
const Filteredcategory = () => {
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

  const handleCategoryChange = ({target: {value}}) =>{
    
  }

  return (
    <div>
      <h5>CATEGORY</h5>
      <ul className={styles.listStyle}>
        {categoryItems.map((category) => (
          <li key={category.id}>
            <input
              className="form-check-input mx-2"
              type="radio"
              name="flexRadioDefault"
              value={category.id}
              id={category.id}
              onChange={handleCategoryChange}
            />
            <label className="form-check-label" htmlFor={category.id}>
              {category.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filteredcategory;
