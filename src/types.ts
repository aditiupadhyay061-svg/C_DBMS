export interface Department {
  departmentId: number;
  departmentName: string;
  location: string;
}

export interface Employee {
  employeeId: number;
  employeeName: string;
  email: string;
  phone: string;
  departmentId: number | null;
}

export type Page = 'dashboard' | 'departments' | 'employees' | 'schema';
