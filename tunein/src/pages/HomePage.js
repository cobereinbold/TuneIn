import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (!loggedInUser) {
      navigate("/");
    } else {
      retrievePosts();
    }
  }, []);

  const retrievePosts = () => {};

  return (
    <>
      <SideBar activePage='HOME' />
    </>
  );
};

export default HomePage;
