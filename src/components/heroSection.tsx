import { Button } from "./ui/button"
import { Product } from "../types"
import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { NavBar } from "./navBar"
import { useContext, useState } from "react"
import { GlobalContext } from "@/App"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "./ui/carousel"
import { Card, CardContent } from "./ui/card"

export function Hero() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddToCart } = context

  const [product, setProduct] = useState({
    id: "",
    name: "",
    categoryId: "",
    WriterName: "",
    description: "",
    stock: 0,
    price: 0,
    img: ""
  })
  const getProducts = async () => {
    try {
      const res = await api.get(`/products/?limit=${1}&offset=${0}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const getAllProducts = async () => {
    try {
      const res = await api.get("products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  const { data: allProducts, error: Perror } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts
  })

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen  mt-5">
        <main className="flex-1">
          <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-16 lg:py-20">
            {allProducts?.map((product) => (
              <div
                key={product.id}
                className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16"
              >
                <div className="flex flex-col items-start justify-center">
                  <img
                    alt="Book Cover"
                    className="rounded-lg shadow-lg"
                    height={600}
                    src={product.img}
                    style={{
                      aspectRatio: "400/600",
                      objectFit: "cover"
                    }}
                    width={400}
                  />
                </div>
                <div className="flex flex-col items-start justify-center space-y-6">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50">
                    {product.bookName}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">{product.writerName}</p>
                  <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
                  <Button
                    onClick={() => {
                      handleAddToCart(product)
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            ))}
          </section>
          <section className="bg-white dark:bg-gray-900 py-12 md:py-16 lg:py-20">
            <div className="container mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">
                New Arrivals
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                <Link className="group" to="#">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img
                      alt="Book Cover"
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      height={450}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "300/450",
                        objectFit: "cover"
                      }}
                      width={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-4 text-white group-hover:bottom-6 transition-all duration-300">
                      <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                      <p className="text-sm">{product.WriterName}</p>
                    </div>
                  </div>
                </Link>
                <Link className="group" to={`products/${product.id}`}>
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img
                      alt="Book Cover"
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      height={450}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "300/450",
                        objectFit: "cover"
                      }}
                      width={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-4 text-white group-hover:bottom-6 transition-all duration-300">
                      <h3 className="text-lg font-bold mb-1">The Silent Patient</h3>
                      <p className="text-sm">Alex Michaelides</p>
                    </div>
                  </div>
                </Link>
                <Link className="group" to="#">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img
                      alt="Book Cover"
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      height={450}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "300/450",
                        objectFit: "cover"
                      }}
                      width={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-4 text-white group-hover:bottom-6 transition-all duration-300">
                      <h3 className="text-lg font-bold mb-1">Where the Crawdads Sing</h3>
                      <p className="text-sm">Delia Owens</p>
                    </div>
                  </div>
                </Link>
                <Link className="group" to="#">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img
                      alt="Book Cover"
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      height={450}
                      src={product.img}
                      style={{
                        aspectRatio: "300/450",
                        objectFit: "cover"
                      }}
                      width={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-4 text-white group-hover:bottom-6 transition-all duration-300">
                      <h3 className="text-lg font-bold mb-1">The Vanishing Half</h3>
                      <p className="text-sm">Brit Bennett</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>

      <section className="bg-white dark:bg-gray-900 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-5 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          <Carousel>
            <CarouselContent>
              {allProducts?.map((product) => (
                <CarouselItem key={product.id} className="basis-1/3">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <Link className="group" to={`products/${product.id}`}>
                      <Card>
                        <CardContent>
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
                          <div className="absolute bottom-4 left-4 text-white group-hover:bottom-6 transition-all duration-300">
                            <h3 className="text-lg font-bold mb-1">{product.bookName}</h3>
                            <p className="text-sm">{product.writerName}</p>
                          </div>
                          <img
                            alt="Book Cover"
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                            height={450}
                            src={product.img}
                            style={{
                              aspectRatio: "300/450",
                              objectFit: "cover"
                            }}
                            width={300}
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </>
  )
}
