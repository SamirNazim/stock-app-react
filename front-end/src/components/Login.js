import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Field,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Alert } from "@chakra-ui/react";
import axios from "axios";
import { useTheme } from "next-themes";

const Login = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const [auth, setAuth] = useState({
    message: "",
    success: true,
  });
  const [error, setError] = useState([]);

  const login = async () => {
    setError(false);
    const res = await axios
      .post("http://localhost:8080/api/login", {
        username: username,
        password: password,
      })
      .catch((err) => {
        setError(err.response.data);
      });

    const data = await res.data;

    setAuth(data);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={isDarkMode ? "gray.800" : "gray.50"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={isDarkMode ? "gray.700" : "white"}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {auth.success ? null : (
              <Alert status="error">
                <Alert.Indicator />
                {auth.message}
              </Alert>
            )}
            <Field id="username" label="username">
              {error?.success === false && (
                <Alert status="error">
                  <Alert.Indicator />
                  {error?.message}
                </Alert>
              )}

              <Input
                type="username"
                value={username}
                onChange={(evt) => {
                  setUsername(evt.target.value);
                }}
              />
            </Field>
            <Field id="password" label="password">
              <Input
                type="password"
                value={password}
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
              />
            </Field>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => login().then(() => history("/"))}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
