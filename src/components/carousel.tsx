import api from "@/api"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "./ui/carousel"
import { Card, CardContent } from "./ui/card"
import { Link } from "lucide-react"
import { useContext, useState } from "react"
import { GlobalContext } from "@/App"

export function CarouselHero() {
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
      const res = await api.get("/products")
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
  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 ">
          <Carousel>
            <CarouselContent>
              {products?.map((product) => (
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
