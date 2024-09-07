export function EventDateFormat({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
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
