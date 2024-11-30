export const getResultMessage = (intensitity: number) => {
  if (intensitity === 0) {
    return "Negative with a high probability";
  } else if (intensitity < 20) {
    return "Positive with a small probability";
  } else if (intensitity < 50) {
    return "Positive with a moderate probability";
  } else if (intensitity < 100) {
    return "Positive with a high probability";
  }

  return "Positive with a very high probability";
};
