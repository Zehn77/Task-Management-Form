export interface User {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

export const USERS: User[] = [
  {
    id: 1,
    name: "Алексей Иванов",
    role: "Разработчик",
    avatar: "/avatars/avatar-1.jpg",
  },
  {
    id: 2,
    name: "Мария Смирнова",
    role: "Дизайнер",
    avatar: "/avatars/avatar-2.jpg",
  },
  {
    id: 3,
    name: "Дмитрий Козлов",
    role: "Менеджер",
    avatar: "/avatars/avatar-3.jpg",
  },
  {
    id: 4,
    name: "Екатерина Новикова",
    role: "Тестировщик",
    avatar: "/avatars/avatar-4.jpg",
  },
  {
    id: 5,
    name: "Сергей Морозов",
    role: "Аналитик",
    avatar: "/avatars/avatar-5.jpg",
  },
];

export const TEAMS: User[] = [
  {
    id: 1,
    name: "Команда А",
    role: "Frontend",
    avatar: "/avatars/avatar-1.jpg",
  },
  {
    id: 2,
    name: "Команда Б",
    role: "Backend",
    avatar: "/avatars/avatar-2.jpg",
  },
  { id: 3, name: "Команда В", role: "Design", avatar: "/avatars/avatar-3.jpg" },
  { id: 4, name: "Команда Г", role: "QA", avatar: "/avatars/avatar-4.jpg" },
];
