import React, { useState } from "react";
import {
  Card,
  Image,
  Text,
  Modal,
  TextInput,
  Button,
  Center,
  Space,
  Group,
} from "@mantine/core";
import SpotifyButton from "./SpotifyButton";
import "../css/SongCard.css";

const SongCard = ({ id, name, artist, spotifyLink, image, previewUrl }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [caption, setCaption] = useState("");

  const getArtistNames = () => {
    if (artist.length == 1) {
      return artist[0].name;
    } else {
      let result = "";
      for (let i = 0; i < artist.length; i++) {
        if (i === 0) {
          result = artist[i].name;
        } else {
          result += ", ";
          result += artist[i].name;
        }
      }
      return result;
    }
  };

  return (
    <>
      <Card onClick={() => setModalOpen(true)} className='song-card'>
        <Card.Section>
          <Image src={image} alt={name} height={160} />
          <Text fz='lg'>{name + ": " + getArtistNames()}</Text>
        </Card.Section>
      </Card>
      <Modal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setCaption("");
        }}
        title={"Select this song"}
        centered
      >
        <Center>
          <Image src={image} height={300} width={300} />
        </Center>
        <Space h='sm' />
        {previewUrl && (
          <Center>
            <audio controls='controls'>
              <source src={previewUrl} type='audio/mpeg' />
            </audio>
          </Center>
        )}
        {!previewUrl && (
          <div>
            <SpotifyButton link={spotifyLink} />
          </div>
        )}
        <Space h='sm' />
        <Group spacing='none' position='center'>
          <Text color='spGreen' ta='center'>
            Song Name:{" "}
          </Text>
          <Text ta='center'>{name}</Text>
        </Group>
        <Group spacing='none' position='center'>
          <Text color='spGreen'>Song Artist: </Text>
          <Text>{getArtistNames()}</Text>
        </Group>
        <TextInput
          label='Caption'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></TextInput>
        <Space h='md' />
        <Center>
          <Button disabled={caption === "" ? true : false}>Post</Button>
        </Center>
      </Modal>
    </>
  );
};

export default SongCard;
