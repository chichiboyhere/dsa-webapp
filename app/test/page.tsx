import { prisma } from "@/lib/prisma";

export default async function TestPage() {
  const count = await prisma.user.count();

  return (
    <div className="p-10">
      <h1>DB Connected!</h1>
      <p>Total users: {count}</p>
    </div>
  );
}
