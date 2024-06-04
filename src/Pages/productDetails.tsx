import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { useContext } from "react"

import { Product } from "@/types"
import api from "@/api"
import { GlobalContext } from "@/App"

import { Footer } from "@/components/footer"
import { NavBar } from "@/components/navBar"
import { Button } from "@/components/ui/button"

export function ProductDetails() {
  const context = useContext(GlobalContext)

  if (!context) throw Error("Context not found")
  const { state, handleAddToCart } = context
  const params = useParams()

  // API
  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${params.productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const {
    data: product,
    error,
    isLoading
  } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProduct
  })
  if (!product) {
    return <p>Product not found</p>
  }
  if (isLoading) {
    return <span>Loading...</span>
  }
  return (
    <>
      <div>
        <NavBar />
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                alt="book cover"
                className="w-auto h-auto rounded-md object-cover"
                height={600}
                src={product.img}
                style={{
                  aspectRatio: "600/600",
                  objectFit: "cover"
                }}
                width={400}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.bookName}</h1>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs">SR</span>
                  <span className="text-3xl font-bold">{product.price}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p>{product.description}</p>
                </div>
                <Button size="lg" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
