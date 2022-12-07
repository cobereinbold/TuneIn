import React from "react";
import SideBar from "./components/SideBar";
import SignIn from "./components/SignIn";
import { Button, MantineProvider } from "@mantine/core";
import "./fonts/GOTHAM-BLACK.ttf";
import "./App.css";

const App = () => {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        fontFamily: "Gotham",
        colorScheme: "dark",
        colors: {
          spGreen: [
            "#e1fdeb",
            "#baf5ce",
            "#91ecb0",
            "#66e592",
            "#3ede74",
            "#25c45b",
            "#1a9946",
            "#106d31",
            "#04411c",
            "#001804",
          ],
          spBlack: [
            "#292727",
            "#262323",
            "#221F1F",
            "#201C1C",
            "#1D1919",
            "#1B1717",
            "#191414",
            "#161212",
            "#141111",
            "#110F0F",
          ],
        },
        primaryColor: "spGreen",
        primaryShade: 7,
      }}
    >
      <div className='ui container'>
        <SideBar />
      </div>
    </MantineProvider>
  );
};

export default App;
