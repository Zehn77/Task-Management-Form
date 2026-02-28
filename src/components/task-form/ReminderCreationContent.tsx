import { VStack, Icon, Text } from "@chakra-ui/react";
import { LuBellOff } from "react-icons/lu";

const ReminderCreationContent = () => {
  return (
    <VStack py={10} gap={3} color="fg.muted">
      <Icon fontSize="4xl" color="fg.subtle">
        <LuBellOff />
      </Icon>
      <Text fontSize="md" fontWeight="medium" color="fg.subtle">
        Нет напоминаний
      </Text>
      <Text fontSize="sm" color="fg.subtle">
        Здесь пока ничего нет. Создайте первое напоминание.
      </Text>
    </VStack>
  );
};

export default ReminderCreationContent;
