import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import { Flex, Spacer } from '@chakra-ui/react';

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="350px">
          <Flex alignItems='center' flexDirection='column'>
            <ModalHeader>
              {user.name}
            </ModalHeader>
            <ModalCloseButton />
            <Spacer />
            <ModalBody>
              <Flex alignItems='center' flexDirection='column'>
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={user.pic}
                  alt={user.name}
                />
                <Spacer />
                <Text
                  fontSize={{ base: "20px", md: "25px" }}
                  fontFamily="Work sans"
                >
                  Email: {user.email}
                </Text>
                <Spacer />
              </Flex>
            </ModalBody>
          </Flex>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;