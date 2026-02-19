// export function getTuitionStatus(tuitionPaidAt?: Date | null) {
//   if (!tuitionPaidAt) {
//     return {
//       status: "UNPAID",
//       daysLeft: 0,
//     };
//   }

//   const paid = new Date(tuitionPaidAt);
//   const expiry = new Date(paid);
//   expiry.setDate(expiry.getDate() + 30);

//   const today = new Date();
//   const diff = expiry.getTime() - today.getTime();
//   const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

//   if (days > 0) {
//     return {
//       status: "ACTIVE",
//       daysLeft: days,
//     };
//   }

//   return {
//     status: "EXPIRED",
//     daysLeft: Math.abs(days),
//   };
// }

export function getTuitionStatus(tuitionPaidAt?: Date | null) {
  if (!tuitionPaidAt) {
    return {
      status: "UNPAID",
      daysLeft: 0,
    };
  }

  const today = new Date();
  const paidDate = new Date(tuitionPaidAt);

  // 1. Check if the payment was made in the current month/year
  const isCurrentMonth =
    paidDate.getMonth() === today.getMonth() &&
    paidDate.getFullYear() === today.getFullYear();

  if (!isCurrentMonth) {
    return {
      status: "EXPIRED",
      daysLeft: 0,
    };
  }

  // 2. Calculate the last day of the current month
  // Setting day to 0 of the next month gives us the last day of current month
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // 3. Calculate difference in days
  // We use Math.max(0, ...) to ensure we don't show negative days on the very last day
  const diffTime = lastDayOfMonth.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    status: "ACTIVE",
    daysLeft: daysLeft >= 0 ? daysLeft : 0,
  };
}
