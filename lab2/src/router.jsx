import { Component } from "react";
import { createBrowserRouter, Route } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: 'compose-salad',
        Component: ComposeSalad,
      },
      {
        path: 'view-order',
        Component: ViewOrder,
      },
      {
        index: true,
        element: <p>Welcome to My Own Salad Bar</p>,
      },
      {
        path: '*',
        element: <p>Page not found</p>,
    }
    ],
  },

  
]);
export default router;