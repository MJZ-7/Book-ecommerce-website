import React, { useState } from "react"
import { useQuery, QueryClient } from "@tanstack/react-query"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import api from "../api"
import { Product } from "../types"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table"
import { NavBar } from "@/components/ui/navBar"

export function Dashboard() {
  const queryClient = new QueryClient()
  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    size: "",
    description: "",
    stock: 0,
    price: 0,
    color: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log({ name, value })
    setProduct({ ...product, [name]: value })
  }

  const postProduct = async () => {
    try {
      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postProduct()

    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { isPending, isError, data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
    <NavBar />
      <form className="mt-20 justify-between" onSubmit={handelSubmit}>
        <h3>Add product</h3>
        <Input
          className="mt-2"
          name="name"
          type="text"
          placeholder="Product Name"
          onChange={handleChange}
        />
        <Input
          className="mt-2"
          name="categoryId"
          type="text"
          placeholder="Category id"
          onChange={handleChange}
        />

        <Input
          className="mt-2"
          name="Img"
          type="text"
          placeholder="product Img"
          onChange={handleChange}
        />
        <Input
          className="mt-2"
          name="size"
          type="text"
          placeholder="size"
          onChange={handleChange}
        />

        <Input
          className="mt-2"
          name="description"
          type="text"
          placeholder="description"
          onChange={handleChange}
        />

        <Input
          className="mt-2"
          name="stock"
          type="number"
          placeholder="stock"
          onChange={handleChange}
        />

        <Input
          className="mt-2"
          name="price"
          type="number"
          placeholder="price"
          onChange={handleChange}
        />
        <Input
          className="mt-3"
          name="color"
          type="text"
          placeholder="color"
          onChange={handleChange}
        />
        <div className="flex justify-between  ">
          <Button type="reset" variant="outline">
            reset
          </Button>
          <Button type="submit" className="mt-4">
            Add product
          </Button>
        </div>
      </form>
      
      <div className="">
        <Table>
          <TableCaption>All Products.</TableCaption>
          <TableHeader>
            <TableRow className="justify-center">
              <TableHead className="w-[100px]" >Name</TableHead>
              <TableHead>Stuck</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">Image</TableHead>  
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.img}</TableCell>

                <TableCell className="text-left flex gap-5">
                  <button className="bg-green-500 py-2  px-3 rounded-md text-white">Update</button>
                  <button className="bg-red-500 py-2  px-3 rounded-md text-white">X</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
