import { useEffect, useState } from "react";
import api from "../context/api";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("kitchenhub_user"));
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    if (!user) return;
    api.get(`/v1/saved/user/${user._id}`)
      .then(res => res.data.success && setSaved(res.data.saved))
      .catch(err => console.log(err));
  }, [user]);

  const remove = async id => {
    await api.delete(`/v1/saved/${id}`);
    setSaved(saved.filter(s => s._id !== id));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Saved Recipes</h1>
      {saved.length === 0 ? <p>No saved recipes</p> : (
        saved.map(s => (
          <div key={s._id} className="bg-white p-4 mb-2 rounded shadow flex justify-between items-center">
            <span>{s.recipe.title}</span>
            <button onClick={() => remove(s._id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
          </div>
        ))
      )}
    </div>
  );
}