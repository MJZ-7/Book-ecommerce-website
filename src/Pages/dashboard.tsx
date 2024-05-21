import React, { useEffect, useState } from "react"
import { useQuery, QueryClient } from "@tanstack/react-query"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import api from "../api"
import { Category, DecodedUser, Product, ROLE, User } from "../types"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table"
import { NavBar } from "@/components/navBar"
import { EditDialog } from "@/components/editDialog"
import jwtDecode from "jwt-decode"
import { useNavigate } from "react-router-dom"

export function Dashboard() {
  const queryClient = new QueryClient()
  const navigate = useNavigate()
  
  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    size: "",
    description: "",
    stock: 0,
    price: 0,
    color: ""
  })

  const token = localStorage.getItem("token") || ""
  const decodedToken = jwtDecode(token)
  const decodedUser: any = {}

  if (decodedToken) {
    for (const [key, value] of Object.entries(decodedToken)) {
      let cleanKey= ""

      if(key.startsWith("http")){
        cleanKey = key.split("identity/claims/")[1]

    }else{
      cleanKey= key
    }
    decodedUser[cleanKey] = value
  }
  }
  console.log("dec",decodedUser.role)
  console.log("role",ROLE.customer)
  useEffect(()=>{
    if(decodedUser.role === ROLE.customer){
      return navigate("/")
    }
  },[])

  console.log("token", decodedToken)  
  console.log("decoded user", decodedUser)




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const postProduct = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.post("/products", product, {
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
  const deleteProduct = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.delete(`/products/${id}`, {
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
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const handelDeleteProduct = async (id: string) => {
    const delConfirm = confirm("are you sure you want to delete")
    delConfirm && (await deleteProduct(id))
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
  const getCategories = async () => {
    try {
      const res = await api.get("/categorys")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
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
  // Queries
  const {
    isPending,
    isError,
    data: products,
    error
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const { data: categories, error: catError } = useQuery<Category[]>({
    queryKey: ["categorys"],
    queryFn: getCategories
  })
  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const productWithCat = products.map((product) => {
    const category = categories?.find((cat) => cat.id === product.categoryId)
    if (category) {
      return {
        ...product,
        categoryId: category.categoryName
      }
    }
    return product
  })
  const handelSelect = (e) => {
    setProduct({
      ...product,
      categoryId: e.target.value
    })
  }

  return (
    <>
      <NavBar />
      <form
        className="mt-20 justify-between w-full md:w-1/2 mx-auto mb-10 "
        onSubmit={handelSubmit}
      >
        <h1>Add product</h1>
        <Input
          className="mt-2"
          name="name"
          type="text"
          placeholder="Product Name"
          onChange={handleChange}
        />
        <select name="categoryId" onChange={handelSelect}>
          {categories?.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            )
          })}
        </select>

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
        <div className="flex justify-between  mt-4">
          <Button type="reset" variant="outline">
            reset
          </Button>
          <Button type="submit">Add product</Button>
        </div>
      </form>

      <div className="mt-20 justify-between w-full md:w-1/2 mx-auto mb-10">
        <Table>
          <TableCaption>All Products.</TableCaption>
          <TableHeader>
            <TableRow className="justify-center">
              <TableHead className="w-[100px]">Name</TableHead>
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
            {productWithCat?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.img}</TableCell>

                <TableCell className="text-left flex gap-5">
                  <EditDialog product={product} />
                  <Button
                    className="bg-red-500 py-2  px-3 rounded-md text-white"
                    onClick={() => handelDeleteProduct(product.id)}
                  >
                    X
                  </Button>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
