/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Center, Table, AppShell, Title, Button } from "@mantine/core";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { ObjectId } from "bson";
import "../css/UsersPage.css";

/**
 * UsersPage for Admin user to view all User Information
 * @returns UsersPage
 */
const UsersPage = () => {
  /** Navigation */
  const navigate = useNavigate();

  /** UseStates */
  const [userInfo, setUserInfo] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  /** Table Headers */
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

  /**
   * Gets all users info
   * @returns user info
   */
  const getAllUserInfo = async () => {
    const response = await fetch("/user/allUserInfo", {
      method: "GET",
    });
    return await response.json();
  };

  /** Table rows with user information */
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

  /**
   * Deletes a user from the database
   * @param userId of user to be deleted
   */
  const deleteUser = async (userId) => {
    let allUserInfo = userInfo.filter((user) => user._id !== userId);
    setUserInfo(allUserInfo);

    await fetch(`/user/deleteUser`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: ObjectId(userId),
      }),
    });
  };

  /** UseEffect */
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
    <AppShell navbar={<SideBar activePage='USERS' />}>
      <Center>
        <Title className='title'>Admin View: Users Table</Title>
      </Center>
      <div id='container'>
        <Table
          className='users-table'
          withBorder
          withColumnBorders
          highlightOnHover
          fontSize='md'
        >
          <thead>{tableHeaders}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </AppShell>
  );
};

export default UsersPage;
