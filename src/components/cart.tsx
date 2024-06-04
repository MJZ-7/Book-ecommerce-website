import { GlobalContext } from "@/App"
import { useContext } from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { ShoppingBagIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Product } from "@/types"
import { OrderCheckout } from "../types"
import api from "@/api"
import { Link } from "react-router-dom"

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handelDeleteFromCart, handleAddToCart, handleRemoveCart } = context

  console.log(state.cart)
  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as { [productId: string]: Product[] })

  const total = state.cart.reduce((accumulator, current) => {
    return accumulator + current.price
  }, 0)

  const checkoutOrder: OrderCheckout = {
    addressId: "30a86a31-997a-4406-a162-160f985da1c6",
    items: []
  }

  Object.keys(groups).forEach((key) => {
    const products = groups[key]

    checkoutOrder.items.push({
      quantity: products.length,
      productId: key
    })
  })

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("/orders/checkout", checkoutOrder, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.status === 201) {
        handleRemoveCart()
      }
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b">
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="rounded-full relative" size="icon" variant="outline">
                  <ShoppingBagIcon className="w-5 h-5" />
                  <span className="sr-only">Cart</span>
                  <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {state.cart.length}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-480 bg-white">
                <div className="flex flex-col gap-4 p-4">
                  {state.cart.length === 0 && <p className="text-center">No Items</p>}

                  {Object.keys(groups).map((key) => {
                    const products = groups[key]
                    const product = products[0]
                    const total = products.reduce((accumulator, current) => {
                      return accumulator + current.price
                    }, 0)

                    return (
                      <div className="flex items-center gap-4" key={product.id}>
                        <img
                          src={product.img}
                          alt={product.bookName}
                          className="rounded-md h-20 w-20 object-contain"
                          style={{
                            aspectRatio: "80/80",
                            objectFit: "cover"
                          }}
                        />

                        <h6>{product.bookName}</h6>
                        <span>{product.price}</span>
                        <Button variant="outline" onClick={() => handleAddToCart(product)}>
                          +
                        </Button>
                        <span>{products.length}</span>
                        <Button variant="outline" onClick={() => handelDeleteFromCart(product.id)}>
                          -
                        </Button>
                      </div>
                    )
                  })}

                  <p className="text-center">Total: {total}</p>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1">
                      <Link to={`/`}> Continue Shopping</Link>
                    </Button>
                    {/* <Button onClick={handleCheckout} className="w-full">
                      Checkout
                    </Button> */}
                    <Button className="flex-1">
                      <Link to={`/checkout`}>Proceed to Checkout</Link>
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
      </div>
    </>
  )
}
