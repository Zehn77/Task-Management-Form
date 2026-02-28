import { Tabs } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface TabItem {
  label: string;
  content: ReactNode;
}

interface TaskFormTabsProps {
  tabs: TabItem[];
}

const TaskFormTabs = ({ tabs }: TaskFormTabsProps) => {
  return (
    <Tabs.Root
      defaultValue="tab-0"
      variant="plain"
      px="2"
      py="6"
      css={{
        "--tabs-indicator-bg": "colors.purple.600",
        "--tabs-indicator-radius": "radii.full",
        "--tabs-trigger-radius": "radii.full",
      }}
    >
      <Tabs.List
        bg="transparent"
        borderRadius="full"
        border="1px solid"
        borderColor="purple.200"
        _dark={{ borderColor: "whiteAlpha.200" }}
        width="full"
        display="flex"
        position="relative"
      >
        {tabs.map((tab, index) => (
          <Tabs.Trigger
            key={index}
            value={`tab-${index}`}
            flex="1"
            justifyContent="center"
            py="2"
            zIndex="1"
            color="gray.500"
            _dark={{ color: "gray.400" }}
            _selected={{
              color: "white",
              _dark: { color: "white" },
            }}
            fontSize="sm"
            fontWeight="medium"
            transition="color 0.3s ease"
          >
            {tab.label}
          </Tabs.Trigger>
        ))}

        <Tabs.Indicator
          transitionDuration="300ms"
          transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
        />
      </Tabs.List>

      {tabs.map((tab, index) => (
        <Tabs.Content key={index} value={`tab-${index}`}>
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default TaskFormTabs;
