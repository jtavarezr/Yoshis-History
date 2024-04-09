import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import TestConnection from "./utils/TestConnection.jsx";
import ErrorPage from "./error-page.jsx";
import CreateCrewmate from "./routes/CreateCrewmate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      { path: "test", element: <TestConnection /> },
      { path: "create", element: <CreateCrewmate /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
