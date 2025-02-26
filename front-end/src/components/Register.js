import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Field,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Alert } from "@chakra-ui/react";
import { useTheme } from "next-themes";

const Register = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();

  const disableButton =
    !username || !email || password.length < 6 || error.message !== "";

  const register = () => {
    const URL = "http://localhost:8080/api/register";

    async function updatePost() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      };
      const response = await fetch(URL, requestOptions);
      const data = await response.json();
      setUserData(data);
      console.log(data);
    }
    if (username !== "") {
      updatePost().then(() => history("/login"));
    }
  };

  useEffect(() => {
    const URL = `http://localhost:8080/api/checkuser?username=${username}&email=${email}`;

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setError(data);
      });
  }, [username, email]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={isDarkMode ? "gray.800" : "gray.50"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={isDarkMode ? "gray.800" : "gray.50"}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {error?.message === "" ? null : (
              <Alert status="error">
                <Alert.Indicator />
                {error?.message}
              </Alert>
            )}
            <Field id="username" label="Username" isRequired>
              <Input
                type="text"
                value={username}
                onChange={(evt) => {
                  setUsername(evt.target.value);
                  console.log(evt.target.value);
                }}
              />
            </Field>

            <Field id="email" label="Email address" isRequired>
              <Input
                type="email"
                value={email}
                onChange={(evt) => {
                  setEmail(evt.target.value);
                }}
              />
            </Field>

            <Field id="password" label="Password" isRequired>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
              />
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              ></Button>
              <p>Password must be a minimum 6 characters long.</p>
            </Field>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => {
                  register();
                }}
                disabled={disableButton}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link href="/login" color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
