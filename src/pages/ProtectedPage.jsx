import React, { useEffect, useState } from "react";
import axios from "axios";

const ProtectedPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/protect");
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="mt-20">
      <h1 className="text-center text-4xl font-bold">{data?.title}</h1>
      <p className="text-center font-semibold text-gray-600">{data?.message}</p>
    </div>
  );
};

export default ProtectedPage;
