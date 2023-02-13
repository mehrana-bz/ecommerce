//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./CategoriesFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategoryId,
  setCategoryId,
} from "../../../../store/states/productFilters";
import {
  getPageCount,
  getPaginatedProducts,
} from "../../../../store/states/products";
import { generatePath, useNavigate } from "react-router-dom";
import Routes from "../../../../Routes/Routes";

const CategoriesFilter = () => {
  const [categoryItems, setCategories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryId = useSelector(selectCategoryId);

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

  const handleCategoryChange = ({ target: { value } }) => {
    navigate(generatePath(Routes.Homepage));
    dispatch(setCategoryId(!value ? value : parseInt(value)));
    dispatch(getPageCount());
    dispatch(getPaginatedProducts(1));
  };

  return (
    <div>
      <h5>CATEGORY</h5>
      <ul className={styles.listStyle}>
        <li>
          <input
            className="form-check-input mx-2"
            type="radio"
            name="category"
            value={undefined}
            id="all"
            onChange={handleCategoryChange}
            checked={!categoryId}
          />
          <label className="form-check-label" htmlFor="all">
            All
          </label>
        </li>
        {categoryItems.map((category) => (
          <li key={category.id}>
            <input
              className="form-check-input mx-2"
              type="radio"
              name="category"
              value={category.id}
              id={category.id}
              onChange={handleCategoryChange}
              checked={categoryId === category.id}
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

export default CategoriesFilter;
