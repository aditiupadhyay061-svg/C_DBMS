import { useState } from 'react';
import { Department, Employee, Page } from './types';
import { initialDepartments, initialEmployees } from './data';
import Dashboard from './components/Dashboard';
import DepartmentList from './components/DepartmentList';
import EmployeeList from './components/EmployeeList';
import SchemaView from './components/SchemaView';

let deptCounter = 4; // Start after D03

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Department handlers
  const addDepartment = (dept: Omit<Department, 'departmentId'>) => {
    const newId = `D${String(deptCounter).padStart(2, '0')}`;
    deptCounter++;
    setDepartments([...departments, { ...dept, departmentId: newId }]);
  };

  const updateDepartment = (updated: Department) => {
    setDepartments(departments.map(d => d.departmentId === updated.departmentId ? updated : d));
  };

  const deleteDepartment = (id: string) => {
    setDepartments(departments.filter(d => d.departmentId !== id));
    setEmployees(employees.map(e => e.departmentId === id ? { ...e, departmentId: null } : e));
  };

  // Employee handlers
  const addEmployee = (emp: Omit<Employee, 'employeeId'>) => {
    const newId = employees.length > 0 ? Math.max(...employees.map(e => e.employeeId)) + 1 : 1;
    setEmployees([...employees, { ...emp, employeeId: newId }]);
  };

  const updateEmployee = (updated: Employee) => {
    setEmployees(employees.map(e => e.employeeId === updated.employeeId ? updated : e));
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter(e => e.employeeId !== id));
  };

  const navItems: { id: Page; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-th-large' },
    { id: 'departments', label: 'Departments', icon: 'fas fa-building' },
    { id: 'employees', label: 'Employees', icon: 'fas fa-users' },
    { id: 'schema', label: 'DB Schema', icon: 'fas fa-database' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard departments={departments} employees={employees} />;
      case 'departments':
        return (
          <DepartmentList
            departments={departments}
            employees={employees}
            onAdd={addDepartment}
            onUpdate={updateDepartment}
            onDelete={deleteDepartment}
          />
        );
      case 'employees':
        return (
          <EmployeeList
            employees={employees}
            departments={departments}
            onAdd={addEmployee}
            onUpdate={updateEmployee}
            onDelete={deleteEmployee}
          />
        );
      case 'schema':
        return <SchemaView />;
      default:
        return <Dashboard departments={departments} employees={employees} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/80 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-100
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <i className="fas fa-building text-white text-sm"></i>
            </div>
            <div>
              <h1 className="font-bold text-gray-800 text-sm">Company Manager</h1>
              <p className="text-xs text-gray-400">Oracle DB System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${currentPage === item.id
                  ? 'bg-gradient-to-r from-blue-50 to-violet-50 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }
              `}
            >
              <i className={`${item.icon} w-5 text-center ${currentPage === item.id ? 'text-blue-600' : 'text-gray-400'}`}></i>
              {item.label}
              {currentPage === item.id && (
                <div className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <i className="fas fa-info-circle text-blue-500 text-xs"></i>
              <span className="text-xs font-semibold text-gray-600">System Info</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {departments.length} departments • {employees.length} employees
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-100">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
              >
                <i className="fas fa-bars text-gray-600"></i>
              </button>
              <div>
                <h2 className="text-lg font-bold text-gray-800 capitalize">
                  {currentPage === 'schema' ? 'Database Schema' : currentPage}
                </h2>
                <p className="text-xs text-gray-400 hidden sm:block">
                  {currentPage === 'dashboard' && 'Overview of your company data'}
                  {currentPage === 'departments' && 'Manage organizational departments'}
                  {currentPage === 'employees' && 'Manage employee records'}
                  {currentPage === 'schema' && 'Oracle database structure'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 font-medium">Connected</span>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
