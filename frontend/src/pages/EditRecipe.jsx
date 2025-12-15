import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../context/api";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", ingredients: "", instructions: "", image: "" });

  useEffect(() => {
    api.get(`/v1/recipes/${id}`).then(res => res.data.success && setForm(res.data.recipe));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    await api.put(`/v1/recipes/${id}`, form);
    alert("Recipe updated!");
    navigate("/admin");
  };

  return (
    <form onSubmit={submit} className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <input name="title" value={form.title} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
      <textarea name="ingredients" value={form.ingredients} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
      <textarea name="instructions" value={form.instructions} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
      <input name="image" value={form.image} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
      <button className="bg-purple-600 text-white py-2 px-4 rounded">Update Recipe</button>
    </form>
  );
}