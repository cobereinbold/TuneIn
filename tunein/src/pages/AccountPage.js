import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "@mantine/core";
import SideBar from "../components/SideBar";

const AccountPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (!loggedInUser) {
      navigate("/");
    }
  }, []);

  return <AppShell navbar={<SideBar activePage='ACCOUNT' />}></AppShell>;
};

export default AccountPage;
