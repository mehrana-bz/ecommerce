
import isLoading from "./states/isLoading";
import pageCount from "./states/pageCount";
import products from "./states/products";
import productFilters from "./states/productFilters";
import bookmarks from "./states/bookmarks";
import shoppingCart from "./states/shoppingCart";
import authentication from "./states/authentication";


const reducers = {
  //stateName : Reducer Function
  products,
  productFilters,
  isLoading,
  pageCount,
  bookmarks,
  shoppingCart,
  authentication,
};

export default reducers;
