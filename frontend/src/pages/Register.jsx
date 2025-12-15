import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await register(fullname, email, password, role);
    navigate("/");
  } catch (err) {
    // Show the actual error message from backend
    setError(err.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primaryPink to-primaryPurple">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-96 flex flex-col gap-5"
      >
        <h1 className="text-3xl font-bold text-primaryMaroon text-center">Register</h1>
        {error && <p className="text-red-600 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className="border-2 border-primaryRed rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border-2 border-primaryRed rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border-2 border-primaryRed rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border-2 border-primaryRed rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
        >
          <option value="user">User</option>
          <option value="admin">Chef/Admin</option> {/* value must be "admin" */}
        </select>

        <button className="bg-primaryRed text-white rounded-full py-2 hover:bg-primaryMaroon transition">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;