import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text
} from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();
  const [auth, setAuth] = useState({
    message: "",
    success: true,
  });
  const [error, setError] = useState([]);

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        username: username,
        password: password,
      });
      const data = res.data;
      setAuth(data);
      history("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={"gray.50"}
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
          bg={"white"}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {auth.success ? null : (
              <Box p={3} bg="red.100" color="red.800" borderRadius="md">
                {auth.message}
              </Box>
            )}
            
            <Box>
              <Text mb={2} fontWeight="medium">Username</Text>
              {error?.success === false && (
                <Box p={3} bg="red.100" color="red.800" borderRadius="md" mb={2}>
                  {error?.message}
                </Box>
              )}
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(evt) => {
                  setUsername(evt.target.value);
                }}
              />
            </Box>
            
            <Box>
              <Text mb={2} fontWeight="medium">Password</Text>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
              />
            </Box>
            
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Input 
                  type="checkbox" 
                  id="remember" 
                  width="auto" 
                  mr={2}
                />
                <Text>Remember me</Text>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={login}
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