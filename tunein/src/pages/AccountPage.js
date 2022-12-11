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
import slander from "../images/slander.jpeg";
import herLoss from "../images/herloss.jpeg";
import boslen from "../images/boslen.jpeg";
import lilUzi from "../images/lil-uzi.jpeg";
import takeCare from "../images/take-care.jpeg";
import tiesto from "../images/tiesto.jpeg";
import midnights from "../images/midnights.jpeg";
import metro from "../images/metro.jpeg";
import "../css/AccountPage.css";

let pastPosts = [
  {
    date: "Dec 4, 2022",
    songInfo: {
      song: "Love Is Gone",
      artist: "Slander ft. Dylan Matthew",
      spotifyLink:
        "https://open.spotify.com/track/39glqzRVRAy4vq3PqeTGb8?si=9f8074f5c4d241cd",
      songImage: slander,
    },
    caption: "LOVING THIS NEW ALBUM!",
    likes: {
      count: 14,
      users: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
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
  },
  {
    date: "Dec 3, 2022",
    songInfo: {
      song: "Take Care",
      artist: "Drake ft. Rihanna",
      spotifyLink:
        "https://open.spotify.com/track/124NFj84ppZ5pAxTuVQYCQ?si=93332ecd313a45c5",
      songImage: takeCare,
    },
    caption: "LOVING THIS NEW ALBUM!",
    likes: {
      count: 12,
      users: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
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
  },
  {
    date: "Dec 2, 2022",
    songInfo: {
      song: "The Motto",
      artist: "Tiesto, Ava Max",
      spotifyLink:
        "https://open.spotify.com/track/18asYwWugKjjsihZ0YvRxO?si=ff86c5c0959d4ae2",
      songImage: tiesto,
    },
    caption: "LOVING THIS NEW ALBUM!",
    likes: {
      count: 9,
      users: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
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
  },
  {
    date: "Dec 1, 2022",
    songInfo: {
      song: "Just Wanna Rock",
      artist: "Lil Uzi Vert",
      spotifyLink:
        "https://open.spotify.com/track/4FyesJzVpA39hbYvcseO2d?si=e72a3e0cb7954f2a",
      songImage: lilUzi,
    },
    caption: "LOVING THIS NEW ALBUM!",
    likes: {
      count: 7,
      users: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
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
  },
  {
    date: "Nov 30, 2022",
    songInfo: {
      song: "Rich Flex",
      artist: "Drake ft. 21 Savage",
      spotifyLink:
        "https://open.spotify.com/track/1bDbXMyjaUIooNwFE9wn0N?si=b68ca04005034725",
      songImage: herLoss,
    },
    caption: "LOVING THIS NEW ALBUM!",
    likes: {
      count: 2,
      users: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
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
  },
  {
    date: "Nov 19, 2022",
    songInfo: {
      song: "NIGHTFALL",
      artist: "Boslen ft. Dro Kenji",
      spotifyLink:
        "https://open.spotify.com/track/04EvAhYmelTjLIxWzK7JLm?si=d6f86c44f44d489b",
      songImage: boslen,
    },
    caption: "LOVING THIS NEW ALBUM!",
    likes: {
      count: 10,
      users: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
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
  },
  {
    date: "Nov 13, 2022",
    songInfo: {
      song: "Anti-Hero",
      artist: "Taylor Swift",
      spotifyLink:
        "https://open.spotify.com/track/0V3wPSX9ygBnCm8psDIegu?si=f8bdfd471fb44fdf",
      songImage: midnights,
    },
    caption: "LOVING THIS NEW ALBUM!",
    likes: {
      count: 5,
      users: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
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
  },
  {
    date: "Nov 11, 2022",
    songInfo: {
      song: "Metro Spider",
      artist: "Metro Boomin ft. Young Thug",
      spotifyLink:
        "https://open.spotify.com/track/2VtgzixdB967bHDNu5A1nh?si=4c885604efd744e2",
      songImage: metro,
    },
    caption: "LOVING THIS NEW ALBUM!",
    likes: {
      count: 1,
      users: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
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
  },
];

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

  const [editModalOpen, setEditModalOpen] = useState(false);
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

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (!loggedInUser) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(localStorage.getItem("user")));
    getPreviousPosts(JSON.parse(localStorage.getItem("user"))._id);
  }, []);

  const updateAccount = (values) => {
    fetch(`http://localhost:5000/post/getAllPostsById/`, {
      method: "POST",
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

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
    navigate("/");
  };

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
        setPreviousPosts(res);
      });
  };

  return (
    <AppShell navbar={<SideBar activePage='ACCOUNT' />}>
      <Grid>
        <Grid.Col span={3}>
          <Center>
            <Button onClick={() => setEditModalOpen(true)}>Edit Account</Button>
          </Center>
        </Grid.Col>
        <Grid.Col span={3} offset={6}>
          {/** Temp Logout TODO: Add option to logout from navbar*/}
          <Center>
            <Button onClick={() => logout()}>Logout</Button>
          </Center>
        </Grid.Col>
      </Grid>
      <Center>
        <Image
          src={user.profilePicture}
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
