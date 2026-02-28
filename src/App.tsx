import { Container, Box } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Toaster } from "@/components/ui/toaster";
import { TaskForm } from "./components/task-form";

function App() {
  return (
    <Box minH="100vh" bg="bg.canvas" transition="background 0.2s">
      <Box position="fixed" top="4" right="4" zIndex="sticky">
        <ColorModeButton />
      </Box>

      <Container maxW="3xl" py="10">
        <TaskForm />
      </Container>

      <Toaster />
    </Box>
  );
}

export default App;
