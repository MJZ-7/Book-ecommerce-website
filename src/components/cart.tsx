import { GlobalContext } from "@/App"
import { useContext } from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { ShoppingBagIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Product } from "@/types"
import { OrderCheckout } from "../types"
import api from "@/api"

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

  console.log("checkoutOrder:", checkoutOrder)

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
      <div className="flex flex-col ">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b">
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <ShoppingBagIcon className="h-6 w-6" />
                  <span className="sr-only">Cart</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-480">
                <div className="flex flex-col gap-4 p-4">
                  {state.cart.length === 0 && <p>No Items</p>}
                  {Object.keys(groups).map((key) => {
                    const products = groups[key]
                    const product = products[0]
                    const total = products.reduce((accumulator, current) => {
                      return accumulator + current.price
                    }, 0)

                    return (
                      <div className="mb-3 flex items-center gap-4 " key={product.id}>
                        <img
                          src={product.img}
                          alt={product.bookName}
                          className="rounded-md h-20 w-20 object-contain "
                          style={{
                            aspectRatio: "80/80",
                            objectFit: "cover"
                          }}
                        />

                        <h6>{product.bookName}</h6>
                        <span>{total}</span>
                        <Button variant={"outline"} onClick={() => handleAddToCart(product)}>
                          +
                        </Button>
                        <span> {products.length}</span>
                        <Button
                          variant={"outline"}
                          onClick={() => handelDeleteFromCart(product.id)}
                        >
                          -
                        </Button>
                      </div>
                    )
                  })}

                  <p>Total :{total} </p>
                  <Button onClick={handleCheckout}>Checkout</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
      </div>
    </>
  )
}
