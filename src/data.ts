import { Department, Employee } from './types';

export const initialDepartments: Department[] = [
  { departmentId: 1, departmentName: 'Human Resources', location: 'Mumbai' },
  { departmentId: 2, departmentName: 'Information Technology', location: 'Pune' },
  { departmentId: 3, departmentName: 'Finance', location: 'Mumbai' },
];

export const initialEmployees: Employee[] = [
  { employeeId: 101, employeeName: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', departmentId: 1 },
  { employeeId: 102, employeeName: 'Priya Patil', email: 'priya@example.com', phone: '9876501234', departmentId: 2 },
  { employeeId: 103, employeeName: 'Aarav Mehta', email: 'aarav@example.com', phone: '9876512345', departmentId: 3 },
];
