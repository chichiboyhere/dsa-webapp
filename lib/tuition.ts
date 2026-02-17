export function getTuitionStatus(tuitionPaidAt?: Date | null) {
  if (!tuitionPaidAt) {
    return {
      status: "UNPAID",
      daysLeft: 0,
    };
  }

  const paid = new Date(tuitionPaidAt);
  const expiry = new Date(paid);
  expiry.setDate(expiry.getDate() + 30);

  const today = new Date();
  const diff = expiry.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return {
      status: "ACTIVE",
      daysLeft: days,
    };
  }

  return {
    status: "EXPIRED",
    daysLeft: Math.abs(days),
  };
}
