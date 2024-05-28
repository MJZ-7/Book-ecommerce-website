
import { reShapeUser } from "@/lib/utils";
import { ROLE } from "@/types";
import jwtDecode from "jwt-decode";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({children}: {children: ReactElement}){
  
    const token = localStorage.getItem("token") || ""
    if (!token) return <Navigate to="/"/>

    const decodedToken = jwtDecode(token)
    const decodedUser= reShapeUser(decodedToken)

    return decodedUser.role === ROLE.User ? <Navigate to="/login"/> : children
}