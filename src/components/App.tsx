import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import Layout from "./Layout/Layout";
import Homepage from "./Homepage/Homepage";
import Routes from "./Routes/Routes";

function App() {
  const router = createBrowserRouter([
    {
      path:Routes.Homepage,
      element: <Layout/>,
      children:[
        {
          index: true,
          element:<Homepage/>
        }
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
