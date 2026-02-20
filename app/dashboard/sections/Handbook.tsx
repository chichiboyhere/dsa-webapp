//app/dashboard/sections/Handbook.tsx

export const dynamic = "force-dynamic";
export default function Handbook() {
  return (
    <a href="/handbook.pdf" download className="text-blue-600 underline">
      Download Student Handbook
    </a>
  );
}
