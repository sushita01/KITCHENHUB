import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../context/api";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/v1/recipes")
      .then(res => res.data.success && setRecipes(res.data.recipes))
      .catch(err => console.log("Failed to fetch recipes:", err.message));
  }, []);

  const filteredRecipes = recipes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.ingredients.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-6"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map(r => (
          <div key={r._id} className="bg-white rounded-xl shadow p-4">
            <img
              src={r.image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352"}
              alt={r.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="mt-2 font-bold text-lg">{r.title}</h2>
            <p className="text-gray-600 line-clamp-2">{r.ingredients}</p>
            <Link
              to={`/recipe/${r._id}`}
              className="mt-2 inline-block bg-purple-600 text-white py-1 px-3 rounded"
            >
              View Recipe
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}