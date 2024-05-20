import { NavBar } from "@/components/navBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

export function Login(){
    const handleChange= ()=>{
        return 
    }
    return(
        <>
        <NavBar/>
        <form
    className="mt-20 justify-between w-full md:w-1/2 mx-auto mb-10">
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
    </form>
    <div>
        <Button className="mt-4">LOGIN</Button>
        <Button variant={"link"} className="mt-4">
        <Link to="/signup">Create an account</Link>
        </Button>
    </div>
    </>
    )
}