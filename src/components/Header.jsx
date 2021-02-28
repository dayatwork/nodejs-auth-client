import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const auth = useContext(AuthContext);

  const logout = async () => {
    await axios.get("/api/v1/auth/logout");
    auth.logout();
    toast.success("Logged out");
    history.push("/");
  };

  return (
    <header className="max-w-5xl mx-auto flex justify-between py-4">
      <div className="font-bold uppercase flex items-center">
        <Link to="/">
          NodeJS <span className="text-indigo-600">Auth</span>
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-10 items-center">
          <li>
            <Link
              to="/"
              className={`font-semibold hover:text-indigo-500 transition ${
                pathname === "/" ? "text-indigo-600" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`font-semibold hover:text-indigo-500 transition ${
                pathname.startsWith("/profile") ? "text-indigo-600" : ""
              }`}
            >
              Profile
            </Link>
          </li>
          {auth.user && (
            <li>
              <Link
                to="/protected"
                className={`font-semibold hover:text-indigo-500 transition ${
                  pathname.startsWith("/protected") ? "text-indigo-600" : ""
                }`}
              >
                Secret Page
              </Link>
            </li>
          )}
          {!auth.user ? (
            <li>
              <Link
                to="/login"
                className="font-semibold hover:bg-indigo-500 border border-transparent transition bg-indigo-600 px-4 py-2 rounded-sm text-white"
              >
                Login
              </Link>
            </li>
          ) : (
            <li>
              <a
                onClick={logout}
                className="cursor-pointer font-semibold hover:bg-gray-50 border border-indigo-600 transition px-4 py-2 rounded-sm text-indigo-600"
              >
                Logout
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
