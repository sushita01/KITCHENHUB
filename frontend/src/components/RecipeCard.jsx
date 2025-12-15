import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden hover:scale-105 transform transition-all duration-300 w-72">
      <img src={recipe.image || "https://via.placeholder.com/300"} alt={recipe.title} className="h-48 w-full object-cover"/>
      <div className="p-5">
        <h3 className="text-primaryPurple font-bold text-xl mb-2">{recipe.title}</h3>
        <p className="text-gray-700 mb-4">{recipe.ingredients.substring(0, 60)}...</p>
        <Link to={`/recipe/${recipe._id}`} className="bg-primaryRed text-white px-4 py-2 rounded-lg hover:bg-primaryMaroon transition">View Recipe</Link>
      </div>
    </div>
  );
};

export default RecipeCard;
