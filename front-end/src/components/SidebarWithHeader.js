import React, { useEffect, useState } from "react";
import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import {
  FiHome,
  FiSettings,
  FiLogIn,
  FiLogOut,
  FiPlusCircle,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import * as fetchAPI from "../axios/getUser.js";
import {
  IconButton,
  Avatar,
  HStack,
  VStack,
  Menu,
  MenuItem,
  MenuContent,
  MenuTrigger,
} from "@chakra-ui/react";
import axios from "axios";
import { useTheme } from "next-themes";

const SidebarWithHeader = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetchAPI.getUser();
      console.log(res.user);
      setUser(res.user);
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
    { name: "Home", icon: FiHome },
    user?.length !== 0
      ? { name: "Logout", icon: FiLogOut, onClick: { logout }, href: "/login" }
      : { name: "Login", icon: FiLogIn, href: "/login" },

    user?.length === 0 && {
      name: "Register",
      icon: FiPlusCircle,
      href: "/register",
    },

    { name: "Settings", icon: FiSettings },
  ];

  const NavItem = ({ icon, children, href, onClick }) => {
    return (
      <Link
        href={href}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="5"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    );
  };

  return (
    <div>
      <Box
        transition="3s ease"
        bg={isDarkMode ? "gray.800" : "gray.50"}
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
      </Box>

      {user?.length !== 0 && (
        <div
          className="sidebar-profile"
          style={{ position: "fixed", bottom: "0" }}
        >
          <HStack>
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<FiBell />}
            />
            <Flex>
              <Menu>
                <MenuTrigger
                  asChild
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar size={"md"} src={user?.img} />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="md">{user?.username}</Text>
                      <Text fontSize="xs" color="gray.600">
                        Wallstreet Novice
                      </Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Billing</MenuItem>
                  <MenuItem>Sign out</MenuItem>
                </MenuContent>
              </Menu>
            </Flex>
          </HStack>
        </div>
      )}
    </div>
  );
};

export default SidebarWithHeader;
