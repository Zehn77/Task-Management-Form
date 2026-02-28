import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import useClickOutside from "../../../hooks/useClickOutside";
import { TOPICS } from "../../../data/topics";

const TaskTopicField = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <VStack align="stretch" gap={1} position="relative" ref={ref}>
      <Text fontSize="sm" fontWeight="medium" color="gray.500" ml="6">
        Указать тему
      </Text>

      <HStack
        borderRadius="3xl"
        borderWidth="2px"
        borderColor={open ? "purple.500" : "gray.300"}
        _hover={{ borderColor: "purple.400" }}
        px={5}
        py={2.5}
        cursor="pointer"
        justify="space-between"
        onClick={() => setOpen((o) => !o)}
      >
        <Text fontSize="md" color={selected ? "gray.600" : "gray.400"}>
          {selected || "Выберите тему"}
        </Text>
        <Icon
          color="purple.500"
          transition="transform 0.2s"
          transform={open ? "rotate(180deg)" : "rotate(0deg)"}
        >
          <LuChevronDown strokeWidth={2.5} />
        </Icon>
      </HStack>

      {open && (
        <Box
          position="absolute"
          bottom="calc(100% + 6px)"
          left={0}
          right={0}
          zIndex={100}
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderRadius="2xl"
          borderWidth="1.5px"
          borderColor="purple.200"
          boxShadow="lg"
          overflow="hidden"
          p={2}
        >
          <VStack align="stretch" gap={0}>
            {TOPICS.map((topic) => (
              <Box
                key={topic}
                px={4}
                py={2.5}
                borderRadius="xl"
                cursor="pointer"
                fontSize="sm"
                fontWeight={selected === topic ? "semibold" : "normal"}
                color={selected === topic ? "purple.600" : "gray.600"}
                bg={selected === topic ? "purple.50" : "transparent"}
                _hover={{ bg: "purple.50", color: "purple.600" }}
                onClick={() => {
                  setSelected(topic);
                  setOpen(false);
                }}
              >
                {topic}
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export default TaskTopicField;
