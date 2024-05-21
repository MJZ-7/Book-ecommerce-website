import api from "@/api"
import { NavBar } from "@/components/navBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom"

export function SignUp() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: ""
  })
  console.log(user)
  const handleSignUp = async () => {
    try {
      const res = await api.post(`/users/signup`, user)
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
    await handleSignUp()
  }
  return (
    <>
      <NavBar />
      <div>
        <h1>SIGNUP</h1>
        <form
          onSubmit={handleSubmit}
          className="mt-20 justify-between w-full md:w-1/2 mx-auto mb-10"
        >
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

          <div>
            <Button className="mt-4">SIGNUP</Button>
            <Button variant={"link"} className="mt-4">
              <Link to="/login">Have an account already?</Link>
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
