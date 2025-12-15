import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../context/api";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const user = JSON.parse(localStorage.getItem("kitchenhub_user"));

  useEffect(() => {
    api.get(`/v1/recipes/${id}`)
      .then(res => res.data.success && setRecipe(res.data.recipe))
      .catch(err => console.log("Failed to fetch recipe:", err.message));
  }, [id]);

  const saveRecipe = async () => {
    if (!user) return alert("Please login to save recipes");
    try {
      await api.post("/v1/saved", { userId: user._id, recipeId: recipe._id });
      alert("Recipe saved!");
    } catch (err) {
      alert(err.response?.data?.message || "Already saved");
    }
  };

  if (!recipe) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <img src={recipe.image} alt={recipe.title} className="w-full h-96 object-cover rounded-xl" />
      <h1 className="text-3xl font-bold mt-4">{recipe.title}</h1>
      <h2 className="mt-4 font-semibold">Ingredients</h2>
      <p>{recipe.ingredients}</p>
      <h2 className="mt-4 font-semibold">Instructions</h2>
      <p>{recipe.instructions}</p>
      <button onClick={saveRecipe} className="mt-4 bg-purple-600 text-white py-2 px-4 rounded">Save Recipe</button>
    </div>
  );
}