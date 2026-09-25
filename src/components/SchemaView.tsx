export default function SchemaView() {
  const schemaSQL = `-- COMPANY MANAGEMENT SYSTEM - ORACLE DATABASE

CREATE TABLE DEPARTMENT (
    DEPARTMENT_ID VARCHAR2(10) PRIMARY KEY,
    DEPARTMENT_NAME VARCHAR2(100) NOT NULL,
    LOCATION VARCHAR2(100)
);

CREATE TABLE EMPLOYEE (
    EMPLOYEE_ID NUMBER PRIMARY KEY,
    EMPLOYEE_NAME VARCHAR2(100) NOT NULL,
    EMAIL VARCHAR2(150),
    PHONE VARCHAR2(20),
    DEPARTMENT_ID VARCHAR2(10),
    CONSTRAINT FK_EMP_DEPT FOREIGN KEY (DEPARTMENT_ID)
        REFERENCES DEPARTMENT(DEPARTMENT_ID)
);

-- Sample data
INSERT INTO DEPARTMENT VALUES ('D01', 'DATA SCIENCE', 'BOSTON');
INSERT INTO DEPARTMENT VALUES ('D02', 'FINANCE', 'CALIFORNIA');
INSERT INTO DEPARTMENT VALUES ('D03', 'RND', 'LONDON');

INSERT INTO EMPLOYEE VALUES (908, 'GEORGE', 'george@yahoo.com', '9876543210', 'D02');
INSERT INTO EMPLOYEE VALUES (345, 'LILLY', 'lilly23@gmail.com', '9876501234', 'D01');
INSERT INTO EMPLOYEE VALUES (809, 'SERAPHINA', 'seraph567@gmail.com', '9876512345', 'D03');
INSERT INTO EMPLOYEE VALUES (567, 'KAEL', 'kael34@gmail.com', '456745656', 'D01');

COMMIT;`;

  const tables = [
    {
      name: 'DEPARTMENT',
      columns: [
        { name: 'DEPARTMENT_ID', type: 'VARCHAR2(10)', constraint: 'PRIMARY KEY' },
        { name: 'DEPARTMENT_NAME', type: 'VARCHAR2(100)', constraint: 'NOT NULL' },
        { name: 'LOCATION', type: 'VARCHAR2(100)', constraint: '' },
      ],
    },
    {
      name: 'EMPLOYEE',
      columns: [
        { name: 'EMPLOYEE_ID', type: 'NUMBER', constraint: 'PRIMARY KEY' },
        { name: 'EMPLOYEE_NAME', type: 'VARCHAR2(100)', constraint: 'NOT NULL' },
        { name: 'EMAIL', type: 'VARCHAR2(150)', constraint: '' },
        { name: 'PHONE', type: 'VARCHAR2(20)', constraint: '' },
        { name: 'DEPARTMENT_ID', type: 'VARCHAR2(10)', constraint: 'FOREIGN KEY → DEPARTMENT' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Database Schema</h2>
        <p className="text-gray-500 mt-1">Oracle database structure and SQL definitions</p>
      </div>

      {/* Relationship Diagram */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i className="fas fa-project-diagram text-violet-500"></i>
          Entity Relationship
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 w-64">
            <div className="flex items-center gap-2 mb-3">
              <i className="fas fa-table text-blue-600"></i>
              <span className="font-bold text-blue-800">DEPARTMENT</span>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2">
                <i className="fas fa-key text-amber-500 text-xs"></i>
                <span className="font-mono text-blue-700">DEPARTMENT_ID</span>
                <span className="text-xs text-gray-400 ml-auto">VARCHAR2</span>
              </div>
              <div className="flex items-center gap-2 pl-5">
                <span className="font-mono text-gray-600">DEPARTMENT_NAME</span>
              </div>
              <div className="flex items-center gap-2 pl-5">
                <span className="font-mono text-gray-600">LOCATION</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="hidden md:flex items-center">
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="w-3 h-3 border-t-2 border-r-2 border-gray-300 rotate-45 -ml-1"></div>
            </div>
            <div className="md:hidden flex flex-col items-center">
              <div className="w-0.5 h-8 bg-gray-300"></div>
              <div className="w-3 h-3 border-b-2 border-r-2 border-gray-300 rotate-45 -mt-1"></div>
            </div>
            <span className="text-xs text-gray-400 mt-1 font-medium">1 : N</span>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-5 w-64">
            <div className="flex items-center gap-2 mb-3">
              <i className="fas fa-table text-emerald-600"></i>
              <span className="font-bold text-emerald-800">EMPLOYEE</span>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2">
                <i className="fas fa-key text-amber-500 text-xs"></i>
                <span className="font-mono text-emerald-700">EMPLOYEE_ID</span>
                <span className="text-xs text-gray-400 ml-auto">NUMBER</span>
              </div>
              <div className="flex items-center gap-2 pl-5">
                <span className="font-mono text-gray-600">EMPLOYEE_NAME</span>
              </div>
              <div className="flex items-center gap-2 pl-5">
                <span className="font-mono text-gray-600">EMAIL</span>
              </div>
              <div className="flex items-center gap-2 pl-5">
                <span className="font-mono text-gray-600">PHONE</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-link text-violet-500 text-xs"></i>
                <span className="font-mono text-violet-700">DEPARTMENT_ID</span>
                <span className="text-xs text-gray-400 ml-auto">VARCHAR2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tables.map(table => (
          <div key={table.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-5 py-3">
              <h4 className="text-white font-bold font-mono flex items-center gap-2">
                <i className="fas fa-database text-blue-400"></i>
                {table.name}
              </h4>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase">Column</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase">Constraint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {table.columns.map(col => (
                  <tr key={col.name} className="hover:bg-gray-50/50">
                    <td className="py-2.5 px-4 font-mono text-sm text-gray-800 font-medium">{col.name}</td>
                    <td className="py-2.5 px-4 font-mono text-sm text-blue-600">{col.type}</td>
                    <td className="py-2.5 px-4">
                      {col.constraint && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          col.constraint.includes('PRIMARY') ? 'bg-amber-100 text-amber-700' :
                          col.constraint.includes('FOREIGN') ? 'bg-violet-100 text-violet-700' :
                          col.constraint.includes('NOT NULL') ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {col.constraint}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* SQL Code */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900 px-5 py-3">
          <h4 className="text-white font-bold flex items-center gap-2">
            <i className="fas fa-code text-green-400"></i>
            SQL Script
          </h4>
          <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">Oracle SQL</span>
        </div>
        <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-700 font-mono">
            {schemaSQL.split('\n').map((line, i) => (
              <div key={i} className="flex">
                <span className="text-gray-300 select-none w-8 text-right mr-4 text-xs leading-relaxed">{i + 1}</span>
                <span className={
                  line.startsWith('--') ? 'text-green-600' :
                  line.match(/^(CREATE|INSERT|COMMIT|ALTER|DROP)/) ? 'text-blue-600 font-semibold' :
                  line.includes('PRIMARY KEY') || line.includes('FOREIGN KEY') || line.includes('NOT NULL') ? 'text-amber-600' :
                  line.includes('REFERENCES') ? 'text-violet-600' :
                  'text-gray-700'
                }>
                  {line || '\u00A0'}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
