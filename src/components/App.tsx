import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import Layout from "./Layout/Layout";
import Homepage from "./Homepage/Homepage";
import Routes from "../Routes/Routes";


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

function App() {
 
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
