import { Department, Employee } from '../types';

interface DashboardProps {
  departments: Department[];
  employees: Employee[];
}

export default function Dashboard({ departments, employees }: DashboardProps) {
  const locationCounts = departments.reduce((acc, dept) => {
    acc[dept.location] = (acc[dept.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const deptEmployeeCounts = departments.map(dept => ({
    ...dept,
    employeeCount: employees.filter(e => e.departmentId === dept.departmentId).length,
  }));

  const unassigned = employees.filter(e => e.departmentId === null).length;

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/25">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Departments</p>
              <p className="text-3xl font-bold mt-1">{departments.length}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-building text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/25">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Total Employees</p>
              <p className="text-3xl font-bold mt-1">{employees.length}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-users text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-6 text-white shadow-lg shadow-violet-500/25">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-violet-100 text-sm font-medium">Locations</p>
              <p className="text-3xl font-bold mt-1">{Object.keys(locationCounts).length}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-map-marker-alt text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg shadow-amber-500/25">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium">Unassigned</p>
              <p className="text-3xl font-bold mt-1">{unassigned}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-user-plus text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Department Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-chart-bar text-blue-500"></i>
            Department Overview
          </h3>
          <div className="space-y-4">
            {deptEmployeeCounts.map(dept => (
              <div key={dept.departmentId} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{dept.departmentName}</span>
                    <span className="text-sm text-gray-500">{dept.employeeCount} employees</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${employees.length > 0 ? (dept.employeeCount / employees.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-map text-emerald-500"></i>
            Locations
          </h3>
          <div className="space-y-3">
            {Object.entries(locationCounts).map(([location, count]) => (
              <div key={location} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-city text-emerald-600"></i>
                  </div>
                  <span className="font-medium text-gray-700">{location}</span>
                </div>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {count} dept{count !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Employees */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i className="fas fa-user-friends text-violet-500"></i>
          Employee Directory
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Department</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => {
                const dept = departments.find(d => d.departmentId === emp.departmentId);
                return (
                  <tr key={emp.employeeId} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {emp.employeeName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{emp.employeeName}</p>
                          <p className="text-xs text-gray-400">ID: {emp.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{emp.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{emp.phone}</td>
                    <td className="py-3 px-4">
                      {dept ? (
                        <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                          {dept.departmentName}
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-lg text-xs font-semibold">
                          Unassigned
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
