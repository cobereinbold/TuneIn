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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUpload, IconHeart, IconDots } from "@tabler/icons";
import SideBar from "../components/SideBar";
import { ObjectId } from "bson";
import "../css/AccountPage.css";

/**
 * Default song for palceholder info
 */
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

/**
 * Account Page with User's info and Past posts
 * @returns AccountPage
 */
const AccountPage = () => {
  /** Navigation */
  const navigate = useNavigate();

  /** Use States */
  const [user, setUser] = useState({});
  const [previousPosts, setPreviousPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(defaultSong);
  const [editModalOpen, setEditModalOpen] = useState(false);

  /** Edit account form */
  const accountForm = useForm({
    initialValues: {
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      password: "",
      profilePicture: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (value) => (value === "" ? "Mandatory field" : null),
      firstName: (value) => (value === "" ? "Mandatory field" : null),
      lastName: (value) => (value === "" ? "Mandatory field" : null),
      password: (value) => (value === "" ? "Mandatory field" : null),
    },
  });

  /** Use Effect */
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (!loggedInUser) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(localStorage.getItem("user")));
    if (JSON.parse(localStorage.getItem("user")).isAdmin) {
      navigate("/users");
    }
    getPreviousPosts(JSON.parse(localStorage.getItem("user"))._id);
  }, []);

  /**
   * Updates the account information
   * @param values from the form
   */
  const updateAccount = (values) => {
    fetch(`/user/updateUser`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: ObjectId(user._id),
        username: values.username,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        profilePicture: "",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("success");
        } else {
          console.log(response.status);
        }
      })
      .then((user) => {
        localStorage.removeItem("user");
        localStorage.setItem("user", {
          ...user,
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          profilePicture: "",
        });
      });
  };

  /**
   * Get user's previous posts
   * @param userId
   */
  const getPreviousPosts = (userId) => {
    fetch(`/post/getAllPostsById/`, {
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

  return (
    <AppShell navbar={<SideBar activePage='ACCOUNT' />}>
      <Center>
        <Image
          src={
            user.profilePicture
              ? user.profilePicture
              : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
          }
          width={200}
          height={200}
          radius='100%'
          withPlaceholder
        />
      </Center>
      <Space h='lg' />
      <Center>
        <Stack>
          <Button onClick={() => setEditModalOpen(true)}>Edit Profile</Button>
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
      >
        <Box sx={{ maxWidth: 400 }} mx='auto'>
          <form
            onSubmit={accountForm.onSubmit((values) => updateAccount(values))}
          >
            <TextInput
              withAsterisk
              label='Email'
              placeholder='you@gmail.com'
              {...accountForm.getInputProps("email")}
            ></TextInput>
            <Space h='lg' />
            <TextInput
              withAsterisk
              label='Username'
              placeholder='JohnSmith'
              {...accountForm.getInputProps("username")}
            ></TextInput>
            <Space h='lg' />
            <TextInput
              withAsterisk
              label='First Name'
              placeholder='John'
              {...accountForm.getInputProps("firstName")}
            ></TextInput>
            <Space h='lg' />
            <TextInput
              withAsterisk
              label='Last Name'
              placeholder='Smith'
              {...accountForm.getInputProps("lastName")}
            ></TextInput>
            <Space h='lg' />
            <PasswordInput
              withAsterisk
              label='Password'
              placeholder='Password'
              {...accountForm.getInputProps("password")}
            />
            <Space h='lg' />
            <FileInput
              label='Profile Picture'
              placeholder='Profile Picture'
              icon={<IconUpload size={14} />}
              accept='image/png,image/jpeg'
            />
            <Space h='xl' />
            <Center>
              <Button type='submit'>Update Info</Button>
            </Center>
          </form>
        </Box>
      </Modal>
    </AppShell>
  );
};

export default AccountPage;
