import { GlobalContext } from "@/App"
import api from "@/api"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/heroSection"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowUpIcon } from "lucide-react"
import { useContext, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Books } from "./books"

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""

  const queryClient = useQueryClient()
  const [searchBy, setSearchBy] = useState(defaultSearch)

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddToCart } = context

  const getProducts = async () => {
    try {
      const res = await api.get(`/products?searchBy=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
  }

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    queryClient.invalidateQueries({ queryKey: ["products"] })
    setSearchParams({
      ...searchParams,
      searchBy: searchBy
    })
  }
  return (
    <>
      <Hero />

      <div className="mx-5">
        {error && <p className="text-red-500">{error.message}</p>}
        <aside className="bg-gray-100 dark:bg-gray-800 py-8 px-6 md:px-8 lg:px-12">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              Browse by Genre
            </h2>
            <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Fiction
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Non-Fiction
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Mystery
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Romance
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Science Fiction
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Fantasy
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Biography
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                History
              </Link>
            </nav>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  )
}
