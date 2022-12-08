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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUpload } from "@tabler/icons";
import "../css/LoginPage.css";
import logo from "../images/tuneInLogo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

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
        } else {
          console.log("Sign in failed.");
          loginForm.setErrors({ password: "Invalid password" });
        }
      })
      .catch((err) => console.log(err));
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
        } else {  //TODO: need more error handling, username already taken not neccessarily the issue. 
                  //      Backend needs different error numbers
          console.log(response);
          console.log("User could not be created. \nError: " + response);
          signUpForm.setErrors({ username: "Username already taken" });
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
        onClose={() => setModalOpen(false)}
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
      </Modal>
    </>
  );
};

export default LoginPage;
