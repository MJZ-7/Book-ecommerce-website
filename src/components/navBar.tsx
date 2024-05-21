import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@radix-ui/react-navigation-menu"
import { Link } from "react-router-dom"
import { Cart } from "./cart"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { ROLE } from "@/types"


export function NavBar() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state } = context
  console.log(state)

  return (
    <div className="flex justify-between gap-10 mb-10">
      <h3 >LOGO</h3>
      <NavigationMenu className="flex justify-between gap-10">
        <NavigationMenuList className="gap-10">
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          {state.user?.role === ROLE.Admin && (
            <NavigationMenuItem>
              <Link to="/dashboard">
                <NavigationMenuLink>Dashboard</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
        <NavigationMenuList>
          {!state.user && <NavigationMenuItem>
            <Link to="/login">
              <NavigationMenuLink>Login</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>}
        </NavigationMenuList>
        <NavigationMenuList>
        {!state.user && <NavigationMenuItem>
            <Link to="/signup">
              <NavigationMenuLink>Sign up</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>}
        </NavigationMenuList>
      </NavigationMenu>
      <Cart />
    </div>
  )
}
