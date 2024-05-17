import React from "react"
import { createBrowserRouter } from "react-router-dom"

import { Dashboard } from "@/Pages/dashboard"
import { Home } from "@/Pages/home"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])