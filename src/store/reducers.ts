
import isLoading from "./states/isLoading";
import pageCount from "./states/pageCount";
import products from "./states/products";
import productFilters from "./states/productFilters";
import bookmarks from "./states/bookmarks";
import shoppingCart from "./states/shoppingCart";


const reducers = {
  //stateName : Reducer Function
  products: products,
  productFilters: productFilters,
  isLoading: isLoading,
  pageCount: pageCount,
  bookmarks: bookmarks,
  shoppingCart: shoppingCart,
};

export default reducers;