import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Main1 } from "./Page/main1/main1";
import { Main2 } from "./Page/main2/main2";
import { Main3 } from "./Page/main3/main3";
import { Main4 } from "./Page/main4/main4";

const rootEl = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/main1",
        element: <Main1 />,
      },
      {
        path: "/main2",
        element: <Main2 />,
      },
      {
        path: "/main3",
        element: <Main3 />,
      },
      {
        path: "main4",
        element: <Main4 />,
      },
    ],
  },
]);

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
