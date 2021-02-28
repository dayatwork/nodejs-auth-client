import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto pt-8 2xl:pt-20">{children}</main>
    </>
  );
};

export default Layout;
