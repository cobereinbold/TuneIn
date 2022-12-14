import React from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./fonts/GOTHAM-BLACK.ttf";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import AccountPage from "./pages/AccountPage";
import UsersPage from "./pages/UsersPage";
import StatsPage from "./pages/StatsPage";
import SearchPage from "./pages/SearchPage";
import ViewAccountPage from "./pages/ViewAccountPage";

/**
 * App component that holds all the endpoints
 * @returns App
 */
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
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='home' element={<HomePage />} />
          <Route path='post' element={<PostPage />} />
          <Route path='account' element={<AccountPage />} />
          <Route path='users' element={<UsersPage />} />
          <Route path='stats' element={<StatsPage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='viewaccount' element={<ViewAccountPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
