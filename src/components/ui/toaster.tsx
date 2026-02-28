import { Toaster as ChakraToaster, Toast, Stack } from "@chakra-ui/react";
import { toaster } from "./toaster-instance";

export const Toaster = () => (
  <ChakraToaster toaster={toaster}>
    {(toast) => (
      <Toast.Root width="sm">
        <Toast.Indicator />
        <Stack gap="1" flex="1">
          {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
          {toast.description && (
            <Toast.Description>{toast.description}</Toast.Description>
          )}
        </Stack>
        <Toast.CloseTrigger />
      </Toast.Root>
    )}
  </ChakraToaster>
);
