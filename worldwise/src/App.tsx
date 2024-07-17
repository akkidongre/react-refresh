import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";

const router = createBrowserRouter([
  { path: '/', element: <Homepage /> },
  { path: '/product', element: <Product /> },
  { path: '/pricing', element: <Pricing /> },
  { path: '/login', element: <Login /> },
  {
    path: '/app', element: <AppLayout />, children: [
      { index: true, element: <CityList /> },
      { path: 'cities', element: <CityList /> },
      { path: 'countries', element: <p>List of countries</p> },
      { path: 'form', element: <p>Form</p> }
    ]
  },
  { path: '*', element: <PageNotFound /> }
]);

export const API_URL = 'http://localhost:8000';

export default function App() {
  return <RouterProvider router={router} />
}