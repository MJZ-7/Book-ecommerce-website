import { GlobalContext } from "@/App"
import { useContext } from "react"


import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { ShoppingBagIcon } from "lucide-react"
import { Button } from "./ui/button"


export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handelDeleteFromCart, handleAddToCart  } = context
console.log(state.cart)
  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id;
    const curGroup = acc[key] ?? [];
    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
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
          {Object.keys(groups).map((key) => {
            const products = groups[key]
            const product = products[0]
            return (
              <div className="mb-3 flex items-center gap-4 " key={product.id}>
                <img src={product.img} alt={product.name} className="w-20 h-20 object-contain" />
                <h4>{product.name}</h4>
                <span>{product.price}</span>
                <Button variant={"outline"} onClick={()=> handleAddToCart(product)}>+</Button>
                <span> {products.length}</span>
                <Button variant={"outline"} onClick={()=> handelDeleteFromCart(product.id)}>-</Button>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

