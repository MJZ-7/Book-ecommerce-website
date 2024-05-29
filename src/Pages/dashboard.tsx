import React, { useState } from "react"
import { useQuery, QueryClient } from "@tanstack/react-query"

import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { NavBar } from "@/components/navBar"
import { EditDialog } from "@/components/editDialog"
import { Catagories } from "@/components/catagories"
import api from "../api"

import { Category, Product, User } from "../types"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Badge,
  HomeIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingCartIcon,
  UsersIcon
} from "lucide-react"
import UserManage from "./usersmanage"

export function Dashboard() {
  const queryClient = new QueryClient()

  const [product, setProduct] = useState({
    bookName: "",
    categoryId: "",
    description: "",
    stock: 0,
    price: 0,
    img: "",
    writerName: ""
  })
  console.log(product)

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
        categoryName: category.categoryName
      }
    }
    return product
  })
  const handelSelect = (value) => {
    setProduct({
      ...product,
      categoryId: value
    })
  }

  return (
    <>
      <NavBar />

      <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
          <div className="flex flex-col gap-2">
            <div className="flex h-[60px] items-center px-6">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  className="flex items-center mt-60 gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <HomeIcon className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  to="#"
                >
                  <ShoppingCartIcon className="h-4 w-4" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    12
                  </Badge>
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <PackageIcon className="h-4 w-4" />
                  Products
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <UsersIcon className="h-4 w-4" />
                  Customers
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <Catagories />
      </div>
      <UserManage />

      <form
        className="mt-20 justify-between w-full md:w-1/2 mx-auto mb-10  bg-gray-100 dark:bg-gray-800 py-4 px-6 md:px-8 lg:px-12 "
        onSubmit={handelSubmit}
      >
        <h1>Add product</h1>
        <Input
          className="mt-2"
          name="bookName"
          type="text"
          placeholder="book Name"
          onChange={handleChange}
        />
        <div className="mt-2 flex justify-center">
          <div className="w-full">
            <Select name="categoryName" onValueChange={handelSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories?.map((cat) => {
                    return (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.categoryName}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Input
          className="mt-2"
          name="Img"
          type="text"
          placeholder="product Img"
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
          className="mt-2"
          name="writerName"
          type="text"
          placeholder="Writer name"
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
              <TableHead className="w-[100px]">book name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stuck</TableHead>
              <TableHead>Writer name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productWithCat?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.bookName}</TableCell>
                <TableCell>{product.categoryName}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.writerName}</TableCell>
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
