import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

const AccountPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (!loggedInUser) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <SideBar activePage='ACCOUNT' />
    </>
  );
};

export default AccountPage;
