import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter([
  { path: '/', element: <Homepage /> },
  { path: '/product', element: <Product />},
  { path: '/pricing', element: <Pricing />},
  { path: '/login', element: <Login />},
  { path: '*', element: <PageNotFound /> }
]);

export default function App() {
  return <RouterProvider router={router} />
}