import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Modal,
  FileInput,
  Center,
  Notification,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconUpload } from "@tabler/icons";
import "../css/LoginPage.css";
import logo from "../images/tuneInLogo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [successCreated, setSuccessCreated] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      navigate("/home");
    }
  }, []);

  const loginForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) => (value === "" ? "Invalid username" : null),
      password: (value) => (value === "" ? "Invalid password" : null),
    },
  });

  const handleSignIn = (values) => {
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
          localStorage.setItem("authenticated", true);
          navigate("/home");
          return response.json();
        } else if (response.status === 501) {
          console.log("Sign in failed.");
          loginForm.setErrors({ username: "Invalid username" });
          return;
        } else {
          console.log("Sign in failed.");
          loginForm.setErrors({ password: "Invalid password" });
          return;
        }
      })
      .catch((err) => console.log(err))
      .then((user) => localStorage.setItem("user", JSON.stringify(user)));
  };

  const signUpForm = useForm({
    initialValues: {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (value) => (value === "" ? "Mandatory field" : null),
      firstName: (value) => (value === "" ? "Mandatory field" : null),
      lastName: (value) => (value === "" ? "Mandatory field" : null),
      password: (value) => (value === "" ? "Mandatory field" : null),
    },
  });

  const signUpUser = (values) => {
    fetch(`http://localhost:5000/user/createUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("User created successfully!");
          setSuccessCreated(true);
        } else if (response.status === 502) {
          // Email already used
          console.log("User could not be created. \nError: " + response);
          signUpForm.setErrors({ email: "Account already created" }); //TODO: Forgot password handling
        } else {
          //TODO: need more error handling, username already taken not neccessarily the issue.
          //      Backend needs different error numbers
          console.log("User could not be created. \nError: " + response);
          signUpForm.setErrors({ username: "Username already taken" });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <CustomHeader />
      <Space h='lg' />
      <AspectRatio
        ratio={1080 / 1080}
        sx={{ maxWidth: "20%", marginTop: 50 }}
        mx='auto'
      >
        <Image src={logo} alt='Logo' />
      </AspectRatio>
      <Box sx={{ maxWidth: 400 }} mx='auto'>
        <form onSubmit={loginForm.onSubmit((values) => handleSignIn(values))}>
          <TextInput
            withAsterisk
            label='Username'
            placeholder='JohnSmith'
            {...loginForm.getInputProps("username")}
          ></TextInput>
          <Space h='lg' />
          <PasswordInput
            withAsterisk
            label='Password'
            placeholder='Password'
            {...loginForm.getInputProps("password")}
          />
          <Space h='xl' />
          <Space h='xl' />
          <Stack spacing='xl'>
            <Button type='submit'>LOGIN</Button>
            <Button onClick={() => setModalOpen(true)}>SIGN UP</Button>
          </Stack>
        </form>
      </Box>
      <Modal
        opened={modalOpen}
        onClose={() => {
          signUpForm.reset();
          setModalOpen(false);
          setSuccessCreated(false);
        }}
        title='Create an Account'
        centered
      >
        <Box sx={{ maxWidth: 400 }} mx='auto'>
          <form onSubmit={signUpForm.onSubmit((values) => signUpUser(values))}>
            <TextInput
              withAsterisk
              label='Email'
              placeholder='you@gmail.com'
              {...signUpForm.getInputProps("email")}
            ></TextInput>
            <Space h='lg' />
            <TextInput
              withAsterisk
              label='Username'
              placeholder='JohnSmith'
              {...signUpForm.getInputProps("username")}
            ></TextInput>
            <Space h='lg' />
            <TextInput
              withAsterisk
              label='First Name'
              placeholder='John'
              {...signUpForm.getInputProps("firstName")}
            ></TextInput>
            <Space h='lg' />
            <TextInput
              withAsterisk
              label='Last Name'
              placeholder='Smith'
              {...signUpForm.getInputProps("lastName")}
            ></TextInput>
            <Space h='lg' />
            <PasswordInput
              withAsterisk
              label='Password'
              placeholder='Password'
              {...signUpForm.getInputProps("password")}
            />
            <Space h='lg' />
            <FileInput
              label='Profile Picture'
              placeholder='Profile Picture'
              icon={<IconUpload size={14} />}
              accept='image/png,image/jpeg'
            />
            <Space h='xl' />
            <Center>
              <Button type='submit'>SIGN UP</Button>
            </Center>
          </form>
        </Box>
        <Space h='md' />
        <Group hidden={!successCreated} position='center'>
          <Notification
            icon={<IconCheck size={20} />}
            color='spGreen'
            title='User Created'
            onClose={() => setSuccessCreated(false)}
            disallowClose
          >
            You can now sign into your account
          </Notification>
        </Group>
      </Modal>
    </>
  );
};

export default LoginPage;
