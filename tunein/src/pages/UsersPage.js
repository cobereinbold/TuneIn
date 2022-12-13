import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import {
  AppShell,
  Button,
  List,
  Space,
  TextInput,
  Title,
  Text,
} from "@mantine/core";

const UsersPage = () => {
    const navigate = useNavigate();
    const [searchVal, setSearchVal] = useState("");
    const [current_user_list, setUsers] = useState([]);

    async function loadSomeUsers() {
        fetch(`http://localhost:5000/user/getSomeUsers`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then((result) => result.json())
        .then((data) => {
            let list = [];
            for (let index in data){
                list.push({
                    username: data[index].username,
                    firstName: data[index].firstName,
                    lastName: data[index].lastName,
                    profilePicture: data[index].profilePicture,
                });
            }
            setUsers(list);
            console.log(list);
        })
        .catch((err) => console.log(err));
    }

    async function search(value) {
        fetch(`http://localhost:5000/user/searchUser`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: value,
            }),
        })
        .then((result) => result.json())
        .then((data) => {
            let list = [];
            for (let index in data){
                list.push({
                    username: data[index].username,
                    firstName: data[index].firstName,
                    lastName: data[index].lastName,
                    profilePicture: data[index].profilePicture,
                });
            }
            setUsers(list);
            console.log(list);
        })
        .catch((err) => console.log(err));
    }
  
    return (
        <AppShell navbar={<SideBar activePage='USERS' />}>
          <Title order={1}>Search for a User</Title>
          <TextInput
            value={searchVal}
            onChange={(e) => setSearchVal(e.currentTarget.value)}
            label='Search'
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                search(searchVal);
              }
            }}
          />
          <Space h='md' />
          <Button
            onClick={() => {
              if (searchVal === "") {
                loadSomeUsers();
              } else {
                search(searchVal);
              }
            }}
          >
            Search
          </Button>
          <Space h='md' />
          <List>
            <List.Item></List.Item>
          </List>
        </AppShell>
      );
};
  
  export default UsersPage;
  