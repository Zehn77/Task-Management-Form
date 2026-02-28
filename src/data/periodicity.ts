import { createListCollection } from "@chakra-ui/react";

export const periodicityOptions = createListCollection({
  items: [
    { label: "Ежедневно", value: "daily" },
    { label: "Еженедельно", value: "weekly" },
    { label: "Ежемесячно", value: "monthly" },
    { label: "Ежегодно", value: "yearly" },
  ],
});
