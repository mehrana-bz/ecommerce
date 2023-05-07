const Routes = {
  Homepage: "/",
  Page: "/page/:number",
  Product: "/product/:id",
  Bookmarks: "/bookmarks",
  ShoppingCart: "/cart",
  Register: "register",
  Login: "login",
} as const;

export default Routes;
