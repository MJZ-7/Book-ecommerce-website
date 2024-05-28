import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem
} from "@radix-ui/react-select"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import api from "@/api"
import { Product, Category } from "@/types"
import { useQuery, QueryClient } from "@tanstack/react-query"
import { useState } from "react"

export function AddProduct() {
  const [product, setProduct] = useState({
    bookName: "",
    categoryId: "",
    description: "",
    stock: 0,
    price: 0,
    img: "",
    writerName: ""
  })
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

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
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
    </>
  )
}
