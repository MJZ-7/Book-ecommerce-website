import { QueryClient, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import api from "@/api"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table"
import { Category } from "@/types"

export function Catagories() {
  const queryClient = new QueryClient()

  const [category, setcategory] = useState({
    name: ""
  })
  const postCategory = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.post("/categorys", category, {
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
  const handelCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postCategory()
    queryClient.invalidateQueries({ queryKey: ["categorys"] })
  }

  const deleteCategory = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.delete(`/categorys/${id}`, {
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

  const handelDeleteCategory = async (id: string) => {
    const delConfirm = confirm("are you sure you want to delete")
    delConfirm && (await deleteCategory(id))
    queryClient.invalidateQueries({ queryKey: ["categorys"] })
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setcategory({ ...category, [name]: value })
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
  const { data: categories, error: catError } = useQuery<Category[]>({
    queryKey: ["categorys"],
    queryFn: getCategories
  })
  return (
    <form
      className="mt-10 justify-between w-full md:w-1/2 mx-auto mb-10 bg-gray-100 dark:bg-gray-800 py-4 px-6 md:px-8 lg:px-12"
      onSubmit={handelCategorySubmit}
      method="POST"
    >
      <h1>Add category</h1>
      <Input
        className="mt-2"
        name="categoryName"
        type="text"
        placeholder="Category Name"
        onChange={handleCategoryChange}
      />
      <div className="flex justify-between  mt-4">
        <Button type="reset" variant="outline">
          reset
        </Button>
        <Button type="submit">Add category</Button>
      </div>
      <div className="mt-20 justify-between w-full md:w-1/2 mx-auto mb-10">
        <Table>
          <TableCaption>All Categories.</TableCaption>
          <TableHeader>
            <TableRow className="justify-center">
              <TableHead className="w-[100px]">Category name</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="mt-20 justify-between w-full md:w-1/2 mx-auto mb-10">
            {categories?.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.categoryName}</TableCell>
                <TableCell className="text-left flex justify-around gap-5">
                  <Button
                    className="bg-red-500 py-2  px-3 rounded-md text-white"
                    onClick={() => handelDeleteCategory(category.id)}
                  >
                    X
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </form>
  )
}
