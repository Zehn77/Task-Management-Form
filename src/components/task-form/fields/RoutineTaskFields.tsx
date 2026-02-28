import { Box, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { createListCollection, Portal, Select } from "@chakra-ui/react";

const NAME_MAX_LENGTH = 255;
const DESC_MAX_LENGTH = 1024;

const periodicityOptions = createListCollection({
  items: [
    { label: "Ежедневно", value: "daily" },
    { label: "Еженедельно", value: "weekly" },
    { label: "Ежемесячно", value: "monthly" },
    { label: "Ежегодно", value: "yearly" },
  ],
});

const RoutineTaskFields = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Box
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="purple.400"
      borderRadius="3xl"
      p={5}
    >
      <VStack align="stretch" gap={4}>
        <VStack align="stretch" gap={1}>
          <Text fontSize="sm" fontWeight="medium" color="gray.500" ml={3}>
            Название рутинной задачи{" "}
            <Text as="span" color="purple.500">
              ★
            </Text>
          </Text>
          <Box position="relative">
            <Input
              placeholder="Укажите название рутинной задачи"
              value={name}
              onChange={(e) => {
                if (e.target.value.length <= NAME_MAX_LENGTH) {
                  setName(e.target.value);
                }
              }}
              borderRadius="3xl"
              pr="16"
              focusRing="2px"
              focusRingColor="purple.500"
              _focus={{
                borderColor: "purple.500",
                bg: "purple.50/10",
              }}
              _dark={{
                borderColor: "whiteAlpha.300",
                _focus: {
                  borderColor: "purple.500",
                  focusRingColor: "purple.500",
                },
              }}
              transition="all 0.2s"
            />

            <Text
              position="absolute"
              top="50%"
              right={4}
              transform="translateY(-50%)"
              fontSize="xs"
              color="gray.400"
            >
              {name.length}/{NAME_MAX_LENGTH}
            </Text>
          </Box>
        </VStack>

        <VStack align="stretch" gap={1}>
          <Text fontSize="sm" fontWeight="medium" color="gray.500" ml={3}>
            Периодичность{" "}
            <Text as="span" color="purple.500">
              ★
            </Text>
          </Text>
          <Select.Root collection={periodicityOptions} size="md" width="full">
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger
                borderRadius="3xl"
                px="4"
                borderColor="gray.200"
                _dark={{ borderColor: "whiteAlpha.300" }}
                _focus={{
                  borderColor: "purple.500",
                  ring: "1px",
                  ringColor: "purple.500",
                }}
              >
                <Select.ValueText placeholder="Выберите периодичность" />
                <Select.Indicator />
              </Select.Trigger>
            </Select.Control>

            <Portal>
              <Select.Positioner>
                <Select.Content
                  borderRadius="2xl"
                  boxShadow="lg"
                  _dark={{ bg: "gray.800" }}
                >
                  {periodicityOptions.items.map((item) => (
                    <Select.Item
                      key={item.value}
                      item={item}
                      borderRadius="lg"
                      mx="2"
                      my="1"
                    >
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </VStack>

        <VStack align="stretch" gap={1}>
          <Text fontSize="sm" fontWeight="medium" color="gray.500" ml={3}>
            Описание
          </Text>
          <Box
            position="relative"
            borderRadius="3xl"
            borderWidth="2px"
            borderColor="gray.300"
            _hover={{ borderColor: "purple.400" }}
            _focusWithin={{ borderColor: "purple.500" }}
            transition="border-color 0.2s"
          >
            <Textarea
              placeholder="Описание рутинной задачи"
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= DESC_MAX_LENGTH) {
                  setDescription(e.target.value);
                }
              }}
              minH="120px"
              borderRadius="3xl"
              border="none"
              _focus={{ outline: "none", boxShadow: "none" }}
              resize="none"
              pb={8}
            />
            <Text
              position="absolute"
              bottom={5}
              right={6}
              fontSize="xs"
              color="fg.subtle"
            >
              {description.length}/{DESC_MAX_LENGTH}
            </Text>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};

export default RoutineTaskFields;
