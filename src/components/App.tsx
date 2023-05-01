import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import Layout from "./Layout/Layout";
import Homepage from "./Homepage/Homepage";
import Routes from "../Routes/Routes";
import ProductPage from "./ProductPage/ProductPage";
import BookmarksPage from "./BookmarksPage/BookmarksPage";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import RouterError from "./RouterError/RouterError";
import Register from "./Register/Register";
import Login from "./Login/Login";

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      errorElement: <RouterError />,
      children: [
        {
          path: Routes.Homepage,
          element: <Homepage />,
          children: [
            {
              path: Routes.Page,
            },
          ],
        },
        {
          path: Routes.Product,
          element: <ProductPage />,
        },
        {
          path: Routes.Bookmarks,
          element: <BookmarksPage />,
        },
        {
          path: Routes.ShoppingCart,
          element: <ShoppingCart />,
        },
        {
          path: Routes.Register,
          element: <Register />
        },
        {
          path: Routes.Login,
          element: <Login />
        },
      ],
    },
  ],
  {
    basename: process.env.NODE_ENV === "production" ? "/ecommerce" : "/",
  }
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
