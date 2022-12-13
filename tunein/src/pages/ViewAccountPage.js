import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppShell,
  Center,
  Image,
  Space,
  Stack,
  Title,
  Text,
  SimpleGrid,
  Modal,
  Box,
  PasswordInput,
  TextInput,
  FileInput,
  Button,
  Group,
  Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUpload, IconHeart, IconDots } from "@tabler/icons";
import SideBar from "../components/SideBar";
import { ObjectId } from "bson";
import "../css/AccountPage.css";

let defaultSong = {
  songInfo: {
    song: "",
    artist: "",
    spotifyLink: "",
    songImage: "",
  },
  likes: {},
  comments: [
    {
      userName: "billy",
      comment: "cool",
    },
    {
      userName: "thomas",
      comment: "I hate this song.",
    },
  ],
};

const AccountPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [previousPosts, setPreviousPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(defaultSong);

  const viewuserId = localStorage.getItem("viewuser");

  const [editModalOpen, setEditModalOpen] = useState(false);

  /** TODO: Function to get user's previous posts */
  const getPreviousPosts = (userId) => {
    fetch(`http://localhost:5000/post/getAllPostsById/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: ObjectId(userId),
      }),
    })
      .then((response) => response.json())
      .then((posts) => {
        let res = [];
        posts.map((post) => {
          res.push({
            date: post.date,
            songInfo: post.songInfo,
            caption: post.caption,
            likes: post.likes,
            comments: post.comments,
          });
        });
        setPreviousPosts(res.reverse());
      });
  };

  const setUserInfo = (userId) => {
    fetch(`http://localhost:5000/user/userInfoById/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: ObjectId(userId),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data[0]);
      });
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")).isAdmin) {
      navigate("/users");
    }
    setUserInfo(viewuserId);
    getPreviousPosts(viewuserId);
  }, []);

  return (
    <AppShell navbar={<SideBar activePage='SEARCH' />}>
      <Center>
        <Image
          src={
            user.profilePicture
              ? user.profilePicture
              : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
          }
          width={200}
          height={200}
          radius='50%'
          withPlaceholder
        />
      </Center>
      <Space h='lg' />
      <Center>
        <Stack>
          <Title ta='center' order={1}>
            {"@" + user.username}
          </Title>
          <Title ta='center' order={2}>
            {user.firstName + " " + user.lastName}
          </Title>
          <Title ta='center' order={3}>
            Favourite Genre: {user.favoriteGenre}
          </Title>
          <Title ta='center' order={3}>
            Joined: {user.dateJoined}
          </Title>
        </Stack>
      </Center>
      <Space h='lg' />
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
          {previousPosts.map((post) => {
            return (
              <Image
                src={post.songInfo.songImage}
                width={300}
                height={300}
                onClick={() => {
                  setModalOpen(true);
                  setSelectedPost(post);
                }}
                className='image'
              />
            );
          })}
        </SimpleGrid>
      </Center>
      <Modal
        centered
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedPost == null ? "" : selectedPost.date}
      >
        <Center>
          <Image
            src={selectedPost.songInfo.songImage}
            height={400}
            width={400}
            onClick={() =>
              window.open(selectedPost.songInfo.spotifyLink, "_black")
            }
          ></Image>
        </Center>
        <Space h='md' />
        <Title order={3} ta='center'>
          {selectedPost.songInfo.song + ": " + selectedPost.songInfo.artist}
        </Title>
        <Text fz='md' ta='center' color='spGreen'>
          {selectedPost.caption}
        </Text>
        <Group spacing='none' position='center'>
          <IconHeart size={20} fill={"red"} color='red' />
          <Text>{selectedPost.likes.count + " Likes"}</Text>
          <Space w='lg' />
          <IconDots size={20} color='white' />
          <Text>{selectedPost.comments.length + " Comments"}</Text>
        </Group>
      </Modal>
      <Modal
        centered
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title='Edit Account'
      ></Modal>
    </AppShell>
  );
};

export default AccountPage;
