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
import { CircleUser, LibraryBigIcon, SearchIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Input } from "./ui/input"

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
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm dark:bg-gray-950 dark:text-gray-50">
      <header>
        <div className="container mx-auto flex items-center justify-between">
          <Link
            className="text-2xl font-bold text-gray-900 dark:text-gray-50 flex justify-center"
            to="/"
          >
            <LibraryBigIcon />
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
            <Link to="/">
              <NavigationMenuLink>New Arrivals</NavigationMenuLink>
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
        <div className="relative w-full max-w-md">
          <Popover>
            <PopoverTrigger asChild>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-auto">
                <Link to="#">
                  <Button className="rounded-full" size="icon" variant="ghost">
                    <SearchIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </Button>
                </Link>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full max-w-md">
              <Input
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                placeholder="Search..."
              />
            </PopoverContent>
          </Popover>
        </div>
        <NavigationMenuList>
          <Cart />
        </NavigationMenuList>
      </NavigationMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-6 w-6" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {state.user?.role === ROLE.Admin && ( // Protect component from customers
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
  )
}
