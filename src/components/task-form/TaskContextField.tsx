import { Box, Text, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";

const MAX_LENGTH = 4096;

const TaskContextField = () => {
  const [value, setValue] = useState("");

  return (
    <VStack align="stretch" gap={1}>
      <Text fontSize="sm" fontWeight="medium" color="gray.500" ml="6">
        Контекст задачи{" "}
        <Text as="span" color="purple.500">
          ★
        </Text>
      </Text>
      <Box position="relative">
        <Textarea
          placeholder="Выполнить какую-нибудь задачу"
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= MAX_LENGTH) {
              setValue(e.target.value);
            }
          }}
          minH="120px"
          borderRadius="3xl"
          borderColor="gray.300"
          borderWidth="2px"
          _focus={{
            borderColor: "purple.500",
            outline: "none",
          }}
          _hover={{
            borderColor: "purple.400",
          }}
          resize="none"
          py={3}
          px={4}
        />
        <Text
          position="absolute"
          bottom={5}
          right={5}
          fontSize="xs"
          color="fg.subtle"
        >
          {value.length}/{MAX_LENGTH}
        </Text>
      </Box>
    </VStack>
  );
};

export default TaskContextField;
