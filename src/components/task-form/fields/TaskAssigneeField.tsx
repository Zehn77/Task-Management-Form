import {
  Box,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";
import useClickOutside from "../../../hooks/useClickOutside";
import { USERS, TEAMS } from "../../../data/users";
import type { User } from "../../../data/users";

interface TaskAssigneeFieldProps {
  isTeam: boolean;
}

const TaskAssigneeField = ({ isTeam }: TaskAssigneeFieldProps) => {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState<User[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setFocused(false));

  const list = isTeam ? TEAMS : USERS;

  const filtered = list.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()),
  );

  const isSelected = (id: number) => !!selected.find((s) => s.id === id);

  const toggle = (user: User) => {
    setSelected((prev) =>
      isSelected(user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user],
    );
  };

  const remove = (id: number) => {
    setSelected((prev) => prev.filter((u) => u.id !== id));
  };

  const showDropdown = focused && filtered.length > 0;

  return (
    <VStack align="stretch" gap={1} position="relative" ref={containerRef}>
      <Text fontSize="sm" fontWeight="medium" color="gray.500" ml="6">
        {isTeam ? "Команда задачи" : "Исполнители задачи"}
      </Text>

      {/* Input trigger */}
      <Box
        borderRadius="3xl"
        borderColor={focused ? "purple.500" : "gray.300"}
        borderWidth="2px"
        px={4}
        py={2}
        minH="48px"
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        gap={2}
        cursor="text"
        _hover={{ borderColor: "purple.400" }}
        onClick={() => inputRef.current?.focus()}
      >
        {selected.map((u) => (
          <HStack
            key={u.id}
            bg="purple.100"
            _dark={{ bg: "purple.900" }}
            borderRadius="full"
            px={2}
            py={1}
            gap={1}
          >
            <Image
              src={u.avatar}
              w="18px"
              h="18px"
              borderRadius="full"
              objectFit="cover"
            />
            <Text
              fontSize="sm"
              color="purple.700"
              _dark={{ color: "purple.200" }}
            >
              {u.name.split(" ")[0]}
            </Text>
            <Icon
              color="purple.400"
              cursor="pointer"
              fontSize="xs"
              onClick={(e) => {
                e.stopPropagation();
                remove(u.id);
              }}
            >
              <LuX />
            </Icon>
          </HStack>
        ))}

        <Input
          ref={inputRef}
          border="none"
          outline="none"
          p={0}
          h="auto"
          minW="120px"
          flex={1}
          fontSize="md"
          placeholder={
            selected.length === 0
              ? isTeam
                ? "Выберите команду"
                : "Выберите исполнителя"
              : ""
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          _focus={{ boxShadow: "none", outline: "none" }}
          _placeholder={{ color: "gray.400" }}
        />
      </Box>

      {/* Dropdown */}
      {showDropdown && (
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
          p={2}
        >
          <VStack align="stretch" gap={2} maxH="260px" overflowY="auto">
            {filtered.map((user) => {
              const checked = isSelected(user.id);
              return (
                <HStack
                  key={user.id}
                  px={3}
                  py={2}
                  borderRadius="3xl"
                  borderWidth="2px"
                  borderColor={checked ? "purple.400" : "purple.100"}
                  bg={checked ? "purple.50" : "white"}
                  _dark={{
                    bg: checked ? "purple.900" : "gray.800",
                    borderColor: checked ? "purple.400" : "gray.600",
                  }}
                  cursor="pointer"
                  transition="all 0.15s"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toggle(user);
                  }}
                  gap={3}
                >
                  {/* Checkbox */}
                  <Box
                    w="20px"
                    h="20px"
                    borderRadius="md"
                    borderWidth="2px"
                    borderColor={checked ? "purple.500" : "gray.300"}
                    bg={checked ? "purple.500" : "white"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    transition="all 0.15s"
                  >
                    {checked && (
                      <Icon color="white" fontSize="11px">
                        <LuCheck strokeWidth={3} />
                      </Icon>
                    )}
                  </Box>

                  {/* Avatar */}
                  <Image
                    src={user.avatar}
                    w="36px"
                    h="36px"
                    borderRadius="full"
                    objectFit="cover"
                    flexShrink={0}
                  />

                  {/* Name */}
                  <Text
                    fontSize="sm"
                    fontWeight={checked ? "semibold" : "medium"}
                    color={checked ? "purple.700" : "gray.700"}
                    _dark={{ color: checked ? "purple.200" : "gray.200" }}
                    flex={1}
                  >
                    {user.name}
                  </Text>
                </HStack>
              );
            })}
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export default TaskAssigneeField;
