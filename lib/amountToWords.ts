import { toWords } from "number-to-words";

export function convertToWords(amount: number) {
  try {
    const words = toWords(amount);
    // Capitalize first letter and format
    return words.charAt(0).toUpperCase() + words.slice(1) + " Naira Only";
  } catch (e) {
    return `${amount.toLocaleString()} Naira Only`;
  }
}
