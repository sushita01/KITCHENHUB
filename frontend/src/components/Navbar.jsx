import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-purple-700 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">KitchenHub</Link>

      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>

        {user?.role === "admin" && (
          <>
            <Link to="/admin">My Recipes</Link>
            <Link to="/add-recipe">Add Recipe</Link>
          </>
        )}

        {user?.role === "user" && <Link to="/dashboard">My Saved Recipes</Link>}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        )}
      </div>
    </nav>
  );
}