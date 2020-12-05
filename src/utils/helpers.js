export function calculateDateDifference(createdAt) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(createdAt);
  const secondDate = new Date();

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return diffDays;
}
