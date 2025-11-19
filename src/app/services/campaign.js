"use client";

import { baseUrl } from "@/app/utils/Constant";
const token = localStorage.getItem("token");
export  const createCampaign = async (formData) => {
    try {
        const data = await fetch(`${baseUrl}/v1/api/create-campaign`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        const res = await data.json();
        return res;
    } catch (error) {
        return error;
    }
};

 export const getSingleCampaign=async()=>{
    const res=await fetch(`${baseUrl}/v1/api/get-login-user-campaigns`,{
      method:"GET",
      headers: {
        'authorization': `Bearer ${token}`,
      },
    });
    const data=await res.json();
    if(data.success){
      // console.log("Campaigns fetched successfully:", data.data.campaigns);
      return data; // return campaign data
    }else{
      console.warn("Campaign fetch failed");
      return data.err;
    }
 
  }

   export const  getAllCampaigns=async()=>{
    const res=await fetch(`${baseUrl}/v1/api/get-all-campaigns`);
    const data=await res.json();
    if(data.success){
      // console.log("Campaigns fetched successfully:", data.data.campaigns);
      return data; // return campaign data
    }else{
      console.warn("Campaign fetch failed");
      return data.err;
    }
  }

  export const deleteCampaign=async(id)=>{
    const res=await fetch(`${baseUrl}/v1/api/delete-campaign/${id}`,{
      method:"DELETE",
     headers: {
        "Content-Type": "application/json",
        
      },
    });
    const data=await res.json();
    if(data.success){
      // console.log("Campaigns fetched successfully:", data.data.campaigns);
      return data; // return campaign data
    }else{
      console.warn("Campaign fetch failed");
      return data.err;
    }
  }

  export const updateCampaign=async(id,formData)=>{
    const res=await fetch(`${baseUrl}/v1/api/update-campaign/${id}`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        
      },
      body:JSON.stringify(formData)
    });
    const data=await res.json();
    if(data.success){
      // console.log("Campaigns fetched successfully:", data.data.campaigns);
      return data; // return campaign data
    }else{
      console.warn("Campaign fetch failed");
      return data.err;
    }
  }

  export const addCompaignMasseage=async(id ,formData)=>{
    const res=await fetch(`${baseUrl}/v1/api/add-campaign-message/${id}`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        
      },
       body: JSON.stringify(formData),
    });
    const data=await res.json();
    if(data.success){
     
      return data; // return campaign data
    }else{
      console.warn("Campaign fetch failed");
      return data.err;
    }
  }