export async function GET() {
  const res = await fetch("https://api.paystack.co");
  return new Response("OK");
}
