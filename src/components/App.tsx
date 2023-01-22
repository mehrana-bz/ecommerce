//@ts-nocheck
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import Layout from "./Layout/Layout";
import Homepage from "./Homepage/Homepage";
import Routes from "../Routes/Routes";
import Product from "./Homepage/Products/Product/Product";

function App() {
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
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
