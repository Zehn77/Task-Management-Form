import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchAssignees } from "../api/assignees";
import type { User } from "../data/users";

const useSearchAssignees = (query: string, isTeam: boolean) => {
  return useQuery<User[]>({
    queryKey: ["assignees", query, isTeam],
    queryFn: () => fetchAssignees(query, isTeam),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};

export default useSearchAssignees;
