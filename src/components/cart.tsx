import { GlobalContext } from "@/App"
import { useContext } from "react"


import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { ShoppingBagIcon } from "lucide-react"
import { Button } from "./ui/button"


export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handelDeleteFromCart  } = context
  return (
    <Popover>
      <PopoverTrigger asChild>
      <div className="flex gap-2">
        <ShoppingBagIcon className="cursor-pointer"/>
        <span>({state.cart.length})</span>
      </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          {state.cart.length === 0 && <p>No Items</p>}
          {state.cart.map((product) => {
            return (
              <div className="mb-3 flex items-center gap-4 " key={product.id}>
                <img src={product.img} alt={product.name} className="w-20 h-20 object-contain" />
                <h4>{product.name}</h4>
                <span>{product.price}</span>
                <Button variant={"destructive"} onClick={()=> handelDeleteFromCart(product.id)}>X</Button>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

