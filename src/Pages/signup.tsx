import api from "@/api"
import { NavBar } from "@/components/navBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"

export function SignUp(){
    const [user,setUser]= useState({
        fullName: "",
        email: "",
        password: ""
      })
      console.log(user)
    const handleSignup = async () => {
        try {
          const res = await api.post(`/users/signup`)
          return res.data
        } catch (error) {
          console.error(error)
          return Promise.reject(new Error("Something went wrong"))
        }
    }
     
    const handleChange= (e : ChangeEvent<HTMLInputElement>)=>{
        const {name, value }= e.target
       setUser({
        ...user,
        [name]:value
       })

    }
    return(
        <>
        <NavBar/>
        <form
    className="mt-20 justify-between w-full md:w-1/2 mx-auto mb-10">
    <h1>SIGNUP</h1>
    <Input
      className="mt-2"
      name="fullName"
      type="text"
      placeholder="Your name"
      onChange={handleChange}
    />
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
    </form>
    <div>
        <Button className="mt-4">SIGNUP</Button>
        <Button variant={"link"} className="mt-4">
        <Link to="/login">Have an account already?</Link>
        </Button>
    </div>
    </>
    )
}