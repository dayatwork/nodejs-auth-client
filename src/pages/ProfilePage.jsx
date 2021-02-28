import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import { AuthContext } from "../context/authContext";

const ProfilePage = () => {
  const auth = useContext(AuthContext);
  const [isSetPasswordFormOpen, setIsSetPasswordFormOpen] = useState(false);
  const [password, setPassword] = useState("");

  const handleSetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("/api/v1/auth/set-password", { password });
      setPassword("");
      setIsSetPasswordFormOpen(false);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      await auth.refetchUser();
    }
  };

  if (!auth.user) {
    return (
      <p className="bg-gray-300 inline-block px-4 py-2 rounded-sm">
        Please{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          login
        </Link>{" "}
        to see your profile
      </p>
    );
  }

  return (
    <div>
      <h1 className="mb-10 text-2xl font-semibold">My Profile</h1>
      <div className="flex items-center bg-gray-50 max-w-sm p-6 rounded-md shadow-md">
        {auth.user.image_identity ? (
          <img
            src={auth.user.image_identity}
            alt={auth.user.name}
            className="rounded-full mr-5 w-24"
          />
        ) : (
          <div className="rounded-full mr-5 w-24 h-24 bg-gray-500"></div>
        )}
        <div>
          <div className="text-lg font-semibold">{auth.user.name}</div>
          <div className="text-sm text-indigo-500 font-semibold mb-1">
            {auth.user.email}
          </div>
          <div className="text-sm text-gray-500 font-semibold">
            Register on {auth.user.registration_date.split("T")[0]}
          </div>
        </div>
      </div>
      {auth.user.password === null && (
        <button
          onClick={() => setIsSetPasswordFormOpen((prev) => !prev)}
          className="mt-10 border border-indigo-600 text-indigo-600 px-4 py-1 font-semibold hover:bg-gray-50 rounded-sm"
        >
          {isSetPasswordFormOpen ? "Close Set Password" : "Set Password"}
        </button>
      )}
      {isSetPasswordFormOpen && (
        <form
          onSubmit={handleSetPassword}
          className="max-w-sm mt-4 bg-gray-50 shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-center">Set Password</h2>
          <p className="text-sm text-center text-gray-700 mb-4">
            Put new password for login with email and password
          </p>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-1 px-3 w-full mb-4"
          />
          <button className="bg-indigo-600 text-white px-3 py-1.5 w-full rounded-sm">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
