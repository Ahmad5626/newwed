"use client"
import React, { useContext, useEffect, useState } from "react"
import {
    getSingleCampaign,
    updateCampaign,
    deleteCampaign,
} from "@/app/services/campaign"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Trash2, MapPin, IndianRupee, X, Camera, Video, Loader2 } from "lucide-react"
import { toast, Toaster } from "sonner"
import TiptapEditor from "@/components/admin/TiptapEditor"
import { uploadFile } from "@/app/services/uploadImg"
import { AuthContext } from "@/app/context/page"

const VendorCampaign = () => {
    const { uploadingHero, setUploadingHero, uploadingVideo, setUploadingVideo } = useContext(AuthContext)
    const [userCampaign, setUserCampaign] = useState([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [editData, setEditData] = useState(null)
const [selectedLeads, setSelectedLeads] = useState([]);
const [showLeadsModal, setShowLeadsModal] = useState(false);
console.log(userCampaign);

    const getProfileData = async () => {
        try {
            const data = await getSingleCampaign()
            setUserCampaign(data.data)
        } catch (error) {
            console.error(error)
            toast.error("Failed to fetch campaigns")
        }
    }

    useEffect(() => {
        getProfileData()
    }, [])

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this campaign?")) return
        try {
            await deleteCampaign(id)
            toast.success("Campaign deleted successfully")
            getProfileData()
        } catch (error) {
            toast.error("Error deleting campaign")
        }
    }

    const handleEdit = (project) => {
        setEditData(project)
        setShowEditModal(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditData((prev) => ({ ...prev, [name]: value }))
    }

    // ✅ Upload Multiple Files & Append to Existing
    const handleFileChange = async (e, type) => {
        setUploadingHero(true)
        const files = Array.from(e.target.files)
        if (files.length === 0) return

        try {
            toast.loading("Uploading files...", { id: "upload" })
            const uploadedUrls = []

            for (const file of files) {
                const url = await uploadFile(file)
                uploadedUrls.push(url)
            }

            setEditData((prev) => ({
                ...prev,
                [type]: [...(prev[type] || []), ...uploadedUrls],
            }))

            toast.success("Files uploaded successfully!", { id: "upload" })
        } catch (error) {
            console.error(error)
            toast.error("Failed to upload files", { id: "upload" })
        }
        setUploadingHero(false)
    }


    const handleUpdate = async () => {
        try {
            const result = await updateCampaign(editData._id, editData)
            if (result?.success) {
                toast.success("Campaign updated successfully")
                setShowEditModal(false)
                getProfileData()
            } else toast.error(result?.message || "Update failed")
        } catch {
            toast.error("Error updating campaign")
        }
    }


    const handleShowLeads = (leads) => {
        setSelectedLeads(leads);
        setShowLeadsModal(true);
    };
    return (
        <>
            <Toaster position="top-center" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-4">

                {userCampaign?.map((project) => (
                    <Card
                        key={project._id}
                        className="overflow-hidden border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                    >
                        <div className="relative">
                            {project.image?.length > 0 ? (
                                <img
                                    src={project.image[0]}
                                    alt={project.title}
                                    className="w-full h-56 object-cover"
                                />
                            ) : (
                                <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>

                        <CardContent className="p-5">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{project.title}</h3>
                            <p className="text-sm text-gray-500 mb-3">{project.vendorType}</p>

                            <div className="flex items-center text-gray-700 text-sm mb-2">
                                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                                <span>{project.address}</span>
                            </div>

                            <div className="flex items-center mb-3 text-gray-900">
                                <IndianRupee className="w-4 h-4 mr-1 text-green-600" />
                                <span className="font-semibold text-lg">{project.price}</span>
                            </div>

                            <div
                                className="text-sm text-gray-700 leading-relaxed mb-4 max-h-32 overflow-y-auto"
                                dangerouslySetInnerHTML={{ __html: project.description }}
                            ></div>



                            <div className="flex justify-between items-center gap-3">
                                <Button
                                    variant="secondary"
                                    onClick={() => handleShowLeads(project.messages || [])}
                                    className="flex items-center gap-1 flex-1 bg-purple-600 text-white hover:bg-purple-700"
                                >
                                    Leads
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleEdit(project)}
                                    className="flex items-center gap-1 flex-1 border-blue-500 text-blue-600 hover:bg-blue-50"
                                >
                                    <Edit className="w-4 h-4" /> Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(project._id)}
                                    className="flex items-center gap-1 flex-1"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* ✅ Edit Modal */}
                {showEditModal && editData && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                        <div className="bg-white w-full max-w-2xl p-6 rounded-2xl relative shadow-lg overflow-y-auto max-h-[90vh]">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="absolute top-3 right-3 text-gray-600 hover:text-black"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="text-xl font-semibold mb-5 border-b pb-2">
                                ✏️ Edit Campaign
                            </h2>

                            <div className="space-y-4">
                                <input
                                    name="title"
                                    value={editData.title}
                                    onChange={handleChange}
                                    placeholder="Campaign Title"
                                    className="w-full border p-3 rounded-md"
                                />
                                <TiptapEditor
                                    label="Description"
                                    name="description"
                                    value={editData.description || ""}
                                    onChange={(value) => setEditData({ ...editData, description: value })}
                                />



                                <select
                                    name="vendorType"
                                    value={editData.vendorType}
                                    onChange={handleChange}
                                    className="w-full border p-3 rounded-md"
                                >
                                    <option>Wedding Photographer</option>
                                    <option>Wedding Planner</option>
                                    <option>Caterer</option>
                                    <option>Decorator</option>
                                    <option>Makeup Artist</option>
                                </select>

                                <input
                                    name="address"
                                    value={editData.address}
                                    onChange={handleChange}
                                    placeholder="Address"
                                    className="w-full border p-3 rounded-md"
                                />

                                <input
                                    name="price"
                                    type="number"
                                    value={editData.price}
                                    onChange={handleChange}
                                    placeholder="Price"
                                    className="w-full border p-3 rounded-md"
                                />

                                {/* Images */}
                                <div>
                                    <label className="block mb-1 font-medium">Images</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="file"
                                            multiple
                                            onChange={(e) => handleFileChange(e, "image")}
                                            className="w-full border p-2 rounded"
                                        />
                                        <Camera className="text-gray-500" />
                                    </div>

                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        {editData.image?.map((img, i) => (
                                            <div key={i} className="relative">
                                                <img src={img} className="w-24 h-20 object-cover rounded border" />
                                                <button
                                                    onClick={() =>
                                                        setEditData((prev) => ({
                                                            ...prev,
                                                            image: prev.image.filter((_, index) => index !== i),
                                                        }))
                                                    }
                                                    className="absolute top-0 right-0 bg-black/60 text-white text-xs px-1 rounded"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                {/* Videos */}
                                <div>
                                    <label className="block mb-1 font-medium">Videos</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="file"
                                            multiple
                                            accept="video/*"
                                            onChange={(e) => handleFileChange(e, "video")}
                                            className="w-full border p-2 rounded"
                                        />
                                        <Video className="text-gray-500" />
                                    </div>

                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        {editData.video?.map((vid, i) => (
                                            <div key={i} className="relative">
                                                <video src={vid} className="w-24 h-20 rounded border" controls />
                                                <button
                                                    onClick={() =>
                                                        setEditData((prev) => ({
                                                            ...prev,
                                                            video: prev.video.filter((_, index) => index !== i),
                                                        }))
                                                    }
                                                    className="absolute top-0 right-0 bg-black/60 text-white text-xs px-1 rounded"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                <div className="flex justify-end gap-3 mt-4">
                                    <Button variant="outline" onClick={() => setShowEditModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleUpdate}>Save Changes</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {showLeadsModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl p-5 w-full max-w-lg max-h-[80vh] overflow-y-auto">

            <h2 className="text-2xl font-bold mb-4 text-gray-800">Campaign Leads</h2>

            {selectedLeads.length === 0 ? (
                <p className="text-gray-500">No leads available.</p>
            ) : (
                selectedLeads.map((lead, index) => (
                    <div
                        key={index}
                        className="border rounded-lg p-4 mb-3 shadow-sm bg-gray-50"
                    >
                        <p><strong>Name:</strong> {lead.name}</p>
                        <p><strong>Email:</strong> {lead.email}</p>
                        <p><strong>Mobile:</strong> {lead.mobile}</p>
                        <p><strong>City:</strong> {lead.city}</p>
                        <p className="mt-2">
                            <strong>Message:</strong> {lead.message}
                        </p>
                    </div>
                ))
            )}

            <Button
                onClick={() => setShowLeadsModal(false)}
                className="mt-4 w-full bg-red-500 text-white hover:bg-red-600"
            >
                Close
            </Button>

        </div>
    </div>
)}

            </div>
        </>

    )
}

export default VendorCampaign
