export type OpportunityType = 'Internship' | 'Full-time' | 'Scholarship';

export interface Opportunity {
  id: number;
  title: string;
  company: string;
  location: string;
  type: OpportunityType;
  stipend: string;
  deadline: string;
  skills: string[];
}
