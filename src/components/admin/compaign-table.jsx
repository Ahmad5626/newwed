"use client"

import { useContext, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Filter, Plus, Eye, Edit, Trash2, Ban, CheckCircle, X } from "lucide-react"
import { AuthContext } from "@/app/context/page"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import TiptapEditor from "./TiptapEditor"
import { updateCampaign } from "@/app/services/campaign"

const Compaign = [
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

export function CompaignTable() {
  const { campaignData, handleDeleteCampaign,Toaster,getCampaignData } = useContext(AuthContext);


  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(campaignData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = campaignData.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Limit description to 50 words
  const truncateDescription = (text = "") => {
    const words = text.split(" ");
    return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : text;
  };

  // Filter campaigns by title
  const filteredCampaign = currentData.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (campaign) => {
    setSelectedCampaign(campaign);
    setEditModal(true);
  };

  const handleInputChange = (e) => {
    setSelectedCampaign({
      ...selectedCampaign,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async() => {
    console.log("Updated campaign:", selectedCampaign);
    setEditModal(false);
    // TODO: API call to update campaign on backend
const data =await updateCampaign(selectedCampaign._id,selectedCampaign)
console.log(data);

if(data.success){
  console.log("Campaign updated successfully");
getCampaignData()
}else{
  console.log("Campaign update failed");
}

  };

  return (
    <Card className="p-6">
    <Toaster position="top-center" />
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Compaigns</h2>
          <p className="text-sm text-muted-foreground">
            Manage all campaigns and their details
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Compaign..."
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
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 px-4">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="py-3 px-4 text-left">Images</th>
              <th className="py-3 px-4 text-left">Videos</th>
              <th className="py-3 px-4 text-left">Title</th>
              {/* <th className="py-3 px-4 text-left">Description</th> */}
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Status</th>

              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaign.map((campaign) => (
              <tr
                key={campaign._id}
                className="border-b border-border hover:bg-muted/50"
              >
                <td className="py-3 px-4">
                  <input type="checkbox" className="rounded" />
                </td>

                {/* Multiple Images */}
                <td className="py-3 px-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {campaign.image?.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={campaign.title}
                        className="h-14 w-14 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                </td>

                {/* Video Section */}
                <td className="py-3 px-4">
                  {campaign.video?.length > 0 ? (
                    <video
                      src={campaign.video[0]}
                      controls
                      className="h-16 w-24 rounded-md border"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">No video</p>
                  )}
                </td>

                <td className="py-3 px-4 font-medium">{campaign.title}</td>
                {/* <td className="py-3 px-4 text-sm text-muted-foreground">
                  {truncateDescription(campaign.description)}
                </td> */}
                <td className="py-3 px-4 font-semibold text-green-600">
                  ₹ {campaign.price}
                </td>
                <td className="py-3 px-4 text-sm">{campaign.address}</td>
                <td className="py-3 px-4 text-sm">{campaign.status}</td>
                {/* Actions */}
                <td className="py-3 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(campaign)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCampaign(campaign._id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
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
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1} -{" "}
          {Math.min(startIndex + itemsPerPage, campaignData.length)} of{" "}
          {campaignData.length} Campaigns
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "bg-primary text-white" : ""}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Edit Popup Modal */}
      {selectedCampaign && (
        <Dialog open={editModal} onOpenChange={setEditModal}>
          <DialogContent className="sm:max-w-5xl">
            <DialogHeader>
              <DialogTitle>Edit Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">

            <select name="status" value={selectedCampaign.status} onChange={handleInputChange} className="">
              <option value="panding">Panding</option>
              <option value="active">Active</option>
            </select>
              <Input
                label="Title"
                name="title"
                value={selectedCampaign.title || ""}
                onChange={handleInputChange}
                placeholder="Enter campaign title"
              />
              <Input
                label="Address"
                name="address"
                value={selectedCampaign.address || ""}
                onChange={handleInputChange}
                placeholder="Enter address"
              />
              <Input
                label="Price"
                name="price"
                type="number"
                value={selectedCampaign.price || ""}
                onChange={handleInputChange}
              />
              <TiptapEditor
                label="Description"
                name="description"
                value={selectedCampaign.description || ""}
                onChange={(value) => setSelectedCampaign({ ...selectedCampaign, description: value })}
              />
            </div>
            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditModal(false)}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}