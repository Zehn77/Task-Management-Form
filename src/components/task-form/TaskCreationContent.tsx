import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import TaskContextField from "./TaskContextField";
import TaskOptions from "./TaskOptions";
import RoutineTaskFields from "./RoutineTaskFields";
import TaskAssigneeField from "./TaskAssigneeField";
import TaskDeadlineField from "./TaskDeadlineField";
import TaskTopicField from "./TaskTopicField";
import TaskTagsField from "./TaskTagsField";
import TaskFilesField from "./TaskFilesField";

const TaskCreationContent = () => {
  const [isRoutine, setIsRoutine] = useState(false);
  const [isTeam, setIsTeam] = useState(false);

  return (
    <VStack align="stretch">
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
    </VStack>
  );
};

export default TaskCreationContent;
