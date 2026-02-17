// /lib/cbtSubjects.ts
export function getCBTSubjects(student: any): string[] {
  const subjects = student.subjects as string[];

  if (student.exam === "JAMB") {
    // exactly 4 subjects
    return subjects.slice(0, 4);
  }

  if (student.exam === "WAEC") {
    const compulsory = ["English", "Mathematics"];
    const electives = subjects.filter((s) => !compulsory.includes(s));

    return [...compulsory, ...electives.slice(0, 3)];
  }

  return [];
}
