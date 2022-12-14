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
  Drawer,
  Burger,
  Center,
} from "@mantine/core";
import {
  IconHome2,
  IconPlus,
  IconChevronRight,
  IconChevronLeft,
  IconClipboardList,
  IconUsers,
  IconSearch,
} from "@tabler/icons";
import "../css/SideBar.css";

/**
 * Sidebar for the application
 * @param activePage to set the colour of the active page to black
 * @returns Sidebar
 */
const SideBar = (props) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(props.activePage);
  const [user, setUser] = useState({});
  const [drawerOpened, setDrawerOpened] = useState(false);

  /**
   * Logs user out of application
   */
  const logout = () => {
    fetch("/user/logout/", {
      method: "POST",
    }).then((response) => {
      localStorage.removeItem("user");
      localStorage.removeItem("authenticated");
      navigate("/");
    });
  };

  /**
   * Use Effect
   */
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <>
      <Burger
        className='burger'
        color='white'
        onClick={() => setDrawerOpened((open) => !open)}
      />
      <Drawer
        opened={drawerOpened}
        withCloseButton={false}
        onClose={() => setDrawerOpened((o) => !o)}
      >
        <Navbar p='xs' className='sidebar'>
          <Navbar.Section>
            <Burger onClick={() => setDrawerOpened((o) => !o)} />
            <Center>
              <Title color='white'>TuneIn</Title>
            </Center>
          </Navbar.Section>
          <Navbar.Section grow mt='md'>
            {!user.isAdmin ? ( // only render the button if user.isAdmin is false
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
            ) : null}
            {user.isAdmin ? (
              <>
                <Space h='xl' />
                <Button
                  variant='subtle'
                  leftIcon={<IconUsers size={50} />}
                  size='xl'
                  color={activePage === "USERS" ? "spBlack" : "white"}
                  onClick={() => {
                    navigate("/users");
                  }}
                  fullWidth
                >
                  USERS
                </Button>
              </>
            ) : null}
            {user.isAdmin ? (
              <>
                <Space h='xl' />
                <Button
                  variant='subtle'
                  leftIcon={<IconClipboardList size={50} />}
                  size='xl'
                  color={activePage === "STATS" ? "spBlack" : "white"}
                  onClick={() => {
                    navigate("/stats");
                  }}
                  fullWidth
                >
                  STATS
                </Button>
              </>
            ) : null}
            {!user.isAdmin ? (
              <>
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
              </>
            ) : null}
            {!user.isAdmin ? (
              <>
                <Space h='xl' />
                <Button
                  variant='subtle'
                  leftIcon={<IconSearch size={50} />}
                  size='xl'
                  color={activePage === "SEARCH" ? "spBlack" : "white"}
                  onClick={() => {
                    navigate("/search");
                  }}
                  fullWidth
                >
                  SEARCH
                </Button>
              </>
            ) : null}
          </Navbar.Section>
          <Navbar.Section>
            <Box
              sx={{
                paddingTop: theme.spacing.sm,
              }}
            >
              {!user.isAdmin ? (
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
              ) : null}
              <Space h='sm' />
              <Center>
                <Button
                  sx={{
                    flex: 1,
                    backgroundColor: "rgb(245, 66, 66, 0.8)",
                    color: "white",
                  }}
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </Center>
            </Box>
          </Navbar.Section>
        </Navbar>
      </Drawer>
    </>
  );
};

export default SideBar;
