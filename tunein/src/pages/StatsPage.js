/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Center, Table, AppShell, Title } from "@mantine/core";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import "../css/StatsPage.css";

/**
 * StatsPage for Admin users to view user statistics
 * @returns StatsPage
 */
const StatsPage = () => {
  /** Navigation */
  const navigate = useNavigate();

  /* UseStates */
  const [userInfo, setUserInfo] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  /** Table Headers */
  const tableHeaders = (
    <tr>
      <th>User</th>
      <th>Date Joined</th>
      <th>Posts Made</th>
      <th>Favourite Genre</th>
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

  /** Table rows with user statistics */
  const rows =
    userInfo &&
    userInfo.map((user) => (
      <tr key={user._id}>
        <td>{user.username}</td>
        <td>{user.dateJoined}</td>
        <td>{user.daysPosted}</td>
        <td>{user.favoriteGenre}</td>
      </tr>
    ));

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
    <AppShell navbar={<SideBar activePage='STATS' />}>
      <Center>
        <Title className='title'>Admin View: Statistics Table</Title>
      </Center>
      <div id='container'>
        <Table
          className='stats-table'
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

export default StatsPage;
