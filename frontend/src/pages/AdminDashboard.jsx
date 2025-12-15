import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../context/api";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("kitchenhub_user"));
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get("/v1/recipes")
      .then(res => {
        const myRecipes = res.data.recipes.filter(r => r.createdBy === user._id);
        setRecipes(myRecipes);
      })
      .catch(err => console.log(err));
  }, [user]);

  const remove = async id => {
    await api.delete(`/v1/recipes/${id}`);
    setRecipes(recipes.filter(r => r._id !== id));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Recipes</h1>
      <Link to="/add-recipe" className="bg-purple-600 text-white py-2 px-4 rounded mb-4 inline-block">+ Add Recipe</Link>
      {recipes.length === 0 ? <p>No recipes yet</p> : (
        <div className="grid md:grid-cols-2 gap-4">
          {recipes.map(r => (
            <div key={r._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <span>{r.title}</span>
              <div className="flex gap-2">
                <Link to={`/edit-recipe/${r._id}`} className="bg-yellow-400 px-3 py-1 rounded">Edit</Link>
                <button onClick={() => remove(r._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}