import CategoriesFilter from "./category/CategoriesFilter";
import FilteredPrice from "./price/FilteredPrice";

const Aside = () => {
  return (
    <aside>
      <CategoriesFilter />
      <FilteredPrice />
    </aside>
  );
};

export default Aside;
