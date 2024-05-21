
import { ROLE } from "@/types";
import jwtDecode from "jwt-decode";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({children}: {children: ReactElement}){
    console.log("global data")
    const token = localStorage.getItem("token") || ""
    const decodedToken = jwtDecode(token)
    const decodedUser: any = {}
  
    if (decodedToken) {
      for (const [key, value] of Object.entries(decodedToken)) {
        let cleanKey= ""
  
        if(key.startsWith("http")){
          cleanKey = key.split("identity/claims/")[1]
  
      }else{
        cleanKey= key
      }
      decodedUser[cleanKey] = value
    }
    }
    console.log("dec",decodedUser.role)
    console.log("role",ROLE.customer)
   
  
    console.log("token", decodedToken)  
    console.log("decoded user", decodedUser)

    return decodedUser.role === ROLE.customer ? <Navigate to="/login"/> : children
}