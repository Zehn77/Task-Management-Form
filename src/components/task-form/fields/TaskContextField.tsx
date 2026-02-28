import { Box, Text, Textarea, VStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import type { TaskFormValues } from "../types/formTypes";

const MAX_LENGTH = 4096;

const TaskContextField = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<TaskFormValues>();

  const value = watch("context") ?? "";
  const hasError = !!errors.context;

  return (
    <VStack align="stretch" gap={1}>
      <Text fontSize="sm" fontWeight="medium" color="gray.500" ml="6">
        Контекст задачи{" "}
        <Text as="span" color="purple.500">
          ★
        </Text>
      </Text>
      <Box
        position="relative"
        borderRadius="3xl"
        borderWidth="2px"
        borderColor={hasError ? "red.400" : "gray.300"}
        _hover={{ borderColor: hasError ? "red.400" : "purple.400" }}
        _focusWithin={{ borderColor: hasError ? "red.400" : "purple.500" }}
        transition="border-color 0.2s"
      >
        <Textarea
          placeholder="Выполнить какую-нибудь задачу"
          {...register("context", {
            required: "Заполните контекст задачи",
            maxLength: {
              value: MAX_LENGTH,
              message: `Максимум ${MAX_LENGTH} символов`,
            },
          })}
          minH="120px"
          borderRadius="3xl"
          border="none"
          _focus={{ outline: "none", boxShadow: "none" }}
          resize="none"
          py={3}
          px={4}
        />
        <Text
          position="absolute"
          bottom={5}
          right={5}
          fontSize="xs"
          color={hasError ? "red.400" : "fg.subtle"}
        >
          {value.length}/{MAX_LENGTH}
        </Text>
      </Box>
      {hasError && (
        <Text fontSize="xs" color="red.500" ml="6">
          {errors.context?.message}
        </Text>
      )}
    </VStack>
  );
};

export default TaskContextField;
