import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { AppShell, Button, Radio, Space, TextInput } from "@mantine/core";

const PostPage = () => {
  const navigate = useNavigate();

  const [searchBy, setSearchBy] = useState("name");
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (!loggedInUser) {
      navigate("/");
    }
  }, []);

  return (
    <AppShell navbar={<SideBar activePage='POST' />}>
      <TextInput
        value={searchVal}
        onChange={(e) => setSearchVal(e.currentTarget.value)}
        label='Search'
      />
      <Space h='lg' />
      <Radio.Group
        label='Select a search criteria'
        name='searchCriteria'
        value={searchBy}
        onChange={setSearchBy}
      >
        <Radio value='name' label='Song Name' />
        <Radio value='artist' label='Artist' />
      </Radio.Group>
      <Space h='md' />
      <Button>Search</Button>
    </AppShell>
  );
};

export default PostPage;
