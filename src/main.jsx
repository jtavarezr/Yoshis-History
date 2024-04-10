import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import TestConnection from "./utils/TestConnection.jsx";
import ErrorPage from "./error-page.jsx";
import CreateCrewmate from "./routes/CreateCrewmate.jsx";
import Home from "./routes/Home.jsx";
import ReadPost from "./routes/ReadPost.jsx";
import UpdateCrewmate from "./routes/Update.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      { path: "/test", element: <TestConnection /> },
      { path: "/create", element: <CreateCrewmate /> },
      { path: "/", element: <ReadPost /> },
      { path: "/home", element: <ReadPost /> },
      { path: "/edit/:id", element: <UpdateCrewmate /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
