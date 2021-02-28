import React, { useState, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import googleLogo from "../assets/icons/google.svg";
import facebookLogo from "../assets/icons/facebook.svg";
import githubLogo from "../assets/icons/github.svg";
import { AuthContext } from "../context/authContext";

const LoginPage = () => {
  const history = useHistory();
  const [cookies] = useCookies(["userInfo"]);

  const emailRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  // if (cookies.userInfo) {
  //   history.push("/");
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });
      console.log("login", res);
      auth.setAuthUser(res.data.user);
      toast.success("Logged in");
      history.push("/profile");
    } catch (error) {
      console.log("error", error);
      console.log("error2", error.response.data);
      emailRef.current.focus();
      toast.error(error.response.data.error);
    }
  };

  const loginWithGoogle = async () => {
    const href = "/api/v1/auth/google";
    window.location = href;
  };

  const loginWithFacebook = async () => {
    const href = "/api/v1/auth/facebook";
    window.location = href;
  };

  const loginWithGithub = async () => {
    const href = "/api/v1/auth/github";
    window.location = href;
  };

  return (
    <div>
      <div className="bg-gray-50 p-10 shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-3">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              className="border rounded-md py-1.5 px-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="border rounded-md py-1.5 px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bg-indigo-600 text-white w-full block py-1.5 rounded-md mt-4 hover:bg-indigo-500 transition">
            Login
          </button>
          <div className="text-sm font-semibold text-gray-600 mt-1.5">
            No account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Create one!
            </Link>
          </div>
        </form>
        <div className="text-gray-600 text-center my-6 text-sm">
          Or continue with
        </div>
        <div className="flex flex-col">
          <button
            onClick={loginWithGoogle}
            className="bg-red-500 hover:bg-red-400 transition text-white py-1.5 rounded-md mb-2 flex items-center justify-center"
          >
            <img src={googleLogo} alt="google logo" className="w-4" />
            <span className="pl-2">Continue with Google</span>
          </button>
          <button
            onClick={loginWithFacebook}
            className="bg-blue-600 hover:bg-blue-500 transition text-white py-1.5 rounded-md mb-2 flex items-center justify-center"
          >
            <img src={facebookLogo} alt="facebook logo" className="w-4" />
            <span className="pl-2">Continue with Facebook</span>
          </button>
          <button
            onClick={loginWithGithub}
            className="bg-gray-800 hover:bg-gray-700 transition text-white py-1.5 rounded-md mb-2 flex items-center justify-center"
          >
            <img src={githubLogo} alt="github logo" className="w-4" />
            <span className="pl-2">Continue with Github</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
