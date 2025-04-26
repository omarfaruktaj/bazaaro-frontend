function formatCurrency(value: number, locale = "en-US", currency = "USD") {
  if (typeof value !== "number") {
    throw new TypeError("Value must be a number");
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default formatCurrency;
