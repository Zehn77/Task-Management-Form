import { Box } from "@chakra-ui/react";
import { TaskFormHeader } from "./TaskFormHeader";

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
    </Box>
  );
};
