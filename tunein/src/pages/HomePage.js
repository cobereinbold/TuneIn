/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, AppShell } from "@mantine/core";
import SideBar from "../components/SideBar";
import Post from "../components/Post";

/**
 * HomePage holding all the posts for the day
 * @returns HomePage
 */
const HomePage = () => {
  /** Navigation */
  const navigate = useNavigate();

  /** Use State */
  const [dailyPosts, setDailyPosts] = useState([]);

  /** Use Effect */
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

  /** Retrieves all posts from today */
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
    <AppShell navbar={<SideBar activePage='HOME' />}>
      <Stack justify='flex-start'>
        {dailyPosts.map((post) => {
          return <Post {...post} />;
        })}
      </Stack>
    </AppShell>
  );
};

export default HomePage;
