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
      <button
        onClick={() => {
          window.scroll({
            top: 0,
            behavior: "smooth"
          })
        }}
        className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300 dark:focus:ring-offset-gray-950"
      >
        <ArrowUpIcon className="h-6 w-6" />
      </button>
      <div>
        <form onSubmit={handleSubmitSearch} className="flex gap-3 w-1/2 mt-5 mb-5 mx-auto">
          <Input
            type="search"
            placeholder="Search for a product"
            value={searchBy}
            onChange={handleChange}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className="App">
        <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto flex-wrap">
          {data?.map((product) => (
            <Card key={product.id} className="w-[350px]">
              <CardHeader>
                <CardTitle>{product.bookName}</CardTitle>
              </CardHeader>
              <CardHeader>
                <img
                  src={product.img}
                  alt={product.bookName}
                  className="mb-1 h-50 object-contain"
                />
              </CardHeader>
              <CardContent>
                <CardDescription>Some Description here</CardDescription>
                {product.description}
              </CardContent>
              <CardFooter className="flex justify-evenly">
                <Link to={`products/${product.id}`}>
                  <Button className="w-full" variant={"outline"}>
                    More Details
                  </Button>
                </Link>
                <Button
                  className="w-full"
                  onClick={() => {
                    handleAddToCart(product)
                  }}
                >
                  Add to cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>

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
