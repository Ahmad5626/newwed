"use client";


import { getAuthenticatedAdmin, getAuthenticatedUser, getData, loginUser, registerService } from "@/app/services/authApi";
import { createContext, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { createBlog, deleteBlog, getBlog } from "../services/blog";
import { uploadFile } from "../services/uploadImg";
import { deleteCampaign, getAllCampaigns } from "../services/campaign";
import { baseUrl } from "@/app/utils/Constant"
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [userType, setUserType] = useState("user")
  const [authenticatedUser, setAuthenticatedUser] = useState({});
  const [authenticatedAdmin, setAuthenticatedAdmin] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [campaignData, setCampaignData] = useState([])
  const [blogData, setBlogData] = useState([])
   const [categories, setCategories] = useState([]);
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [uploadingHero, setUploadingHero] = useState(false)
  const [createBlogFormData, setCreateBlogFormData] = useState({
    title: "",
    slug: "",
    shotDescription: "",
    description: "",
    image: "",
    date: "",
    metaTittle: "",
    metaKeyword: "",
    metaDescription: "",
  })
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    registeredType: "user", // 👈 default user
    city: "",
    brandName: "",
    vendorType: "",
  })
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  })


console.log(authenticatedUser);


  //  login form data
  const handleInputChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    })
  }

  //   sumbit register form
  const registerHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await registerService(formData);
      console.log(result);

      if (result?.success) {
        toast.success("Registered successfully!");
        console.log("Registered successfully!");

        router.push("/login");
        setFormData({});
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (error) {
      // ✅ This handles unexpected server errors or non-JSON responses
      const message = error?.response?.data?.message || error.message || "Something went wrong";
      toast.error(message);
    }
  };
  


  // login data
  const loginHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(loginFormData);
      if (result?.success) {
        toast.success("Login successful!");
        console.log("Login successful!");
        const token = localStorage.getItem("token")

        const decoded = JSON.parse(atob(token.split(".")[1]));

       

        if (decoded.role == "admin") {
          router.push("/admin");
          console.log("admin");

        }
        else if (decoded.registeredType == "user") {
          router.push("/user-dashboard");
          console.log("user");
  getLoginUserData()
        }
        else if (decoded.registeredType == "vendor") {
          router.push("/vendor-dashboard");
          console.log("vendor");
           getLoginUserData()

        }
        setLoginFormData({});

      
        getLoginAdminData()
      
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      // ✅ This handles unexpected server errors or non-JSON responses
      const message = error?.response?.data?.message || error.message || "Something went wrong";
      toast.error(message);
    }
  };



  async function getLoginUserData() {
    const user = await getAuthenticatedUser();
    if (user) setAuthenticatedUser(user);
  }

  const getLoginAdminData = async () => {
    const user = await getAuthenticatedAdmin();
    if (user) setAuthenticatedAdmin(user);
  }
  const getUserData = async () => {
    const user = await getData();
    if (user) {
      setAllUsers(user?.data)
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticatedUser(null);
    router.push("/login");
  };

  // blog 

  const getBlogData = async () => {
    const data = await getBlog()
    if (data) {

      setBlogData(data.data)

    }
  }





  const handleChangeCreateBlog = async (e) => {
    const { name, value, files } = e.target;
    setCreateBlogFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    try {
      setUploadingHero(true)
      if (files && files[0]) {
        const file = files[0];
        const uploadedUrl = await uploadFile(file);
        setCreateBlogFormData((prevData) => ({
          ...prevData,
          [name]: uploadedUrl,
        }));
      }
    } catch (error) {
      return error
    } finally {
      setUploadingHero(false)
    }
  }


  const handleSubmitCreateBlog = async (e) => {
    e.preventDefault();
    const data = await createBlog(createBlogFormData)
    try {
      if (data.success) {
        toast.success("Blog Created successfully");
        getBlogData()
      }
      else {
        toast.error("Blog update failed");
        console.log(data);

      }
    } catch (error) {

    } finally {
      getBlogData()
    }
  }



  const handleDeleteBlog = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this destinations? This action cannot be undone.")
    if (isConfirmed) {

      const data = await deleteBlog(id)
    }
    try {
      if (data.success) {
        toast.success("Blog deleted successfully");
        getBlogData()
      }
      else {
        toast.error("Blog deletion failed");
        console.log(data);

      }
    } catch (error) {

    } finally {
      getBlogData()
    }




  }


  // camapaign data

  const getCampaignData = async () => {
    try {

      const res = await fetch(`${baseUrl}/v1/api/get-all-campaigns`);
      const data = await res.json();
      

      setCampaignData(data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteCampaign = async (id) => {
    const data =await deleteCampaign(id)

       toast.success("Campaign deleted successfully");
        getCampaignData()
      
    
   
     
  }

    const fetchCategories = async () => {
    const res = await fetch(`${baseUrl}/v1/api/categories`);
    const data = await res.json();
    setCategories(data.data);
  };
  useEffect(() => {
    getBlogData()
    getLoginUserData()
    getUserData()
    getCampaignData()
    fetchCategories()
    // getLoginAdminData()

  }, [])
  return (
    <AuthContext.Provider
      value={{

        registerHandleSubmit,
        userType,
        setUserType,
        formData,
        setFormData,
        loginHandleSubmit,
        loginFormData,
        setLoginFormData,
        handleInputChange,
        Toaster,
        toast,
        blogData,
        handleDeleteBlog,
        handleSubmitCreateBlog,
        handleChangeCreateBlog,
        createBlogFormData,
        uploadingHero,
        allUsers,
        campaignData,
        handleDeleteCampaign,
        getCampaignData,
        getUserData,
        toast,
        authenticatedUser,
        uploadingHero, setUploadingHero,
        uploadingVideo, setUploadingVideo,
        categories
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
