import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import TaskContextField from "./fields/TaskContextField";
import TaskOptions from "./fields/TaskOptions";
import RoutineTaskFields from "./fields/RoutineTaskFields";
import TaskAssigneeField from "./fields/TaskAssigneeField";
import TaskDeadlineField from "./fields/TaskDeadlineField";
import TaskTopicField from "./fields/TaskTopicField";
import TaskTagsField from "./fields/TaskTagsField";
import TaskFilesField from "./fields/TaskFilesField";

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
