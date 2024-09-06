interface Props {
  startDate: string;
  endDate: string;
}

export function EventDateFormat({ startDate, endDate }: Props) {
  if (startDate === endDate) {
    return new Date(endDate).toLocaleDateString("es-LA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  const from = new Date(startDate).toLocaleDateString("es-LA", {
    day: "2-digit",
    month: "long",
  });
  const to = new Date(endDate).toLocaleDateString("es-LA", {
    day: "2-digit",
    month: "long",
  });

  return `${from} hasta ${to}`;
}
