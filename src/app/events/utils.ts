export interface Tab {
  name: string;
  key: string;
}
export const tabs: Tab[] = [
  {
    name: "Pasados",
    key: "past",
  },
  {
    name: "Todos",
    key: "all",
  },
  {
    name: "Hoy",
    key: "today",
  },
  // {
  //   name: "Mañana",
  //   key: "tomorrow",
  // },
  {
    name: "Esta semana",
    key: "this_week",
  },
  // {
  //   name: "Siguiente semana",
  //   key: "next_week",
  // },
  {
    name: "Este mes",
    key: "this_month",
  },
  // {
  //   name: "Siguiente mes",
  //   key: "next_month",
  // },
];
