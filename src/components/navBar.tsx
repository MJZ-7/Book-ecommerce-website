import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@radix-ui/react-navigation-menu"
import { Link } from "react-router-dom"
import { Cart } from "./cart"
import { useContext, useRef } from "react"
import { GlobalContext } from "@/App"
import { ROLE } from "@/types"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu"
import { CircleUser } from "lucide-react"

export function NavBar() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handelRemoveUser } = context

  const handelLogout = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    handelRemoveUser()
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm dark:bg-gray-950 dark:text-gray-50">
        <header>
          <div className="container mx-auto flex items-center justify-between">
            <Link
              className="text-2xl font-bold text-gray-900 dark:text-gray-50 flex justify-center"
              to="/"
            >
              <h6>KNOWLEDGE</h6>
            </Link>
          </div>
        </header>
        <NavigationMenu className="flex justify-center gap-10">
          <NavigationMenuList className="gap-10">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList className="gap-10">
            <NavigationMenuItem>
              <Link to="/books">
                <NavigationMenuLink>Books</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList className="gap-10">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink>Best Sellers</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList></NavigationMenuList>
        </NavigationMenu>

        <div>
          <Cart />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-6 w-6" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-white p-2 shadow-md dark:bg-gray-950 dark:shadow-gray-800"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {state.user?.role === ROLE.Admin && (
              <DropdownMenuItem>
                <a href="/dashboard">Dashboard</a>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            {!state.user && (
              <Link to="/login">
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
            )}
            {!state.user && (
              <Link to="/signup">
                <DropdownMenuItem>Sign up</DropdownMenuItem>
              </Link>
            )}
            {state.user && (
              <DropdownMenuItem>
                <Button variant="outline" onClick={handelLogout}>
                  Logout
                </Button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
