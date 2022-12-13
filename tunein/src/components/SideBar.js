import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Navbar,
  Button,
  Title,
  Avatar,
  Group,
  useMantineTheme,
  Box,
  UnstyledButton,
  Space,
} from "@mantine/core";
import {
  IconHome2,
  IconPlus,
  IconChevronRight,
  IconChevronLeft,
  IconSearch,
} from "@tabler/icons";
import "../css/SideBar.css";

const SideBar = (props) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(props.activePage);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <Navbar height={"100vh"} p='xs' width={{ base: 300 }} className='sidebar'>
      <Navbar.Section>
        <Title order={1} color='white' ta='left'>
          TuneIn
        </Title>
      </Navbar.Section>
      <Navbar.Section grow mt='md'>
        <Button
          variant='subtle'
          leftIcon={<IconHome2 size={50} />}
          size='xl'
          color={activePage === "HOME" ? "spBlack" : "white"}
          onClick={() => {
            navigate("/home");
          }}
          fullWidth
        >
          HOME
        </Button>
        <Space h='xl' />
        <Button
          variant='subtle'
          leftIcon={<IconPlus size={50} />}
          size='xl'
          color={activePage === "POST" ? "spBlack" : "white"}
          onClick={() => {
            navigate("/post");
          }}
          fullWidth
        >
          POST
        </Button>
        <Space h='xl' />
        <Button
          variant='subtle'
          leftIcon={<IconSearch size={50} />}
          size='xl'
          color={activePage === "USERS" ? "spBlack" : "white"}
          onClick={() => {
            navigate("/users");
          }}
          fullWidth
        >
          USERS
        </Button>
      </Navbar.Section>
      <Navbar.Section>
        <Box
          sx={{
            paddingTop: theme.spacing.sm,
          }}
        >
          <UnstyledButton
            sx={{
              display: "block",
              width: "100%",
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color: theme.black,
              backgroundColor:
                activePage === "ACCOUNT" ? theme.colors.spGreen[7] : "",

              "&:hover": {
                backgroundColor: theme.colors.spGreen[7],
              },
            }}
            onClick={() => {
              navigate("/account");
            }}
          >
            <Group>
              <Avatar src={user.profilePicture} radius='xl' />
              <Box sx={{ flex: 1 }}>
                <Text size='sm' weight={500}>
                  {"@" + user.username}
                </Text>
                <Text color='white' size='xs'>
                  {user.firstName + " " + user.lastName}
                </Text>
              </Box>

              {theme.dir === "ltr" ? (
                <IconChevronRight size={18} />
              ) : (
                <IconChevronLeft size={18} />
              )}
            </Group>
          </UnstyledButton>
        </Box>
      </Navbar.Section>
    </Navbar>
  );
};

export default SideBar;
