import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, AppShell } from "@mantine/core";
import SideBar from "../components/SideBar";
import Post from "../components/Post";
import songImage1 from "../images/midnights.jpeg";
import songImage2 from "../images/herloss.jpeg";

const posts = [
  {
    user: {
      id: "1",
      username: "Benjamin",
      profilePicture: "",
    },
    songInfo: {
      song: "Anti-Hero",
      artist: "Taylor Swift",
      songLink:
        "https://open.spotify.com/track/0V3wPSX9ygBnCm8psDIegu?si=f8bdfd471fb44fdf",
      songImage: songImage1,
    },
    likes: {
      count: 12,
      users: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    caption: "LOVING THIS NEW ALBUM!",
    comments: [
      {
        username: "billy",
        comment: "cool",
      },
      {
        username: "thomas",
        comment: "I hate this song.",
      },
    ],
  },
  {
    user: {
      id: "2",
      username: "Timothy",
      profilePicture: "",
    },
    songInfo: {
      song: "Rich Flex",
      artist: "Drake ft. 21 Savage",
      songLink:
        "https://open.spotify.com/track/1bDbXMyjaUIooNwFE9wn0N?si=b68ca04005034725",
      songImage: songImage2,
    },
    likes: {
      count: 5,
      users: [6, 7, 8, 9, 10],
    },
    caption: "21 can you do sum for me?",
    comments: [
      {
        username: "billy",
        comment: "cool",
      },
      {
        username: "thomas",
        comment: "I hate this song.",
      },
    ],
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [dailyPosts, setDailyPosts] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
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
        setDailyPosts(posts.reverse());
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
