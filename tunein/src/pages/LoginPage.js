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
  Select,
  MediaQuery,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconUpload } from "@tabler/icons";
import "../css/LoginPage.css";
import logo from "../images/tuneInLogo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [successCreated, setSuccessCreated] = useState(false);
  const [file, setFile] = useState();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpDisabled, setSignUpDisabled] = useState(false);

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
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user.user));
        localStorage.setItem("authenticated", true);
        if (!user.user.isAdmin) {
          navigate("/home");
        } else {
          navigate("/users");
        }
      });
  };

  const signUpForm = useForm({
    initialValues: {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      favoriteGenre: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (value) => (value === "" ? "Mandatory field" : null),
      firstName: (value) => (value === "" ? "Mandatory field" : null),
      lastName: (value) => (value === "" ? "Mandatory field" : null),
      password: (value) => (value === "" ? "Mandatory field" : null),
      favoriteGenre: (value) => (value === "" ? "Mandatory field" : null),
    },
  });

  const signUpUser = async (values) => {
    let profilePic = "";
    console.log(file);
    if (file) profilePic = await uploadProfilePic(file);
    console.log(profilePic);
    fetch(`http://localhost:5000/user/createUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        profilePicture: profilePic,
        favoriteGenre: values.favoriteGenre,
      }),
    })
      .then((response) => {
        setSignUpLoading(false);
        if (response.status === 200) {
          console.log("User created successfully!");
          setSuccessCreated(true);
          setSignUpDisabled(true);
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

  const uploadProfilePic = async (e) => {
    let res = "";
    await getBase64(e).then(async (image) => {
      let body = new FormData();
      let imageText = image.replace(/^data:image\/[a-z]+;base64,/, "");
      body.append("image", imageText);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=09c3d1cee97f364e5c358f5f6eb16afe`,
        {
          method: "POST",
          body: body,
        }
      );
      const data = await response.json();
      res = data.data.display_url;
    });
    return res;
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  return (
    <>
      <CustomHeader />
      <Space h='xs' />
      <AspectRatio ratio={1080 / 1080} sx={{ maxWidth: "200px" }} mx='auto'>
        <Image src={logo} alt='Logo' />
      </AspectRatio>
      <MediaQuery
        query='(max-width: 500px) and (min-width: 200px)'
        styles={{ paddingLeft: "30px", paddingRight: "30px" }}
      >
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
      </MediaQuery>
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
          <form
            onSubmit={signUpForm.onSubmit((values) => {
              signUpUser(values);
              setSignUpLoading(true);
            })}
          >
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
            <Select
              withAsterisk
              label='Favorite Genre'
              placeholder='Pick one'
              data={[
                { value: "Afro", label: "Afro" },
                { value: "Alternative", label: "Alternative" },
                { value: "Classical", label: "Classical" },
                { value: "Country", label: "Country" },
                { value: "EDM", label: "EDM" },
                { value: "Folk", label: "Folk" },
                { value: "Hip-Hop", label: "Hip-Hop" },
                { value: "Indie", label: "Indie" },
                { value: "Jazz", label: "Jazz" },
                { value: "Latin", label: "Latin" },
                { value: "Pop", label: "Pop" },
                { value: "R&B", label: "R&B" },
                { value: "Rock", label: "Rock" },
                { value: "Soul", label: "Soul" },
              ]}
              {...signUpForm.getInputProps("favoriteGenre")}
            />
            <Space h='lg' />
            <FileInput
              label='Profile Picture'
              value={file}
              placeholder='Profile Picture'
              icon={<IconUpload size={14} />}
              accept='image/png,image/jpeg'
              onChange={setFile}
            />
            <Space h='xl' />
            <Center>
              <Button
                type='submit'
                loading={signUpLoading}
                disabled={signUpDisabled}
              >
                SIGN UP
              </Button>
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
