export function getCBTStatus(cbtExpiresAt?: Date | null) {
  if (!cbtExpiresAt) {
    return { status: "NOT_PAID" };
  }

  const now = new Date();
  const expiry = new Date(cbtExpiresAt);

  if (now > expiry) {
    return { status: "EXPIRED" };
  }

  const daysLeft = Math.ceil(
    (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  return { status: "ACTIVE", daysLeft };
}
