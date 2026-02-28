import {
  Avatar,
  Box,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LuX } from "react-icons/lu";
import useClickOutside from "../../hooks/useClickOutside";

const USERS = [
  { id: 1, name: "Алексей Иванов", role: "Разработчик" },
  { id: 2, name: "Мария Смирнова", role: "Дизайнер" },
  { id: 3, name: "Дмитрий Козлов", role: "Менеджер" },
  { id: 4, name: "Екатерина Новикова", role: "Тестировщик" },
  { id: 5, name: "Сергей Морозов", role: "Аналитик" },
];

const TEAMS = [
  { id: 1, name: "Команда А", role: "Frontend" },
  { id: 2, name: "Команда Б", role: "Backend" },
  { id: 3, name: "Команда В", role: "Design" },
  { id: 4, name: "Команда Г", role: "QA" },
];

interface User {
  id: number;
  name: string;
  role: string;
}

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

  const filtered = list.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) &&
      !selected.find((s) => s.id === u.id),
  );

  const showDropdown = focused && (search.length > 0 || filtered.length > 0);

  const select = (user: User) => {
    setSelected((prev) => [...prev, user]);
    setSearch("");
    inputRef.current?.focus();
  };

  const remove = (id: number) => {
    setSelected((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <VStack align="stretch" gap={1} position="relative" ref={containerRef}>
      <Text fontSize="sm" fontWeight="medium" color="gray.500" ml="6">
        {isTeam ? "Команда задачи" : "Исполнители задачи"}
      </Text>

      {/* Input box */}
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
            <Avatar.Root size="2xs">
              <Avatar.Fallback name={u.name} />
            </Avatar.Root>
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
              onClick={() => remove(u.id)}
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
          overflow="hidden"
        >
          <VStack align="stretch" gap={0} maxH="220px" overflowY="auto" p={2}>
            {filtered.length === 0 ? (
              <Text
                px={3}
                py={3}
                fontSize="sm"
                color="gray.400"
                textAlign="center"
              >
                Ничего не найдено
              </Text>
            ) : (
              filtered.map((user) => (
                <HStack
                  key={user.id}
                  px={3}
                  py={2.5}
                  borderRadius="xl"
                  cursor="pointer"
                  onMouseDown={() => select(user)}
                  _hover={{ bg: "purple.50", _dark: { bg: "gray.700" } }}
                >
                  <Avatar.Root size="sm">
                    <Avatar.Fallback
                      name={user.name}
                      bg="purple.400"
                      color="white"
                    />
                  </Avatar.Root>
                  <VStack align="start" gap={0} flex={1}>
                    <Text fontSize="sm" fontWeight="medium">
                      {user.name}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {user.role}
                    </Text>
                  </VStack>
                </HStack>
              ))
            )}
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export default TaskAssigneeField;
