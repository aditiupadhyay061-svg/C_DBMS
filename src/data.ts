import { Department, Employee } from './types';

export const initialDepartments: Department[] = [
  { departmentId: 'D01', departmentName: 'DATA SCIENCE', location: 'BOSTON' },
  { departmentId: 'D02', departmentName: 'FINANCE', location: 'CALIFORNIA' },
  { departmentId: 'D03', departmentName: 'RND', location: 'LONDON' },
  { departmentId: 'D04', departmentName: 'MARKETING', location: 'BENGELURU' },
  { departmentId: 'D05', departmentName: 'CYBERCRIME', location: 'NEW YORK' },
];

export const initialEmployees: Employee[] = [
  { employeeId: 908, employeeName: 'GEORGE', email: 'george@yahoo.com', phone: '9876543210', departmentId: 'D02' },
  { employeeId: 345, employeeName: 'LILLY', email: 'lilly23@gmail.com', phone: '9876501234', departmentId: 'D01' },
  { employeeId: 809, employeeName: 'SERAPHINA', email: 'seraph567@gmail.com', phone: '9876512345', departmentId: 'D03' },
  { employeeId: 567, employeeName: 'KAEL', email: 'kael34@gmail.com', phone: '456745656', departmentId: 'D04' },
  { employeeId: 123, employeeName: 'JACK', email: 'jack12@gmail.com', phone: '5663458907', departmentId: 'D05' },
  { employeeId: 789, employeeName: 'ALINA', email: 'alina745@gmail.com', phone: '4557788856', departmentId: 'D05' },
];
