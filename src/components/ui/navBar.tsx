import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu"
import { Link } from "react-router-dom"

import { Cart } from "./cart"
export function NavBar() {
  return (
    <div className="flex justify-between gap-10 mb-10">
      <h3>LOGO</h3>
      <NavigationMenu className="flex justify-between gap-10">
        <NavigationMenuList className="gap-10">
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/dashboard">
              <NavigationMenuLink>Dashboard</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/docs">
              <NavigationMenuLink>About us</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>  
        </NavigationMenuList>
      </NavigationMenu>
      <Cart />
      
    </div>
  )
}
