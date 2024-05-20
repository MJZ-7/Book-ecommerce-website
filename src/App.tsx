import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
import { Home } from "./Pages/home"

import { createContext, useState } from "react"
import { Product } from "./types"
import { Dashboard } from "./Pages/dashboard"
import {ProductDetails} from "./Pages/productDetails"
import { Login } from "./Pages/login"
import { SignUp } from "./Pages/signup"


const router = createBrowserRouter([
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
    element: <Login/>
  },
  {
    path: "signup",
    element: <SignUp />
  }
])
type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handelDeleteFromCart: (id: string) => void
}
type GlobalState = {
  cart: Product[]
}


export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })

  const handleAddToCart = (product: Product) => {
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  const handelDeleteFromCart = (id: string) => {
    const productIndex = state.cart.findIndex(item => item.id === id)
    const updatedCart = state.cart
    updatedCart.splice(productIndex, 1)


    setState({
      ...state,
      cart: updatedCart
    })
  } 

  return (
    <div className="app">
      <GlobalContext.Provider value={{ state, handleAddToCart, handelDeleteFromCart }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}
export default App
