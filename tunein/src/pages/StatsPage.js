import React, { useEffect, useState } from "react";
import { Center, Table, AppShell, Title } from "@mantine/core";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import "../css/StatsPage.css";

const StatsPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  const tableHeaders = (
    <tr>
      <th>User</th>
      <th>Date Joined</th>
      <th>Posts Made</th>
      <th>Favourite Genre</th>
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
        <td>{user.dateJoined}</td>
        <td>{user.daysPosted}</td>
        <td>{user.favoriteGenre}</td>
      </tr>
    ));

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    if (!JSON.parse(localStorage.getItem("user")).isAdmin) {
      navigate("/home");
    }
    getAllUserInfo().then((data) => {
      setUserInfo(data);
      console.log(data);
    });
  }, []);

  return (
    <AppShell navbar={<SideBar activePage="STATS" />}>
      <Center>
        <Title className="title">Admin View: Statistics Table</Title>
      </Center>
      <div id="container">
        <Table
          className="stats-table"
          withBorder
          withColumnBorders
          highlightOnHover
          fontSize="md"
        >
          <thead>{tableHeaders}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </AppShell>
  );
};

export default StatsPage;
