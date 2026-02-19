//app/dashboard/sections/Overview.tsx
import { getTuitionStatus } from "@/lib/tuition";
import IDCard from "@/components/dashboard/IDCard";

export default function Overview({ student }: any) {
  const tuition = getTuitionStatus(student.tuitionPaidAt);
  const isApproved = student.status === "ACTIVE" && student.registrationNo;

  return (
    <div className="space-y-2">
      {isApproved ? (
        <section className="animate-in fade-in zoom-in duration-500">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 text-center">
            Digital ID Card
          </h3>
          <IDCard student={student} />
        </section>
      ) : (
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center">
          <p className="text-gray-400 font-medium italic">
            ID Card will be generated once your registration is approved.
          </p>
        </div>
      )}
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
