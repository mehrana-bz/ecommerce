import CategoriesFilter from "./category/CategoriesFilter";
import FilteredPrice from "./price/FilteredPrice";
import styles from "./Aside.module.scss";

const Aside = () => {
  return (
    <aside className="sticky-top" id={styles.Aside}>
      <CategoriesFilter />
      <FilteredPrice />
    </aside>
  );
};

export default Aside;
