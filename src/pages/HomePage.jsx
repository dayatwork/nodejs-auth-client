import React from "react";

const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mt-20 mb-10">Node.js Authentication</h1>
      <div className="text-gray-500 font-semibold">Feature: </div>
      <ul className="text-lg font-semibold">
        <li>Email and Password Login</li>
        <li>Google Login</li>
        <li>Facebook Login</li>
        <li>Github Login</li>
      </ul>
    </div>
  );
};

export default HomePage;
