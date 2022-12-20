import React, { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { SearchIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { Flex, Spacer } from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useToast } from "@chakra-ui/toast";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from './ProfileModal';

const SideDrawer = () => {

  const {user} = ChatState();
  const [search, useSearch] = useState("");
  const [searchResult, useSearchResult] = useState([]);
  const [loading, useLoading] = useState(false);
  const [loadingChat, useLoadingChat] = useState("");

  return (
    <>
      <Box
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
      >
        <Flex>
          <Tooltip label="Search Users" hasArrow placement='bottom-end'>
            <Button variant="ghost">
              <SearchIcon />
              <Text d={{ base: "none", md: "flex" }} px="4">
                Search Users
              </Text>
            </Button>
          </Tooltip>
          <Spacer/>
          <Text fontSize="2xl" fontFamily="Work sans">
            Talk-A-Tive
          </Text>
          <Spacer/>
        <div>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div> 
        </Flex>
      </Box>

      {/* // onClose={onClose} isOpen={isOpen} */}

      <Drawer placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          {/* <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody> */}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer