export function EventDateFormat({
  startDate,
  endDate,
  startTime,
  endTime,
}: {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}) {
  if (startDate === endDate) {
    const date = new Date(endDate).toLocaleDateString("es-EC", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });

    if (startTime) {
      const unformattedTime = startTime?.split(":");
      const time = `${unformattedTime?.[0]}:${unformattedTime?.[1]}`;

      return `${date} - ${time}H`;
    }

    return `${date}`;
  }

  const start = new Date(startDate).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    timeZone: "UTC",
  });
  const end = new Date(endDate).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    timeZone: "UTC",
  });

  if (startTime) {
    const unformattedTime = startTime?.split(":");
    const time = `${unformattedTime?.[0]}:${unformattedTime?.[1]}`;

    return `${start} hasta ${end} - ${time}H`;
  }

  return `${start} hasta ${end}`;
}
