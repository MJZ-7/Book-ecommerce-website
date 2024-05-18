import { GlobalContext } from "@/App"
import api from "@/api"
import { NavBar } from "@/components/navBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useContext, useState } from "react"
import { useSearchParams } from "react-router-dom"

export function Home(){

  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""
  const queryClient = useQueryClient()
  const [searchBy, setSearchBy] = useState(defaultSearch)
  console.log("searchBy " + searchBy)

  const context =useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddToCart} = context
  

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
return(
  <>
    <NavBar />
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

    
