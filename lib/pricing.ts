//lib/pricing

export function calculateFee(type: "TUITION" | "CBT") {
  if (type === "CBT") return 2000;

  if (type === "TUITION") {
    const day = new Date().getDate();

    if (day <= 14) return 13500;
    if (day <= 19) return 9000;
    return 6500;
  }

  return 0;
}
