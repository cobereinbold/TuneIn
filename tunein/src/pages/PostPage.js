import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

const PostPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (!loggedInUser) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <SideBar activePage='POST' />
    </>
  );
};

export default PostPage;
