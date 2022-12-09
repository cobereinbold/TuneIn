import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import {
  AppShell,
  Button,
  LoadingOverlay,
  SimpleGrid,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import SongCard from "../components/SongCard";

const PostPage = () => {
  const navigate = useNavigate();

  const CLIENT_ID = "bc464b8bf4854f15be027a9a077683f3";
  const CLIENT_SECRET = "5e0dc7042cab4e2b8dea438466aaab4f";

  const [token, setToken] = useState();
  const [searched, setSearched] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [posted, setPosted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    let today = new Date();
    today = today.toDateString();

    let token = "";
    if (!loggedInUser) {
      navigate("/");
    }

    if (today === JSON.parse(localStorage.getItem("user")).posted) {
      setPosted(true);
      setLoading(false);
    } else {
      const authParams = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "grant_type=client_credentials&client_id=" +
          CLIENT_ID +
          "&client_secret=" +
          CLIENT_SECRET,
      };
      fetch("https://accounts.spotify.com/api/token", authParams)
        .then((result) => result.json())
        .then((data) => {
          setToken(data.access_token);
          token = data.access_token;
          loadTop20(data.access_token);
        });
    }
  }, []);

  async function loadTop20(authToken = token) {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    await fetch(
      "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=20",
      params
    )
      .then((response) => {
        return response.json();
      })
      .then(({ items }) => {
        let res = [];
        items.map((item) => {
          res.push({
            id: item.track.id,
            name: item.track.name,
            artist: item.track.artists,
            spotifyLink: item.track.external_urls.spotify,
            image: item.track.album.images[0].url,
            previewUrl: item.track.preview_url,
          });
        });
        setSearchResults(res);
        setLoading(false);
      });
  }

  async function search(query) {
    const fetchURL = encodeURI(`q=${query}`);
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await fetch(
      `https://api.spotify.com/v1/search?${fetchURL}&type=track&limit=20`,
      params
    )
      .then((response) => {
        return response.json();
      })
      .then(({ tracks }) => {
        let res = [];
        tracks.items.map((item) => {
          console.log(item.artists);
          res.push({
            id: item.id,
            name: item.name,
            artist: item.artists,
            spotifyLink: item.external_urls.spotify,
            image: item.album.images[0].url,
            previewUrl: item.preview_url,
          });
        });
        setSearchResults(res);
      });
  }

  return (
    <AppShell navbar={<SideBar activePage='POST' />}>
      {<LoadingOverlay visible={loading} overlayOpacity={1}></LoadingOverlay>}
      {!posted && (
        <>
          <Title order={1}>Search for a Song</Title>
          <TextInput
            value={searchVal}
            onChange={(e) => setSearchVal(e.currentTarget.value)}
            label='Search'
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                search(searchVal);
                setSearched(true);
              }
            }}
          />
          <Space h='md' />
          <Button
            onClick={() => {
              if (searchVal === "") {
                loadTop20();
                setSearched(false);
              } else {
                search(searchVal);
                setSearched(true);
              }
            }}
          >
            Search
          </Button>
          <Space h='lg' />
          {!searched && (
            <Title order={3} ta='center'>
              Top 20 Global Tracks
            </Title>
          )}
          {searched && (
            <Title order={3} ta='center'>
              {`Top 20 Search Results for: "${searchVal}"`}
            </Title>
          )}
          <Space h='md' />
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
            {searchResults.map((song) => {
              return <SongCard {...song} />;
            })}
          </SimpleGrid>
        </>
      )}
      {posted && (
        <Title order={1}>
          You've already posted today, come back tomorrow!
        </Title>
      )}
    </AppShell>
  );
};

export default PostPage;
