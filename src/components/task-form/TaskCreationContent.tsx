import { Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TaskContextField from "./fields/TaskContextField";
import TaskOptions from "./fields/TaskOptions";
import RoutineTaskFields from "./fields/RoutineTaskFields";
import TaskAssigneeField from "./fields/TaskAssigneeField";
import TaskDeadlineField from "./fields/TaskDeadlineField";
import TaskTopicField from "./fields/TaskTopicField";
import TaskTagsField from "./fields/TaskTagsField";
import TaskFilesField from "./fields/TaskFilesField";
import type { TaskFormValues } from "./types/formTypes";

const TaskCreationContent = () => {
  const [isRoutine, setIsRoutine] = useState(false);
  const [isTeam, setIsTeam] = useState(false);

  const methods = useForm<TaskFormValues>({
    shouldUnregister: true,
    defaultValues: { context: "", routineName: "", periodicity: [] },
  });

  const onSubmit = methods.handleSubmit((data) => {
    console.log("Form submitted:", data);
  });

  return (
    <FormProvider {...methods}>
      <VStack align="stretch" as="form" onSubmit={onSubmit}>
        <TaskContextField />

        <TaskOptions
          isRoutine={isRoutine}
          onRoutineChange={setIsRoutine}
          isTeam={isTeam}
          onTeamChange={setIsTeam}
        />

        {isRoutine && <RoutineTaskFields />}

        <TaskAssigneeField key={isTeam ? "team" : "user"} isTeam={isTeam} />

        <TaskDeadlineField />

        <TaskTopicField />

        <TaskTagsField />

        <TaskFilesField />

        <Button
          type="submit"
          colorPalette="purple"
          borderRadius="full"
          size="lg"
          mt={2}
        >
          Создать задачу
        </Button>
      </VStack>
    </FormProvider>
  );
};

export default TaskCreationContent;
