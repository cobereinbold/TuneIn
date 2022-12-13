import React, { useEffect, useState } from "react";
import { Center, Table, AppShell, Title } from "@mantine/core";
import SideBar from "../components/SideBar";
import "../css/StatsPage.css";

const StatsPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const tableHeaders = (
    <tr>
      <th>User</th>
      <th>Date Joined</th>
      <th>Posts Made</th>
      <th>Favourite Genre</th>
    </tr>
  );

  const getAllUserInfo = async () => {
    const response = await fetch("http://localhost:5000/user/allUserInfo", {
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
    getAllUserInfo().then((data) => {
      setUserInfo(data);
    });
  }, []);

  return (
    <AppShell navbar={<SideBar activePage="STATS" />}>
      <Center>
        <Title className="title">Admin View: Statistics Table</Title>
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

export default StatsPage;
