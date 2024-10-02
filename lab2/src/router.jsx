import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Confirmation from "./Confirmation"; // We'll create this component next

const router = createBrowserRouter([
  {
    path: '/', // It's good practice to define the root path
    element: <App />, // Changed from Component to element for consistency
    children: [
      {
        path: 'compose-salad',
        element: <ComposeSalad />,
      },
      {
        path: 'view-order',
        element: <ViewOrder />,
        children: [
          {
            path: 'confirm/:uuid',
            element: <Confirmation />,
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
