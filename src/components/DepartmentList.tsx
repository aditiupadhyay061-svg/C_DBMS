import { useState } from 'react';
import { Department, Employee } from '../types';
import Modal from './Modal';

interface DepartmentListProps {
  departments: Department[];
  employees: Employee[];
  onAdd: (dept: Omit<Department, 'departmentId'>) => void;
  onUpdate: (dept: Department) => void;
  onDelete: (id: string) => void;
}

export default function DepartmentList({ departments, employees, onAdd, onUpdate, onDelete }: DepartmentListProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [form, setForm] = useState({ departmentName: '', location: '' });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => {
    setEditingDept(null);
    setForm({ departmentName: '', location: '' });
    setShowModal(true);
  };

  const openEdit = (dept: Department) => {
    setEditingDept(dept);
    setForm({ departmentName: dept.departmentName, location: dept.location });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.departmentName.trim()) return;

    if (editingDept) {
      onUpdate({ ...editingDept, departmentName: form.departmentName, location: form.location });
    } else {
      onAdd({ departmentName: form.departmentName, location: form.location });
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setDeleteConfirm(null);
  };

  const getEmployeeCount = (deptId: string) => employees.filter(e => e.departmentId === deptId).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Departments</h2>
          <p className="text-gray-500 mt-1">Manage company departments and locations</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
        >
          <i className="fas fa-plus"></i>
          Add Department
        </button>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map(dept => (
          <div
            key={dept.departmentId}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                <i className="fas fa-building text-blue-600 text-lg"></i>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(dept)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <i className="fas fa-pen text-xs"></i>
                </button>
                <button
                  onClick={() => setDeleteConfirm(dept.departmentId)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <i className="fas fa-trash text-xs"></i>
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-1">{dept.departmentName}</h3>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
              <i className="fas fa-map-marker-alt text-xs"></i>
              <span>{dept.location || 'No location set'}</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Employees</span>
              <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-sm font-bold">
                {getEmployeeCount(dept.departmentId)}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-mono">DEPT_ID: {dept.departmentId}</p>
            </div>
          </div>
        ))}
      </div>

      {departments.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <i className="fas fa-building text-4xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">No departments yet. Add your first department!</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingDept ? 'Edit Department' : 'Add Department'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Department Name *</label>
            <input
              type="text"
              value={form.departmentName}
              onChange={e => setForm({ ...form, departmentName: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g., Engineering"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g., Boston"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/25"
            >
              {editingDept ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={deleteConfirm !== null} onClose={() => setDeleteConfirm(null)} title="Delete Department">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-red-600"></i>
            </div>
            <p className="text-sm text-red-700">
              Are you sure you want to delete this department? This action cannot be undone.
              Employees in this department will become unassigned.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
