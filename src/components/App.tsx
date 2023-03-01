import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import Layout from "./Layout/Layout";
import Homepage from "./Homepage/Homepage";
import Routes from "../Routes/Routes";
import ProductPage from "./ProductPage/ProductPage";
import BookmarksPage from "./BookmarksPage/BookmarksPage";


const router = createBrowserRouter([
  {
    element: <Layout />,
    children:[
      {
        path: Routes.Homepage,
        element:<Homepage/>,
        children: [
          {
            path: Routes.Page,
          }
        ]

      },
      {
        path:Routes.Product,
        element: <ProductPage />
      },
      {
        path: Routes.Bookmarks,
        element: <BookmarksPage/>
      }
    ]
  }
])

function App() {
 
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
