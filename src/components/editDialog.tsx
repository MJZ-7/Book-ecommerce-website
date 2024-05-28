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
import { toast } from "./ui/use-toast"

export function EditDialog({ product }: { product: Product }) {
  const queryClient = new QueryClient()
  const [updatedProduct, setUpdatedProduct] = useState(product)
  console.log(updatedProduct)
  const updateProduct = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.patch(`/products/${updatedProduct.id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value
    })
  }

  const handleUpdate = async () => {
    await updateProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
    toast({
      title: "Product Has Been Updated Successfully. ✅"
    })
    console.log("Book is Updated:", handleUpdate)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 py-2  px-3 rounded-md text-white">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bookName" className="text-right">
              Book name
            </Label>
            <Input
              name="bookName"
              defaultValue={product.bookName}
              className="col-span-3"
              onChange={handleChange}
            />
            <Label htmlFor="writerName" className="text-right">
              Writer Name
            </Label>
            <Input
              name="writerName"
              defaultValue={product.writerName}
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
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpdate}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
