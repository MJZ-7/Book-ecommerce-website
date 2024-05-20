import api from "@/api"
import { NavBar } from "@/components/navBar"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"



export function ProductDetails() {
    const params = useParams()
    console.log(params)
  
    const getProducts = async () => {
        try {
          const res = await api.get(`/products/${params.productId}`)
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
      } = useQuery<Product>({
        queryKey: ["product"],
        queryFn: getProducts
      })
      if (isPending) {
        return <span>Loading...</span>
      }
    
      if (isError) {
        return <span>Error: {error.message}</span>
      }
      console.log(products)
    return (
      <>
        <NavBar />
        <div>
          <p>product name: {products.name}</p>
          <p>{products.price}</p>
          <p>{products.color}</p>
          
        </div>
      </>
    )
}