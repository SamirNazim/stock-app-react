import React, { useEffect, useState } from "react";
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

const Register = () => {
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
      bg={"gray.50"}
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
          bg={"white"}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {error?.message === "" ? null : (
              <Box p={3} bg="red.100" color="red.800" borderRadius="md" my={4}>
                {error?.message}
              </Box>
            )}

            <Box>
              <Text mb={2} fontWeight="medium">Username</Text>
              <Input
                type="text"
                placeholder="Stock Ticker"
                value={username}
                onChange={(evt) => {
                  setUsername(evt.target.value.toUpperCase());
                  console.log(evt.target.value);
                }}
              />
            </Box>

            <Box>
              <Text mb={2} fontWeight="medium">Email address</Text>
              <Input
                type="email"
                value={email}
                onChange={(evt) => {
                  setEmail(evt.target.value);
                }}
              />
            </Box>

            <Box>
              <Text mb={2} fontWeight="medium">Password</Text>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
              />
              <Button
                mt={2}
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
              <Text fontSize="sm">Password must be a minimum 6 characters long.</Text>
            </Box>
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
                isDisabled={disableButton}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} href="/login">
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