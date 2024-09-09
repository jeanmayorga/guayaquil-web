export function EventDateFormat({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  if (startDate === endDate) {
    return new Date(endDate).toLocaleDateString("es-EC", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "America/Guayaquil",
    });
  }

  const from = new Date(startDate).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    timeZone: "America/Guayaquil",
  });
  const to = new Date(endDate).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    timeZone: "America/Guayaquil",
  });

  return `${from} hasta ${to}`;
}
