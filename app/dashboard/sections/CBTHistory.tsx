export default function CBTHistory({ student }: any) {
  const attempts = student.cbtAttempts ?? [];

  return (
    <div className="border rounded p-4 mt-6">
      <h3 className="font-bold mb-2">CBT History</h3>

      {attempts.length === 0 ? (
        <p className="text-sm text-gray-500">No CBT attempts yet</p>
      ) : (
        <ul className="space-y-2">
          {attempts.map((a: any) => (
            <li key={a.id} className="border p-2 rounded">
              <p>
                Score:{" "}
                <strong>
                  {a.score} / {a.total}
                </strong>
              </p>
              <p className="text-sm text-gray-500">
                {new Date(a.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
