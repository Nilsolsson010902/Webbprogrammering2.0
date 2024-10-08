import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Confirmation from "./Confirmation"; 
import inventoryLoader from "./inventoryLoader";
const router = createBrowserRouter([
  {
    path: '/', 
    Component: App,
    children: [
      {
        path: 'compose-salad',
        loader: inventoryLoader,
        Component: ComposeSalad,
      },
      {
        path: 'view-order',
        Component: ViewOrder,
        children: [
          {
            path: 'confirm/:uuid',
            Component: Confirmation,
          },
        ],
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
