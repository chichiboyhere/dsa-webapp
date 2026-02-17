import { prisma } from "@/lib/prisma";

export default async function AdminStudentsPage() {
  const students = await prisma.student.findMany({
    include: { payments: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Students</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Paid</th>
            <th>Registered</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-t">
              <td>
                {s.firstName} {s.surname}
              </td>
              <td>{s.email}</td>
              <td>{s.status}</td>
              <td>
                ₦
                {s.payments.length
                  ? s.payments.reduce((sum, p) => sum + p.amount, 0)
                  : 0}
              </td>

              <td>{new Date(s.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
