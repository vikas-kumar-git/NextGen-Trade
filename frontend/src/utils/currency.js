export function getCurrencySymbol(ticker = "") {
  const normalizedTicker = ticker.toUpperCase();

  if (
    normalizedTicker.endsWith(".NS") ||
    normalizedTicker.endsWith(".BO")
  ) {
    return "₹";
  }

  return "$";
}

export function formatCurrencyValue(value, ticker = "") {
  if (typeof value !== "number") {
    return value;
  }

  return `${getCurrencySymbol(ticker)}${value}`;
}
