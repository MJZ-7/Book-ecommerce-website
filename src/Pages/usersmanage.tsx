import api from "@/api"
import { EditUserDialog } from "@/components/editUserDialog"

import { NavBar } from "@/components/navBar"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { User } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export default function UserManage() {
  const queryClient = useQueryClient()

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong, We can't get the user"))
    }
  }

  const {
    data: getUsers,
    error,
    isPending
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUser
  })

  const deleteUsers = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Send token with request to check permissions
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(
        new Error("Something went wrong!! User you want to delete is not found")
      )
    }
  }
  const handleDeleteUser = async (id: string) => {
    await deleteUsers(id)
    queryClient.invalidateQueries({ queryKey: ["users"] })
    toast({
      title: "User has been deleted."
    })
    console.log("User is deleted:", handleDeleteUser)
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col gap-8 p-4 md:p-6bg-gray-100 dark:bg-gray-800 py-4 px-6 md:px-8 lg:px-12">
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[24px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getUsers?.map((user) => {
                return (
                  <TableRow key={user.userId}>
                    <TableCell></TableCell>
                    <TableCell className="font-medium">{user.fullName}</TableCell>
                    <TableCell className="font-medium">{user.role}</TableCell>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => handleDeleteUser(user.userId)} variant={"destructive"}>
                        Delete
                      </Button>
                      <EditUserDialog user={user} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
