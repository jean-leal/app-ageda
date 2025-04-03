export const maskTime = (input) => {
  let cleaned = input.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cleaned.length > 4) cleaned = cleaned.slice(0, 4); // Limita a 4 números

  let formatted = cleaned;
  if (cleaned.length >= 3) {
    formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2)}`;
  }

  return formatted;
};
