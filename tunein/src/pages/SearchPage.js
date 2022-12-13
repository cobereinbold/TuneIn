import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import {
  AppShell,
  Button,
  Card,
  Center,
  Grid,
  Image,
  List,
  SimpleGrid,
  Select,
  Space,
  TextInput,
  Title,
  Text,
} from "@mantine/core";

const SearchPage = () => {
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
        for (let index in data) {
          if (data[index].username === "adminuser") continue;
          list.push({
            userId: data[index]._id,
            username: data[index].username,
            firstName: data[index].firstName,
            lastName: data[index].lastName,
            profilePicture: data[index].profilePicture,
          });
        }
        setUsers(list);
        console.log(current_user_list);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")).isAdmin) {
      navigate("/users");
      }
  }
    async function loadSomeUsers() {
        fetch(`/user/getSomeUsers`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then((result) => result.json())
        .then((data) => {
            let list = [];
            for (let index in data){
                if(data[index].username === "adminuser")
                    continue;
                list.push({
                    userId: data[index]._id,
                    username: data[index].username,
                    firstName: data[index].firstName,
                    lastName: data[index].lastName,
                    profilePicture: data[index].profilePicture,
                });
            }
            setUsers(list);
            console.log(current_user_list);
        })
        .catch((err) => console.log(err));
    }

    async function search(value) {
        fetch(`/user/searchUser`, {
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
                    userId: data[index]._id,
                    username: data[index].username,
                    firstName: data[index].firstName,
                    lastName: data[index].lastName,
                    profilePicture: data[index].profilePicture,
                });
            }
            setUsers(list);
            console.log(current_user_list);
        })
        .catch((err) => console.log(err));
    }
    loadSomeUsers();
  }, []);

  return (
    <AppShell navbar={<SideBar activePage='SEARCH' />}>
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
      <Center>
        <SimpleGrid
          cols={4}
          spacing='xl'
          breakpoints={[
            { maxWidth: 1800, cols: 4, spacing: "xl" },
            { maxWidth: 1500, cols: 3, spacing: "xl" },
            { maxWidth: 1200, cols: 2, spacing: "lg" },
            { maxWidth: 900, cols: 1, spacing: "sm" },
          ]}
        >
          {current_user_list.map((user) => {
            return (
              <Card
                shadow='sm'
                p='xl'
                component='a'
                target='_blank'
                onClick={() => {
                  localStorage.setItem("viewuser", user.userId);
                  navigate("/viewaccount");
                }}
              >
                <Card.Section>
                  <Image
                    src={
                      user.profilePicture
                        ? user.profilePicture
                        : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                    }
                    height={160}
                  />
                </Card.Section>

                <Text weight={500} size='lg' mt='md'>
                  @{user.username}
                </Text>

                <Text mt='xs' color='dimmed' size='sm'>
                  {user.firstName} {user.lastName}
                </Text>
              </Card>
            );
          })}
        </SimpleGrid>
      </Center>
    </AppShell>
  );
};

export default SearchPage;
