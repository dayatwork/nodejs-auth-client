import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ProtectedPage = () => {
  const history = useHistory();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/protect");
        setData(res.data);
      } catch (error) {
        console.log(error);
        history.push("/");
      }
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
