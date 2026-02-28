import { Box, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Portal, Select } from "@chakra-ui/react";
import { periodicityOptions } from "../../../data/periodicity";
import type { TaskFormValues } from "../types/formTypes";

const NAME_MAX_LENGTH = 255;
const DESC_MAX_LENGTH = 1024;

const RoutineTaskFields = () => {
  const [description, setDescription] = useState("");

  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext<TaskFormValues>();

  const nameValue = watch("routineName") ?? "";

  return (
    <Box
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="purple.400"
      borderRadius="3xl"
      p={5}
    >
      <VStack align="stretch" gap={4}>
        {/* Routine name */}
        <VStack align="stretch" gap={1}>
          <Text fontSize="sm" fontWeight="medium" color="gray.500" ml={3}>
            Название рутинной задачи{" "}
            <Text as="span" color="purple.500">
              ★
            </Text>
          </Text>
          <Box position="relative">
            <Input
              placeholder="Укажите название рутинной задачи"
              {...register("routineName", {
                required: "Укажите название",
                maxLength: {
                  value: NAME_MAX_LENGTH,
                  message: `Максимум ${NAME_MAX_LENGTH} символов`,
                },
              })}
              borderRadius="3xl"
              pr="16"
              borderColor={errors.routineName ? "red.400" : undefined}
              _hover={{
                borderColor: errors.routineName ? "red.400" : "purple.400",
              }}
              focusRing="2px"
              focusRingColor={errors.routineName ? "red.400" : "purple.500"}
              _focus={{
                borderColor: errors.routineName ? "red.400" : "purple.500",
              }}
              transition="all 0.2s"
            />
            <Text
              position="absolute"
              top="50%"
              right={4}
              transform="translateY(-50%)"
              fontSize="xs"
              color={errors.routineName ? "red.400" : "gray.400"}
            >
              {nameValue.length}/{NAME_MAX_LENGTH}
            </Text>
          </Box>
          {errors.routineName && (
            <Text fontSize="xs" color="red.500" ml={3}>
              {errors.routineName.message}
            </Text>
          )}
        </VStack>

        {/* Periodicity */}
        <VStack align="stretch" gap={1}>
          <Text fontSize="sm" fontWeight="medium" color="gray.500" ml={3}>
            Периодичность{" "}
            <Text as="span" color="purple.500">
              ★
            </Text>
          </Text>
          <Controller
            name="periodicity"
            control={control}
            rules={{
              validate: (v) => (v && v.length > 0) || "Выберите периодичность",
            }}
            render={({ field }) => (
              <Select.Root
                collection={periodicityOptions}
                size="md"
                width="full"
                value={field.value}
                onValueChange={(details) => field.onChange(details.value)}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger
                    borderRadius="3xl"
                    px="4"
                    borderColor={errors.periodicity ? "red.400" : "gray.200"}
                    _dark={{ borderColor: "whiteAlpha.300" }}
                    _focus={{
                      borderColor: errors.periodicity
                        ? "red.400"
                        : "purple.500",
                      ring: "1px",
                      ringColor: errors.periodicity ? "red.400" : "purple.500",
                    }}
                  >
                    <Select.ValueText placeholder="Выберите периодичность" />
                    <Select.Indicator />
                  </Select.Trigger>
                </Select.Control>

                <Portal>
                  <Select.Positioner>
                    <Select.Content
                      borderRadius="2xl"
                      boxShadow="lg"
                      _dark={{ bg: "gray.800" }}
                    >
                      {periodicityOptions.items.map(
                        (item: { label: string; value: string }) => (
                          <Select.Item
                            key={item.value}
                            item={item}
                            borderRadius="lg"
                            mx="2"
                            my="1"
                          >
                            <Select.ItemText>{item.label}</Select.ItemText>
                            <Select.ItemIndicator />
                          </Select.Item>
                        ),
                      )}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            )}
          />
          {errors.periodicity && (
            <Text fontSize="xs" color="red.500" ml={3}>
              {errors.periodicity.message}
            </Text>
          )}
        </VStack>

        {/* Description — optional, local state */}
        <VStack align="stretch" gap={1}>
          <Text fontSize="sm" fontWeight="medium" color="gray.500" ml={3}>
            Описание
          </Text>
          <Box
            position="relative"
            borderRadius="3xl"
            borderWidth="2px"
            borderColor="gray.300"
            _hover={{ borderColor: "purple.400" }}
            _focusWithin={{ borderColor: "purple.500" }}
            transition="border-color 0.2s"
          >
            <Textarea
              placeholder="Описание рутинной задачи"
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= DESC_MAX_LENGTH) {
                  setDescription(e.target.value);
                }
              }}
              minH="120px"
              borderRadius="3xl"
              border="none"
              _focus={{ outline: "none", boxShadow: "none" }}
              resize="none"
              pb={8}
            />
            <Text
              position="absolute"
              bottom={5}
              right={6}
              fontSize="xs"
              color="fg.subtle"
            >
              {description.length}/{DESC_MAX_LENGTH}
            </Text>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};

export default RoutineTaskFields;
