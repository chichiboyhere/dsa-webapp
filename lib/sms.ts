export async function sendApprovalSMS(
  phone: string,
  firstName: string,
  regNo: string,
) {
  const apiKey = process.env.TERMII_API_KEY;
  const senderId = process.env.TERMII_SENDER_ID;

  // Termii expects international format without '+' (e.g., 2348030000000)
  // This helper cleans the phone number
  const formattedPhone = phone.startsWith("0")
    ? `234${phone.slice(1)}`
    : phone.replace("+", "");

  try {
    const response = await fetch("https://api.ng.termii.com/api/sms/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        to: formattedPhone,
        from: senderId,
        sms: `Congratulations ${firstName}! Your registration at DSA is approved. Your Reg No is ${regNo}. Welcome aboard!`,
        type: "plain",
        channel: "generic", // or "dnd" for better delivery
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Termii SMS Error:", error);
    return null;
  }
}
