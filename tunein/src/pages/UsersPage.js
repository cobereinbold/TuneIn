import React, { useEffect, useState } from "react";
import { Center, Table, AppShell, Title, Button } from "@mantine/core";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { ObjectId } from "bson";
import "../css/UsersPage.css";

const UsersPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();
  const tableHeaders = (
    <tr>
      <th>User</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Date Joined</th>
      <th>Password (Encrypted)</th>
      <th>Delete a User</th>
    </tr>
  );

  const getAllUserInfo = async () => {
    const response = await fetch("/user/allUserInfo", {
      method: "GET",
    });
    return await response.json();
  };

  const rows =
    userInfo &&
    userInfo.map((user) => (
      <tr key={user._id}>
        <td>{user.username}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.dateJoined}</td>
        <td>{user.password}</td>
        <td>
          <Button onClick={() => deleteUser(user._id)}>Delete</Button>
        </td>
      </tr>
    ));

  const deleteUser = async (userId) => {
    // update the userInfo state variable
    let allUserInfo = userInfo.filter((user) => user._id !== userId);
    setUserInfo(allUserInfo);

    // send the DELETE request
    await fetch(`/user/deleteUser`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: ObjectId(userId),
      }),
    });
  };

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    if (!JSON.parse(localStorage.getItem("user")).isAdmin) {
      navigate("/home");
    }
    getAllUserInfo().then((data) => {
      setUserInfo(data);
    });
  }, []);

  return (
    <AppShell navbar={<SideBar activePage="USERS" />}>
      <Center>
        <Title className="title">Admin View: Users Table</Title>
      </Center>
      <Center>
        <Table
          className="users-table"
          withBorder
          withColumnBorders
          highlightOnHover
          fontSize="md"
        >
          <thead>{tableHeaders}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </Center>
    </AppShell>
  );
};

export default UsersPage;
