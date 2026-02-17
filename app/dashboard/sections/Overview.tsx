import { getTuitionStatus } from "@/lib/tuition";

export default function Overview({ student }: any) {
  const tuition = getTuitionStatus(student.tuitionPaidAt);

  return (
    <div className="space-y-2">
      <p>
        <strong>Registration No:</strong> {student.registrationNo}
      </p>
      <p>
        <strong>Status:</strong> {student.status}
      </p>
      <p>
        <strong>Exam:</strong> {student.exam}
      </p>

      <p>
        <strong>Tuition:</strong>{" "}
        {tuition.status === "ACTIVE" && (
          <span className="text-green-600">
            Active ({tuition.daysLeft} days left)
          </span>
        )}
        {tuition.status === "EXPIRED" && (
          <span className="text-red-600">
            Expired ({tuition.daysLeft} days ago)
          </span>
        )}
        {tuition.status === "UNPAID" && (
          <span className="text-yellow-600">Not paid</span>
        )}
      </p>
    </div>
  );
}
