import { Container, Box, Flex } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { TaskForm } from "./components/task-form";

function App() {
  return (
    <Box minH="100vh" bg="bg.canvas" transition="background 0.2s">
      <Flex justify="flex-end" p="4">
        <ColorModeButton />
      </Flex>

      <Container maxW="3xl" py="10">
        <TaskForm />
      </Container>
    </Box>
  );
}

export default App;
