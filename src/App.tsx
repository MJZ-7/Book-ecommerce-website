import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
import { Home } from "./Pages/home"

import { createContext, useState } from "react"
import { Product } from "./types"
import { Dashboard } from "./Pages/dashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
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
    const filteredCart = state.cart.filter((item) => item.id !== id)

    setState({
      ...state,
      cart: filteredCart
    })
  }

  return (
    <div className="app">
      <GlobalContext.Provider value={{ state, handleAddToCart, handelDeleteFromCart}}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}
export default App
