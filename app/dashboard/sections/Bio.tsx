export default function Bio({ student }: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <p>
        <strong>Full Name:</strong> {student.firstName} {student.surname}
      </p>
      <p>
        <strong>Email:</strong> {student.email}
      </p>
      <p>
        <strong>Phone:</strong> {student.phone}
      </p>
      <p>
        <strong>Gender:</strong> {student.gender}
      </p>
      <p>
        <strong>State:</strong> {student.state}
      </p>
      <p>
        <strong>LGA:</strong> {student.lga}
      </p>
    </div>
  );
}
