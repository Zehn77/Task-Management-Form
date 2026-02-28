import { USERS, TEAMS } from "../data/users";
import type { User } from "../data/users";

const simulateDelay = () =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, 300 + Math.random() * 200),
  );

export const fetchAssignees = async (
  query: string,
  isTeam: boolean,
): Promise<User[]> => {
  await simulateDelay();

  const list = isTeam ? TEAMS : USERS;
  return list.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
};
