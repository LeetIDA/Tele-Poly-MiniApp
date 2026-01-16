export interface Student {
  STUDENT_ID: string;
  E_NAME: string;
  CPR_NO: string | null;
  PB_EMAIL: string | null;
  MOBILE: string | null;
  GENDER: string | null;
  BDATE: string | null;
  CITIZENSHIP: string | null;
  PROFILE_PICTURE: string | null;
  COLLEGE: string | null;
  MAJR1: string | null;
  PERS_EMAIL: string | null;
  SPRADDR_STREET_LINE1: string | null;
  SPRADDR_STREET_LINE2: string | null;
  SPRADDR_STREET_LINE3: string | null;
  SPRADDR_CITY: string | null;
  SPRADDR_ZIP: string | null;
}

export interface SearchResult {
  students: Student[];
  count: number;
}
