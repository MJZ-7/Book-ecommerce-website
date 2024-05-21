import api from "@/api"
import { NavBar } from "@/components/navBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Login(){
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
      })
    const handleLogin = async () => {
        try {
          const res = await api.post(`/users/login`, user)
          return res.data
        } catch (error) {
          console.error(error)
          return Promise.reject(new Error("Something went wrong"))
        }
      }

 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

   const token= await handleLogin()
   if(token){
    localStorage.setItem("token",token)
    navigate("/")
   }
  }

    return(
        <>
        <NavBar/>
        <div>
        <form onSubmit={handleSubmit} className="mt-20 justify-between w-full md:w-1/2 mx-auto mb-10">
    <h1>LOGIN</h1>
    <Input
      className="mt-2"
      name="email"
      type="text"
      placeholder="example@gmail.com"
      onChange={handleChange}
    />
     <Input
      className="mt-2"
      name="password"
      type="password"
      placeholder="Password"
      onChange={handleChange}
    />
   
    <div>
        <Button className="mt-4">LOGIN</Button>
        <Button variant={"link"} className="mt-4">
        <Link to="/signup">Create an account</Link>
        </Button>
    </div>
    </form>
    </div>
    </>
    )
}