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

const Post = ({ user, songInfo, likes, caption, comments }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <>
      <Container>
        <Group>
          <Avatar src={user.profilePicture} alt={user.userName} radius='xl' />
          <Text fz='lg'>{user.userName}</Text>
        </Group>
        <Space h='sm' />
        <Center>
          <Image
            src={songInfo.songImage}
            width={600}
            height={600}
            caption={songInfo.song + ": " + songInfo.artist}
            onClick={() => setModalOpen(true)}
          />
        </Center>
        <Group spacing='none'>
          <IconHeart size={20} fill={"red"} color='red' />
          <Text>{likes.count + " Likes"}</Text>
        </Group>
        <Group spacing='none' ta='left'>
          <Text fz='md' color='spGreen'>
            {user.userName + ":"}
          </Text>
          <Text fz='md' color='white'>
            {caption}
          </Text>
        </Group>
        <Text onClick={() => setCommentsOpen(true)}>View all comments...</Text>
      </Container>
      <Modal
        centered
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title='Listen on Spotify?'
      >
        <Center>
          <Button
            onClick={() => {
              window.open(songInfo.spotifyLink, "_blank");
              setModalOpen(false);
            }}
          >
            Go to Spotify
          </Button>
        </Center>
      </Modal>
      <Modal
        opened={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        title='Comments'
        centered
      >
        <Group spacing='none'>
          <Text color='spGreen'>{user.userName + ":"}</Text>
          <Text color='white'>{caption}</Text>
        </Group>
        {comments.map((comment) => {
          return (
            <>
              <Group spacing='none'>
                <Text color='spGreen'>{comment.userName + ":"}</Text>
                <Text>{comment.comment}</Text>
              </Group>
            </>
          );
        })}
        <Space h='md' />
        <TextInput label='Add a comment' placeholder='Comment'></TextInput>
      </Modal>
    </>
  );
};

export default Post;
