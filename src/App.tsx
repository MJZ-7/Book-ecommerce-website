import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
import { Home } from "./Pages/home"

import { createContext, useEffect, useState } from "react"
import { DecodedUser, Product } from "./types"
import { Dashboard } from "./Pages/dashboard"
import { ProductDetails } from "./Pages/productDetails"
import { Login } from "./Pages/login"
import { SignUp } from "./Pages/signup"
import { PrivateRoute } from "./components/PrivateRoute"
import { ContactUs } from "./Pages/contactus"
import UserManage from "./Pages/usersmanage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
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
  },
  {
    path: "/contactus",
    element: <ContactUs />
  },
  {
    path: "/usersmanage",
    element: (
      <PrivateRoute>
        <UserManage />
      </PrivateRoute>
    )
  }
])
type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handelDeleteFromCart: (id: string) => void
  handelStoreUser: (user: DecodedUser) => void
  handelRemoveUser: () => void
  handleRemoveCart: () => void
}
type GlobalState = {
  cart: Product[]
  user: DecodedUser | null
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null
  })

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const decodedUser = JSON.parse(user)
      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])
  const handleAddToCart = (product: Product) => {
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  const handelDeleteFromCart = (id: string) => {
    const productIndex = state.cart.findIndex((item) => item.id === id)
    const updatedCart = state.cart
    updatedCart.splice(productIndex, 1)
    setState({
      ...state,
      cart: updatedCart
    })
  }
  const handelStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }
  const handelRemoveUser = () => {
    setState({
      ...state,
      user: null
    })
  }
  const handleRemoveCart = () => {
    setState({
      ...state,
      cart: []
    })
  }

  return (
    <div className="app">
      <GlobalContext.Provider
        value={{
          state,
          handleAddToCart,
          handelDeleteFromCart,
          handelStoreUser,
          handelRemoveUser,
          handleRemoveCart
        }}
      >
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}
export default App
