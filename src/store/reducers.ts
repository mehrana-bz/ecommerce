
import isLoading from "./states/isLoading";
import pageCount from "./states/pageCount";
import products from "./states/products";
import productFilters from "./states/productFilters";

export default {
  //stateName : Reducer Function
  products: products,
  productFilters: productFilters,
  isLoading: isLoading,
  pageCount: pageCount,
};
