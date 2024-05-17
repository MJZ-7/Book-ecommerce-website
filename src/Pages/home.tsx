import { GlobalContext } from "@/App"
import api from "@/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { NavBar } from "@/components/ui/navBar"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"

export function Home(){
  const context =useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const {state, handleAddToCart} = context
  

    const getProducts = async () => {
        try {
          const res = await api.get("/products")
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


return(
  <>
    <NavBar />
 <div className="App">
    <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto flex-wrap">
      {data?.map((product) => (
        <Card key={product.id} className="w-[350px]">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>Some Description here</CardDescription>
          </CardHeader>
          <CardHeader>
           <img src={product.img} alt={product.name} className="mb-1 h-50 object-contain"/>
          </CardHeader> 
          <CardContent>
            {product.description}
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={()=>{handleAddToCart(product)}}>Add to cart</Button>
          </CardFooter>
        </Card>
      ))}
    </section>
    {error && <p className="text-red-500">{error.message}</p>}
  </div>
  </>
    )}

    
