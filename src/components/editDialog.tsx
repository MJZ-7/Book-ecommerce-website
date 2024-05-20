import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog"
import { Product } from "@/types"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ChangeEvent, useState } from "react"
import api from "@/api"
import { QueryClient } from "@tanstack/react-query"

export function EditDialog({ product }: { product: Product }) {
  const queryClient = new QueryClient()
  const [updatedProduct, setUpdatedProduct] = useState(product)
console.log(updatedProduct)
  const updateProduct = async () => {
    try {
      const res = await api.patch(`/products/${updatedProduct.id}`, updatedProduct)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name,value } = e.target
     setUpdatedProduct({
      ...updatedProduct,
      [name]: value
    })
  }

  const handleUpdate = async () => {
    await updateProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className="bg-green-500 py-2  px-3 rounded-md text-white" >Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">

            <Label htmlFor="size" className="text-right">
             size
            </Label>
            <Input
              name="size"
              defaultValue={product.size}
              className="col-span-3"
              onChange={handleChange}   
            />

            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              name="name"
              defaultValue={product.name}
              className="col-span-3"
              onChange={handleChange}   
            />
            <Label htmlFor="description" className="text-right">
            description
            </Label>
            <Input
              name="description"
              defaultValue={product.description}
              className="col-span-3"
              onChange={handleChange}   
            />
               <Label htmlFor="stock" className="text-right">
            stock
            </Label>
            <Input
              name="stock"
              defaultValue={product.stock}
              className="col-span-3"
              onChange={handleChange}   
            />

            <Label htmlFor="Price" className="text-right">
              Price
            </Label>
            <Input
              name="price"
              defaultValue={product.price}
              className="col-span-3"
              onChange={handleChange}   
            />
              <Label htmlFor="img" className="text-right">
              image
            </Label>
              <Input
              name="img"
              defaultValue={product.img}
              className="col-span-3"
              onChange={handleChange}   
            />
            <Label htmlFor="color" className="text-right">
              Color
            </Label>
            <Input
              name="color"
              defaultValue={product.color}
              className="col-span-3"
              onChange={handleChange}   
            />
          
            
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpdate}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
