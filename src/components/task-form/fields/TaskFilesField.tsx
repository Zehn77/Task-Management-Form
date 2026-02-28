import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LuPaperclip, LuX } from "react-icons/lu";

const TaskFilesField = () => {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    setFiles((prev) => {
      const names = new Set(prev.map((f) => f.name));
      return [...prev, ...picked.filter((f) => !names.has(f.name))];
    });
    e.target.value = "";
  };

  const remove = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  return (
    <VStack align="stretch" gap={1}>
      <Text fontSize="sm" fontWeight="medium" color="gray.500" ml="6">
        Файлы
      </Text>

      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleChange}
      />

      <HStack
        borderRadius="3xl"
        borderWidth="2px"
        borderColor="gray.300"
        _hover={{ borderColor: "purple.400" }}
        px={4}
        py={2}
        minH="48px"
        cursor="pointer"
        flexWrap="wrap"
        align="center"
        gap={2}
        onClick={() => inputRef.current?.click()}
      >
        {files.length === 0 ? (
          <Text fontSize="md" color="gray.400" flex={1}>
            Прикрепите файлы
          </Text>
        ) : (
          <HStack flex={1} flexWrap="wrap" gap={2}>
            {files.map((file) => (
              <HStack
                key={file.name}
                bg="purple.50"
                _dark={{ bg: "purple.900" }}
                borderRadius="full"
                px={3}
                py={1}
                gap={1}
                onClick={(e) => e.stopPropagation()}
              >
                <Text
                  fontSize="sm"
                  color="purple.700"
                  _dark={{ color: "purple.200" }}
                  maxW="160px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {file.name}
                </Text>
                <Icon
                  color="purple.400"
                  cursor="pointer"
                  fontSize="xs"
                  onClick={(e) => remove(file.name, e)}
                >
                  <LuX />
                </Icon>
              </HStack>
            ))}
          </HStack>
        )}

        <Box flexShrink={0} ml="auto">
          <Icon color="purple.500" fontSize="xl">
            <LuPaperclip strokeWidth={2} />
          </Icon>
        </Box>
      </HStack>
    </VStack>
  );
};

export default TaskFilesField;
