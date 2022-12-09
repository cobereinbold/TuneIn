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
} from "@mantine/core";
import React, { useState } from "react";
import { IconHeart } from "@tabler/icons";
import "../css/Post.css";
import SpotifyButton from "./SpotifyButton";

const Post = ({ user, songInfo, likes, caption, comments }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const [comment, setComment] = useState("");

  const commentOnPost = () => {};

  const likePost = () => {};

  return (
    <>
      <Container>
        <Group className='username'>
          <Avatar src={user.profilePicture} alt={user.username} radius='xl' />
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
          <IconHeart size={20} fill={"red"} color='red' />
          <Text>{likes.count + " Likes"}</Text>
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
    </>
  );
};

export default Post;
