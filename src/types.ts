export type JobType = 'Full-time' | 'Part-time' | 'Internship' | 'Remote';
export type JobLevel = 'Intern' | 'Fresher' | 'Junior' | 'Middle' | 'Senior';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  jobType: JobType;
  level: JobLevel;
  category: string;
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  logo: string;
  logoAlt: string;
}
