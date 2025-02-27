import React, { useEffect, useState } from "react";
import { 
  Box, 
  Flex, 
  Icon, 
  Link, 
  Text
} from "@chakra-ui/react";
import {
  FiHome,
  FiSettings,
  FiLogIn,
  FiLogOut,
  FiPlusCircle,
  FiUser
} from "react-icons/fi";
import * as fetchAPI from "../axios/getUser.js";
import axios from "axios";

const SidebarWithHeader = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchAPI.getUser();
        console.log(res.user);
        setUser(res.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    await axios
      .post("http://localhost:8080/api/logout")
      .then(() => console.log("Sign off successfully"))
      .catch((err) => console.log(err));
  };

  const LinkItems = [
    { name: "Home", icon: FiHome, href: "/" },
    user?.length !== 0
      ? { name: "Logout", icon: FiLogOut, onClick: { logout }, href: "/login" }
      : { name: "Login", icon: FiLogIn, href: "/login" },

    user?.length === 0 && {
      name: "Register",
      icon: FiPlusCircle,
      href: "/register",
    },

    { name: "Settings", icon: FiSettings, href: "/settings" },
  ];

  return (
    <div>
      <Box
        transition="3s ease"
        bg={"gray.50"}
        borderRight="1px"
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Wallstreet Tracker
          </Text>
        </Flex>
        {LinkItems.map(
          (link) =>
            link && (
              <NavItem
                key={link?.name}
                icon={link?.icon}
                href={link?.href}
                onClick={() => logout}
              >
                {link?.name}
              </NavItem>
            )
        )}
        
        {user?.length !== 0 && (
          <Box position="fixed" bottom="5" left="5" right="5">
            <Flex
              align="center"
              p="4"
              borderRadius="md"
              bg="gray.100"
              boxShadow="sm"
            >
              <Icon as={FiUser} mr="3" />
              <Text fontWeight="medium">{user?.username}</Text>
            </Flex>
          </Box>
        )}
      </Box>
    </div>
  );
};

// Navigation item component
const NavItem = ({ icon, children, href, onClick }) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={onClick}
    >
      <Flex
        align="center"
        p="3"
        mx="1"
        borderRadius="md"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.100",
          color: "black",
        }}
      >
        {icon && (
          <Icon
            mr="3"
            fontSize="16"
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default SidebarWithHeader;