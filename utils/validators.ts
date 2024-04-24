export default {
  verifyDate: (data: Date): boolean =>
    data.getHours() >= 8 &&
    data.getHours() <= 17 &&
    data.getMinutes() % 30 === 0,
  verifyDuration: (duration: number) => duration % 10 === 0,
};
