"use client"

import { useContext, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Filter, Plus, Eye, Edit, Trash2, Ban, CheckCircle } from "lucide-react"
import { AuthContext } from "@/app/context/page"
import { deleteUser } from "@/app/services/authApi"
import { toast, Toaster } from "sonner";
const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "Customer",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    bookings: 3,
    avatar: "SJ",
    number: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    role: "Vendor",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "1 day ago",
    bookings: 0,
    avatar: "MC",
     number: "+1 (555) 123-4567",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@email.com",
    role: "Customer",
    status: "inactive",
    joinDate: "2024-01-08",
    lastActive: "1 week ago",
    bookings: 1,
    avatar: "ED",
     number: "+1 (555) 123-4567",
  },
  {
    id: 4,
    name: "John Smith",
    email: "john.smith@email.com",
    role: "Vendor",
    status: "pending",
    joinDate: "2024-01-20",
    lastActive: "3 hours ago",
    bookings: 0,
    avatar: "JS",
     number: "+1 (555) 123-4567",
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    role: "Customer",
    status: "banned",
    joinDate: "2023-12-15",
    lastActive: "2 weeks ago",
    bookings: 5,
    avatar: "LW",
     number: "+1 (555) 123-4567",
  },
]

const getStatusBadge = (status) => {
  
  
  switch (status) {
    case "active":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Active
        </Badge>
      )
    case "inactive":
      return (
        <Badge variant="default" className="bg-gray-100 text-gray-800">
          Inactive
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="default" className="bg-yellow-100 text-yellow-800">
          Pending
        </Badge>
      )
    case "banned":
      return (
        <Badge variant="default" className="bg-red-100 text-red-800">
          Banned
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getRoleBadge = (role) => {
  switch (role) {
    case "Customer":
      return (
        <Badge variant="default" className="bg-blue-100 text-blue-800">
          Customer
        </Badge>
      )
    case "Vendor":
      return (
        <Badge variant="default" className="bg-purple-100 text-purple-800">
          Vendor
        </Badge>
      )
    case "Admin":
      return (
        <Badge variant="default" className="bg-primary/10 text-primary">
          Admin
        </Badge>
      )
    default:
      return <Badge variant="secondary">{role}</Badge>
  }
}

export function UsersTable() {
  const {allUsers,getUserData}=useContext(AuthContext)
  console.log(allUsers);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteUser =async (userId) => {
    const data =await deleteUser(userId)
    if(data.success){
      toast("User deleted successfully");
      getUserData()}
  }
  return (
    <Card className="p-6">
      {/* Header */}
      <Toaster position="top-center"/>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Users</h2>
          <p className="text-sm text-muted-foreground">Manage all users and their permissions</p>
        </div>
         <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {/* <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button> */}
      </div>
        {/* <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button> */}
      </div>

      {/* Filters */}
     

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Number</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              {/* <th className="text-left py-3 px-4 font-medium text-muted-foreground">Join Date</th>
            
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Bookings</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user ,i)  => (
              <tr key={i} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    {/* <Avatar className="h-10 w-10">
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{user.avatar}</span>
                      </div>
                    </Avatar> */}
                    <div>
                      <p className="font-medium text-foreground">{user.fullName}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{user.phone}</td>
                <td className="py-3 px-4">{getRoleBadge(user.registeredType)}</td>
                
                {/* <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{user.joinDate}</td>
               
                <td className="py-3 px-4 text-sm text-foreground">{user.bookings}</td> */}
                <td className="py-3 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem> */}
                      {/* <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem> */}
                      {/* {user.status === "active" ? (
                        <DropdownMenuItem>
                          <Ban className="mr-2 h-4 w-4" />
                          Suspend User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Activate User
                        </DropdownMenuItem>
                      )} */}
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteUser(user._id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">Showing 1-5 of 1,234 users</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </Card>
  )
}
