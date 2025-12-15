import { useState } from "react";
import api from "../context/api";
import { useNavigate } from "react-router-dom";

export default function AddRecipe() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("kitchenhub_user"));

  const [form, setForm] = useState({ title: "", ingredients: "", instructions: "", image: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post("/v1/recipes", { ...form, createdBy: user._id });
      alert("Recipe added!");
      navigate("/admin");
    } catch (err) {
      alert("Failed to add recipe");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Add Recipe</h1>
      <input name="title" placeholder="Title" onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
      <textarea name="ingredients" placeholder="Ingredients" onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
      <textarea name="instructions" placeholder="Instructions" onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
      <input name="image" placeholder="Image URL" onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
      <button className="bg-purple-600 text-white py-2 px-4 rounded">Add Recipe</button>
    </form>
  );
}