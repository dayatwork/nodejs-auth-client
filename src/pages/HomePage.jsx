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
      <div className="flex flex-col">
        <div className="text-gray-500 font-semibold mb-1.5">Repository</div>
        <a
          className="font-semibold text-sm underline mb-1"
          href="https://github.com/dayatdev/nodejs-auth-client"
          target="_blank"
        >
          https://github.com/dayatdev/nodejs-auth-client
        </a>
        <a
          className="font-semibold text-sm underline mb-1"
          href="https://github.com/dayatdev/nodejs-auth-server"
          target="_blank"
        >
          https://github.com/dayatdev/nodejs-auth-server
        </a>
      </div>
    </div>
  );
};

export default HomePage;
