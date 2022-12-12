import {
  Avatar,
  Group,
  Text,
  Space,
  Image,
  Center,
  Container,
  Modal,
  Button,
  TextInput,
  Stack,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IconHeart } from "@tabler/icons";
import "../css/Post.css";
import SpotifyButton from "./SpotifyButton";
import { ObjectId } from "bson";

const Post = ({ _id, user, songInfo, likes, caption, comments }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [likesOpen, setLikesOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [currentUser, setUser] = useState({});
  const [postLikes, setPostLikes] = useState(likes.count);

  const commentOnPost = () => {};

  const likePost = () => {
    fetch("http://localhost:5000/post/likePost/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: ObjectId(_id),
        userId: ObjectId(currentUser._id),
        username: currentUser.username,
      }),
    }).then((response) => {
      if (response.status === 200) {
        setPostLikes(postLikes + 1);
      } else if (response.status === 501) {
        console.log("Already liked");
      }
    });
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <>
      <Container>
        <Group className='username'>
          <Avatar src={user.profilePic} alt={user.username} radius='xl' />
          <Text fz='lg'>{user.username}</Text>
        </Group>
        <Space h='sm' />
        <Center>
          <Image
            src={songInfo.songImage}
            width={600}
            height={600}
            caption={songInfo.song + ": " + songInfo.artist}
            onClick={() => setModalOpen(true)}
            className='song-image'
          />
        </Center>
        <Group spacing='none' className='likes'>
          <IconHeart
            size={20}
            fill={"red"}
            color='red'
            onClick={() => likePost()}
          />
          <Text onClick={() => setLikesOpen(true)}>{postLikes + " Likes"}</Text>
        </Group>
        <Group spacing='none' ta='left'>
          <Text fz='md' color='spGreen'>
            {user.username + ":"}
          </Text>
          <Text fz='md' color='white'>
            {caption}
          </Text>
        </Group>
        <Text onClick={() => setCommentsOpen(true)} className='comments'>
          View all comments...
        </Text>
      </Container>
      <Modal
        centered
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title='Listen on Spotify?'
      >
        <Center>
          <SpotifyButton link={songInfo.songLink} />
        </Center>
      </Modal>
      <Modal
        opened={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        title='Comments'
        centered
      >
        <Group spacing='none'>
          <Avatar src={user.profilePic}></Avatar>
          <Text color='spGreen'>{user.username + ":"}</Text>
          <Text color='white'>{caption}</Text>
        </Group>
        {comments.map((comment) => {
          return (
            <>
              <Group spacing='none'>
                <Text color='spGreen'>{comment.username + ":"}</Text>
                <Text>{comment.comment}</Text>
              </Group>
            </>
          );
        })}
        <Space h='md' />
        <TextInput
          label='Add a comment'
          placeholder='Comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></TextInput>
        <Space h='md' />
        <Group position='right'>
          <Button disabled={comment === "" ? true : false}>Send</Button>
        </Group>
      </Modal>
      <Modal
        opened={likesOpen}
        onClose={() => setLikesOpen(false)}
        centered
        title={"Likes: " + postLikes}
      >
        <Stack>
          {likes.users.map((user) => {
            return (
              <Group>
                <Text>{user}</Text>
                <Space w='xl' />
                <IconHeart size={20} fill='red' color='red' />
              </Group>
            );
          })}
        </Stack>
      </Modal>
    </>
  );
};

export default Post;
