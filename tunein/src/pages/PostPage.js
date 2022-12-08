import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { AppShell } from "@mantine/core";

const PostPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (!loggedInUser) {
      navigate("/");
    }
  }, []);
  return <AppShell navbar={<SideBar activePage='POST' />}></AppShell>;
};

export default PostPage;
