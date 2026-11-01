export interface StudentProfileFormData {
  fullName: string;
  college: string;
  branch: string;
  graduationYear: string;
  cgpa: string;
}

export type ProfileFieldErrors = Partial<Record<keyof StudentProfileFormData, string>>;
