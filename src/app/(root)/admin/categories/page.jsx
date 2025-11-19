"use client";
import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "@/app/utils/Constant";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AuthContext } from "@/app/context/page";
export default function CategoriesAdmin() {
const {categories}=useContext(AuthContext)
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    const res = await fetch(`${baseUrl}/v1/api/categories`);
    const data = await res.json();
    setCategories(data.data);
  };

  const saveCategory = async () => {
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${baseUrl}/v1/api/categories/${editId}`
      : `${baseUrl}/v1/api/categories`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    setEditId(null);
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await fetch(`${baseUrl}/v1/api/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
     <AdminLayout>
 <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Manage Categories</h1>

      <div className="flex gap-3 mb-6">
        <input
          value={name}
          placeholder="Category Name"
          onChange={(e) => setName(e.target.value)}
          className="border p-3 w-64 rounded"
        />
        <button
          onClick={saveCategory}
          className="bg-primary text-white px-4 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Category List */}
      <div className="bg-white shadow p-5 rounded w-96">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="flex justify-between p-2 border-b text-gray-700"
          >
            {cat.name}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditId(cat._id);
                  setName(cat.name);
                }}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCategory(cat._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
     </AdminLayout>
   
    </>

  );
}
