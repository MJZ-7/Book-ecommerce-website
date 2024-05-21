export type Product = {
  id: string
  name: string
  categoryId: string
  description: string
  size: string
  stock: number
  price: number
  color: string
  img: string
}

export type Category = {
  id: string
  categoryName: string
}

export type User = {
  userId: string
  fullName: string
  role: string
  email: string
}

export const ROLE = {
  User: "User",
  Admin: "Admin"
} as const

export type DecodedUser = {
  aud: string
  emailaddress: string
  exp: number
  iss: string
  name: string
  nameidentifier: string
  role: keyof typeof ROLE
}
