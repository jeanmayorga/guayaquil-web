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
      timeZone: "UTC",
    });
  }

  const from = new Date(startDate).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    timeZone: "UTC",
  });
  const to = new Date(endDate).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    timeZone: "UTC",
  });

  return `${from} hasta ${to}`;
}
