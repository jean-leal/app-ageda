export function priceMask(value) {
  if (!value) return "";

  let cleanValue = value.replace(/\D/g, "");
  let numericValue = (parseInt(cleanValue, 10) / 100).toFixed(2);

  return numericValue.replace(".", ",");
}