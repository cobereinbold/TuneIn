import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, AppShell } from "@mantine/core";
import SideBar from "../components/SideBar";
import Post from "../components/Post";

const HomePage = () => {
  const navigate = useNavigate();
  const [dailyPosts, setDailyPosts] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (JSON.parse(localStorage.getItem("user")).isAdmin) {
      navigate("/users");
    }
    if (!loggedInUser) {
      navigate("/");
    } else {
      retrievePosts();
    }
  }, []);

  const retrievePosts = () => {
    fetch(`/post/getAllPosts/`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((posts) => {
        let date = new Date();
        let todaysPosts = posts.filter(
          (post) => post.date === date.toDateString()
        );
        setDailyPosts(todaysPosts.reverse());
      });
  };

  return (
    <AppShell navbar={<SideBar activePage="HOME" />}>
      <Stack justify="flex-start">
        {dailyPosts.map((post) => {
          return <Post {...post} />;
        })}
      </Stack>
    </AppShell>
  );
};

export default HomePage;
