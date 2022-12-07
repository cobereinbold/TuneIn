import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (!loggedInUser) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div>HomePage</div>
    </>
  );
};

export default HomePage;
