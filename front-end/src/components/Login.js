import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  createStyles,
} from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";

import axios from "axios";

const Login = () => {
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
      sx={createStyles({
        bg: {
          light: "gray.50",
          dark: "gray.800",
        },
      })}
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
          sx={createStyles({
            bg: {
              light: "white",
              dark: "gray.700",
            },
          })}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {auth.success ? null : (
              <Alert status="error">
                <AlertIcon />
                {auth.message}
              </Alert>
            )}
            <FormControl id="username">
              {error?.success === false && (
                <Alert status="error">
                  <AlertIcon />
                  {error?.message}
                </Alert>
              )}

              <FormLabel>username</FormLabel>
              <Input
                type="username"
                value={username}
                onChange={(evt) => {
                  setUsername(evt.target.value);
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
              />
            </FormControl>
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
