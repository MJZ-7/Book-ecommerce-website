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
  DropdownMenuTrigger,
  Separator
} from "@radix-ui/react-dropdown-menu"
import { Badge, CircleUser, MinusIcon, PlusIcon, SearchIcon, ShoppingCartIcon } from "lucide-react"
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

      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Cart</h1>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="sr-only">Cart</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[400px]">
                <div className="flex flex-col gap-4 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Cart</h3>
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      3
                    </Badge>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4">
                      <img
                        alt="Product Image"
                        className="rounded-md"
                        height={80}
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "80/80",
                          objectFit: "cover"
                        }}
                        width={80}
                      />
                      <div className="grid gap-1">
                        <h4 className="font-medium">Product Name</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">$19.99</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost">
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span>1</span>
                        <Button size="icon" variant="ghost">
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4">
                      <img
                        alt="Product Image"
                        className="rounded-md"
                        height={80}
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "80/80",
                          objectFit: "cover"
                        }}
                        width={80}
                      />
                      <div className="grid gap-1">
                        <h4 className="font-medium">Another Product</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">$29.99</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost">
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span>2</span>
                        <Button size="icon" variant="ghost">
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4">
                      <img
                        alt="Product Image"
                        className="rounded-md"
                        height={80}
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "80/80",
                          objectFit: "cover"
                        }}
                        width={80}
                      />
                      <div className="grid gap-1">
                        <h4 className="font-medium">Third Product</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">$9.99</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost">
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span>1</span>
                        <Button size="icon" variant="ghost">
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Total</p>
                    <p className="text-lg font-semibold">$59.97</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline">
                      View Cart
                    </Button>
                    <Button className="flex-1">Checkout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
      </div>
    </>
  )
}
