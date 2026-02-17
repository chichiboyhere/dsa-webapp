export type Department = "SCIENCE" | "COMMERCIAL" | "ART";
export type Exam = "WAEC" | "JAMB";

export interface StudentRegistration {
  // Section A
  surname: string;
  firstName: string;
  middleName: string;
  dob: string;
  gender: "MALE" | "FEMALE";
  email: string;
  password: string;
  address: string;
  phone: string;
  nationality: string;
  state: string;
  lga: string;
  photoUrl?: string;

  // Section B
  parentName: string;
  relationship: string;
  parentPhone: string;
  parentAddress: string;

  // Section C
  medicalConditions?: string;
  emergencyName: string;
  emergencyPhone: string;

  // Section D
  department: Department;
  exam: Exam;

  // Section E
  subjects: string[];

  // Agreement
  agreed: boolean;
}
