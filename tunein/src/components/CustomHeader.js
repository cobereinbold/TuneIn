import React from "react";
import { Header, Title } from "@mantine/core";
import "../css/CustomerHeader.css";

const CustomHeader = () => {
  return (
    <Header height={70} p='md' className='header'>
      <Title order={1} color='white' ta='left'>
        TuneIn
      </Title>
    </Header>
  );
};

export default CustomHeader;
