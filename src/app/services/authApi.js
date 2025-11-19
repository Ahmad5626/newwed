
"use client"
import { baseUrl } from "@/app/utils/Constant";
const token = localStorage.getItem("token");
      
 export async function registerService(formData) {
  try {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Register error:", err);
    return err;
  }
}
 export async function loginUser(formData) {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    
    // console.log("login user dara:", data.user);
   
   if (data?.data?.token) {
      localStorage.setItem("token", data.data.token);
    }
   return data; 
  } catch (err) {
    console.error("Login Error:", err);
    return err;
  }
}

// check login user
export async function getAuthenticatedUser() {
  try {
  const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found in localStorage");
      return null;
    }

    const res = await fetch(`${baseUrl}/auth/check-auth`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Send token in Authorization header
      },
    });

    const data = await res.json();
    if (data.success) {
      // console.log("Authenticated user:", data.data);
      return data.data // return user data
    } else {
      console.warn("Authentication failed");
      return null;
    }
  } catch (error) {
    console.error("Error checking auth:", error);
    return null;
  }
}

export async function getAuthenticatedAdmin() {
  try {
  const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found in localStorage");
      return null;
    }

    const res = await fetch(`${baseUrl}/auth/admin/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Send token in Authorization header
      },
    });

    const data = await res.json();
    if (data.success) {
      // console.log("Authenticated user:", data.data);
      return data.data // return user data
    } else {
      console.warn("Authentication failed");
      return null;
    }
  } catch (error) {
    console.error("Error checking auth:", error);
    return null;
  }
}



export async function updateUser(formData){
  try {
    const res=await fetch (`${baseUrl}/auth/update-user`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body:JSON.stringify(formData)

    })
    const data=await res.json();
    if(data.success){
      console.log("User updated successfully:", data.data.user);
      return data; // return user data
    }else{
      console.log("User update failed");
      return data.err;
    }
  } catch (error) {
    console.log(error);
    
  }
}


export  async function getData(){
         try{
           const response=await fetch(`${baseUrl}/auth/get-user-data`)
           const data=await response.json()
          
           return data
         }catch(err){
           console.log(err)
         }
        }

        export async function deleteUser(id){
          try{
            const response=await fetch(`${baseUrl}/auth/delete-user/${id}`,{method:"DELETE"})
            const data=await response.json()
            return data
          }catch(err){
            console.log(err)
          }
        }
        

        export async function logoutUser(){
          try{
            const response=await fetch(`${baseUrl}/auth/logout`,{method:"GET"})
            const data=await response.json()
            return data
          }catch(err){
            console.log(err)
          }
        }
