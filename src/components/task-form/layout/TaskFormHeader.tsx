import { Flex, HStack, Heading, Box } from "@chakra-ui/react";
import { LuSquareCheckBig } from "react-icons/lu";
import { CloseButton } from "@chakra-ui/react";

interface HeaderProps {
  title: string;
}

export const TaskFormHeader = ({ title }: HeaderProps) => {
  return (
    <Flex justify="space-between" align="center">
      <HStack gap="3">
        <Box color="purple.600" fontSize="xl">
          <LuSquareCheckBig strokeWidth={2.3} />
        </Box>
        <Heading size="md" fontWeight="600" letterSpacing="tight">
          {title}
        </Heading>
      </HStack>

      <CloseButton
        variant="outline"
        borderRadius="full"
        borderColor="gray.300"
        color="gray.500"
        _dark={{
          borderColor: "whiteAlpha.300",
          color: "whiteAlpha.700",
        }}
        _hover={{
          bg: "white",
          borderColor: "gray.300",
          shadow: "xl",
          _dark: {
            bg: "whiteAlpha.200",
            borderColor: "whiteAlpha.500",
            shadow: "0 0 15px rgba(255, 255, 255, 0.15)",
          },
        }}
        transition="all 0.2s"
      />
    </Flex>
  );
};
