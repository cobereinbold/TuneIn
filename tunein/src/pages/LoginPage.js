import React, { useState } from "react";
import CustomHeader from "../components/CustomHeader";
import {
  AspectRatio,
  Image,
  PasswordInput,
  TextInput,
  Box,
  Stack,
  Button,
  Space,
  Code,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "../css/LoginPage.css";
import logo from "../images/tuneInLogo.png";

const LoginPage = () => {
  const [submittedValues, setSubmittedValues] = useState("");

  const loginForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSignIn = (values) => {
    // e.preventDefault();

    fetch(`http://localhost:5000/user/signInUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Signed in!");
        } else {
          console.log("Sign in failed.");
        }
      })
      .catch((err) => console.log(err));
  };

  const signUpUser = (e) => {
    if (
      this.state.newEmail.length === 0 ||
      this.state.newUsername.length === 0 ||
      this.state.newFirstName.length === 0 ||
      this.state.newLastName.length === 0 ||
      this.state.newPassword.length === 0
    ) {
      return;
    }

    fetch(`http://localhost:5000/user/createUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.newUsername,
        password: this.state.newPassword,
        email: this.state.newEmail,
        firstName: this.state.newFirstName,
        lastName: this.state.newLastName,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("User created successfully!");
          this.manageModal(false);
        } else {
          console.log("User could not be created");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <CustomHeader />
      <AspectRatio
        ratio={1080 / 1080}
        sx={{ maxWidth: 400, marginTop: 50 }}
        mx='auto'
      >
        <Image src={logo} alt='Logo' />
      </AspectRatio>
      <Box sx={{ maxWidth: 400 }} mx='auto'>
        <form onSubmit={loginForm.onSubmit((values) => handleSignIn(values))}>
          <TextInput
            withAsterisk
            label='Email'
            placeholder='your@email.com'
            {...loginForm.getInputProps("username")}
          ></TextInput>
          <Space h='lg' />
          <PasswordInput
            withAsterisk
            label='Password'
            placeholder='password'
            {...loginForm.getInputProps("password")}
          />
          <Space h='xl' />
          <Space h='xl' />
          <Stack spacing='xl'>
            <Button type='submit'>LOGIN</Button>
            <Button>SIGN UP</Button>
          </Stack>
        </form>
      </Box>
      {submittedValues && <Code block>{submittedValues}</Code>}
    </>
  );
};

export default LoginPage;
