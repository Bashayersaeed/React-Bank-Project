import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Transactions from "./Components/Transactions";
import Users from "./Components/Users";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/Register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/Profile",
    element: (
      <div>
        <Nav />
        <Profile />
      </div>
    ),
  },
  {
    path: "/Home",
    element: (
      <div>
        <Nav />
        <Home />
      </div>
    ),
  },
  {
    path: "/Transactions",
    element: (
      <div>
        <Nav />
        <Transactions />
      </div>
    ),
  },
  {
    path: "/Users",
    element: (
      <div>
        <Nav />
        <Users />
      </div>
    ),
  },
]);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
