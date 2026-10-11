export interface Department {
  departmentId: string;
  departmentName: string;
  location: string;
}

export interface Employee {
  employeeId: number;
  employeeName: string;
  email: string;
  phone: string;
  departmentId: string | null;
}

export type Page = 'dashboard' | 'departments' | 'employees' | 'schema';
