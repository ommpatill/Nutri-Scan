import React, { useEffect, useState } from "react";
import axios from "../services/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setForm(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("/api/user/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setEdit(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-500 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-12">
      <div className="bg-white border border-blue-100 shadow-md rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Your Profile
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            readOnly={!edit}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            readOnly={!edit}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            readOnly={!edit}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEdit(false);
                  setForm(user);
                }}
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
