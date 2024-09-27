import React, { useEffect, useState } from "react";
import axios from "axios";

const PlatformManager = () => {
  const [platforms, setPlatforms] = useState([]);
  const [newPlatform, setNewPlatform] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get("https://subscriptiontrack-1.onrender.com/api/platforms");
        setPlatforms(response.data);
      } catch (err) {
        console.error("Error fetching platforms:", err);
        setError("Failed to fetch platforms.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlatforms();
  }, []);

  const handleAddPlatform = async (e) => {
    e.preventDefault();
    if (!newPlatform) {
      setError("Platform name is required.");
      return;
    }

    if (platforms.includes(newPlatform)) {
      setError("Platform already exists.");
      return;
    }

    try {
      const response = await axios.post("https://subscriptiontrack-1.onrender.com/api/platforms", {
        name: newPlatform,
      });
      setPlatforms([...platforms, response.data.name]);
      setNewPlatform("");
      setError(null);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while adding the platform.");
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Popular Platforms</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <ul className="list-disc pl-5 mb-4">
        {platforms.map((platform) => (
          <li
            key={platform}
            className="text-gray-700 flex justify-between items-center mb-2"
          >
            <span>{platform}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddPlatform} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          value={newPlatform}
          onChange={(e) => setNewPlatform(e.target.value)}
          className="flex-grow border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new platform"
          required // Optional: add required attribute for validation
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default PlatformManager;
