import { HStack, Switch, Checkbox, Icon } from "@chakra-ui/react";
import { LuInfo } from "react-icons/lu";

interface TaskOptionsProps {
  isRoutine: boolean;
  onRoutineChange: (value: boolean) => void;
  isTeam: boolean;
  onTeamChange: (value: boolean) => void;
}

const TaskOptions = ({
  isRoutine,
  onRoutineChange,
  isTeam,
  onTeamChange,
}: TaskOptionsProps) => {
  return (
    <HStack justify="space-between" py={3}>
      <HStack gap={2}>
        <Switch.Root
          size="lg"
          colorPalette="purple"
          css={{ "--switch-height": "1.75rem" }}
          checked={isTeam}
          onCheckedChange={(e) => onTeamChange(!!e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label fontSize="md" color="gray.400">
            Назначить на команду
          </Switch.Label>
        </Switch.Root>
      </HStack>

      <HStack gap={2}>
        <Checkbox.Root
          size="lg"
          variant="outline"
          colorPalette="purple"
          checked={isRoutine}
          onCheckedChange={(e) => onRoutineChange(!!e.checked)}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="md"
            _checked={{
              bg: "purple.500",
              borderColor: "purple.500",
              color: "white",
            }}
          />
          <Checkbox.Label fontSize="md" color="gray.400">
            Рутинная задача
          </Checkbox.Label>
        </Checkbox.Root>
        <Icon color="purple.500" cursor="pointer" fontSize="lg">
          <LuInfo strokeWidth={2.5} />
        </Icon>
      </HStack>
    </HStack>
  );
};

export default TaskOptions;
