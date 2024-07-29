export const calculateConsecutiveDays = dates => {
  if (dates.length === 0) return 0;

  const sortedDates = dates.sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );
  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i]);
    const previousDate = new Date(sortedDates[i - 1]);

    const diffInTime = currentDate.getTime() - previousDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    if (diffInDays === 1) {
      currentStreak += 1;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return maxStreak;
};
