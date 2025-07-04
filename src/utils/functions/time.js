export function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}


// função para converter o horário inicial e final em um array de horários
export function timeToMinutes(initialTime, finalTime, interval = 30) {
  const [startHours, startMinutes] = initialTime.split(":").map(Number);
  const [endHours, endMinutes] = finalTime.split(":").map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  const timeSlots = [];
  for (let i = startTotalMinutes; i <= endTotalMinutes; i += interval) {
    timeSlots.push(minutesToTime(i));
  }

  return timeSlots;
}