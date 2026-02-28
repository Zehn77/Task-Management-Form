import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { LuCalendarDays, LuClock } from "react-icons/lu";

const today = new Date();

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

const formatDate = (date: Date) =>
  date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const ScrollColumn = ({
  items,
  selected,
  onSelect,
}: {
  items: string[];
  selected: string;
  onSelect: (v: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const idx = items.indexOf(selected);
    if (ref.current && idx !== -1) {
      ref.current.scrollTop = idx * 36 - 36;
    }
  }, [selected, items]);

  return (
    <Box
      ref={ref}
      h="148px"
      overflowY="auto"
      w="56px"
      css={{
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Box h="36px" />
      {items.map((item) => (
        <Box
          key={item}
          h="36px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
          cursor="pointer"
          fontWeight={item === selected ? "bold" : "normal"}
          fontSize={item === selected ? "lg" : "md"}
          color={item === selected ? "white" : "gray.500"}
          bg={item === selected ? "purple.500" : "transparent"}
          _hover={{ bg: item === selected ? "purple.500" : "purple.50" }}
          transition="all 0.15s"
          onClick={() => onSelect(item)}
        >
          {item}
        </Box>
      ))}
      <Box h="36px" />
    </Box>
  );
};

const TaskDeadlineField = () => {
  const [selected, setSelected] = useState<Date | undefined>();
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => {
    setCalendarOpen(false);
    setTimeOpen(false);
  });

  const timeDisplay = `${hour}:${minute}`;

  return (
    <VStack align="stretch" gap={1} position="relative" ref={containerRef}>
      <Text fontSize="sm" fontWeight="medium" color="gray.500" ml="6">
        Срок выполнения
      </Text>

      <HStack gap={3} align="center">
        <Box
          flex={2}
          borderRadius="3xl"
          borderWidth="2px"
          borderColor={calendarOpen ? "purple.500" : "gray.300"}
          _hover={{ borderColor: "purple.400" }}
          px={5}
          py={2.5}
          cursor="pointer"
          onClick={() => {
            setCalendarOpen((o) => !o);
            setTimeOpen(false);
          }}
        >
          <Text fontSize="md" color={selected ? "gray.600" : "gray.400"}>
            {selected ? formatDate(selected) : "Выберите дату"}
          </Text>
        </Box>

        <Box
          flex={1}
          borderRadius="3xl"
          borderWidth="2px"
          borderColor={timeOpen ? "purple.500" : "gray.300"}
          _hover={{ borderColor: "purple.400" }}
          px={5}
          py={2.5}
          cursor="pointer"
          onClick={() => {
            setTimeOpen((o) => !o);
            setCalendarOpen(false);
          }}
        >
          <Text fontSize="md" color="gray.600">
            {timeDisplay}
          </Text>
        </Box>

        <Icon
          color="purple.500"
          fontSize="2xl"
          cursor="pointer"
          flexShrink={0}
          onClick={() => {
            setCalendarOpen((o) => !o);
            setTimeOpen(false);
          }}
        >
          <LuCalendarDays strokeWidth={1.5} />
        </Icon>
      </HStack>

      {calendarOpen && (
        <Box
          position="absolute"
          bottom="calc(100% + 6px)"
          left={0}
          zIndex={200}
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderRadius="2xl"
          borderWidth="1.5px"
          borderColor="purple.200"
          boxShadow="lg"
          p={2}
          css={{
            "& .rdp-root": {
              "--rdp-accent-color": "var(--chakra-colors-purple-500)",
            },
            "& .rdp-day_button": { borderRadius: "50%" },
          }}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              setSelected(date);
              setCalendarOpen(false);
            }}
            disabled={{ before: today }}
            startMonth={today}
          />
        </Box>
      )}

      {timeOpen && (
        <Box
          position="absolute"
          bottom="calc(100% + 6px)"
          right="40px"
          zIndex={200}
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderRadius="2xl"
          borderWidth="1.5px"
          borderColor="purple.200"
          boxShadow="lg"
          p={3}
        >
          <HStack justify="center" mb={2} gap={1}>
            <Icon color="purple.500" fontSize="sm">
              <LuClock strokeWidth={2} />
            </Icon>
            <Text fontSize="sm" fontWeight="semibold" color="gray.600">
              Выберите время
            </Text>
          </HStack>

          <HStack gap={2} align="center">
            <ScrollColumn items={HOURS} selected={hour} onSelect={setHour} />
            <Text fontWeight="bold" color="gray.400" fontSize="xl">
              :
            </Text>
            <ScrollColumn
              items={MINUTES}
              selected={minute}
              onSelect={setMinute}
            />
          </HStack>

          <Box
            mt={3}
            bg="purple.500"
            _hover={{ bg: "purple.600" }}
            borderRadius="xl"
            py={2}
            textAlign="center"
            cursor="pointer"
            onClick={() => setTimeOpen(false)}
          >
            <Text fontSize="sm" fontWeight="semibold" color="white">
              Готово
            </Text>
          </Box>
        </Box>
      )}
    </VStack>
  );
};

export default TaskDeadlineField;
