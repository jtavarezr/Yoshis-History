import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import TestConnection from "./utils/TestConnection.jsx";
import ErrorPage from "./error-page.jsx";
import CreateCrewmate from "./routes/CreateCrewmate.jsx";
import Home from "./routes/Home.jsx";
import ReadPost from "./routes/ReadPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      { path: "test", element: <TestConnection /> },
      { path: "create", element: <CreateCrewmate /> },
      { path: "home", element: <ReadPost /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
