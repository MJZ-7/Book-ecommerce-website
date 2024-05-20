import React from "react"
import { createBrowserRouter } from "react-router-dom"

import { Dashboard } from "@/Pages/dashboard"
import { Home } from "@/Pages/home"
import { ProductDetails } from "@/Pages/productDetails"
import { Login } from "@/Pages/login"
import { SignUp } from "@/Pages/signup"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "signup",
    element: <SignUp />
  }
])