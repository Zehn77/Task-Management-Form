import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LuChevronDown, LuX } from "react-icons/lu";
import useClickOutside from "../../../hooks/useClickOutside";
import { TAGS } from "../../../data/tags";
import type { Tag } from "../../../data/tags";

const TagPill = ({
  tag,
  onRemove,
}: {
  tag: Tag;
  onRemove?: (e: React.MouseEvent) => void;
}) => (
  <HStack bg={tag.bg} borderRadius="full" px={3} py={1} gap={1} flexShrink={0}>
    <Text fontSize="sm" fontWeight="medium" color="white">
      {tag.label}
    </Text>
    {onRemove && (
      <Icon
        color="whiteAlpha.800"
        cursor="pointer"
        fontSize="xs"
        onClick={onRemove}
      >
        <LuX />
      </Icon>
    )}
  </HStack>
);

const TaskTagsField = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Tag[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const toggle = (tag: Tag) => {
    setSelected((prev) =>
      prev.find((t) => t.label === tag.label)
        ? prev.filter((t) => t.label !== tag.label)
        : [...prev, tag],
    );
  };

  const remove = (tag: Tag, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected((prev) => prev.filter((t) => t.label !== tag.label));
  };

  return (
    <VStack align="stretch" gap={1} position="relative" ref={ref}>
      <Text fontSize="sm" fontWeight="medium" color="gray.500" ml="6">
        Теги
      </Text>

      <HStack
        borderRadius="3xl"
        borderWidth="2px"
        borderColor={open ? "purple.500" : "gray.300"}
        _hover={{ borderColor: "purple.400" }}
        px={4}
        py={selected.length > 0 ? 2 : 2.5}
        cursor="pointer"
        justify="space-between"
        align="center"
        gap={2}
        onClick={() => setOpen((o) => !o)}
      >
        <HStack flex={1} flexWrap="wrap" gap={2} minH="28px" align="center">
          {selected.length === 0 ? (
            <Text fontSize="md" color="gray.400">
              Укажите соответствующие теги
            </Text>
          ) : (
            selected.map((tag) => (
              <TagPill
                key={tag.label}
                tag={tag}
                onRemove={(e) => remove(tag, e)}
              />
            ))
          )}
        </HStack>
        <Icon
          color="purple.500"
          flexShrink={0}
          transition="transform 0.2s"
          transform={open ? "rotate(180deg)" : "rotate(0deg)"}
        >
          <LuChevronDown strokeWidth={2.5} />
        </Icon>
      </HStack>

      {open && (
        <Box
          position="absolute"
          bottom="calc(100% + 6px)"
          left={0}
          right={0}
          zIndex={100}
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderRadius="2xl"
          borderWidth="1.5px"
          borderColor="purple.200"
          boxShadow="lg"
          p={3}
        >
          <HStack flexWrap="wrap" gap={2}>
            {TAGS.map((tag) => {
              const isSelected = !!selected.find((t) => t.label === tag.label);
              return (
                <Box
                  key={tag.label}
                  onClick={() => toggle(tag)}
                  opacity={isSelected ? 0.5 : 1}
                  transition="opacity 0.15s"
                  cursor="pointer"
                >
                  <TagPill tag={tag} />
                </Box>
              );
            })}
          </HStack>
        </Box>
      )}
    </VStack>
  );
};

export default TaskTagsField;
