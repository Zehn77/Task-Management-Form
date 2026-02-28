import { Box } from "@chakra-ui/react";
import { TaskFormHeader } from "./layout/TaskFormHeader";
import TaskFormTabs from "./layout/TaskFormTabs";
import TaskCreationContent from "./TaskCreationContent";
import ReminderCreationContent from "./ReminderCreationContent";

export const TaskForm = () => {
  return (
    <Box
      bg="bg.panel"
      borderRadius="4xl"
      px={6}
      py={4}
      shadow="xl"
      mx="auto"
      borderWidth="1px"
    >
      <TaskFormHeader title="Создание задачи" />

      <TaskFormTabs
        tabs={[
          {
            label: "Создание задачи",
            content: <TaskCreationContent />,
          },
          {
            label: "Создание напоминания",
            content: <ReminderCreationContent />,
          },
        ]}
      />
    </Box>
  );
};
