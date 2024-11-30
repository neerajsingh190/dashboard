

import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee, updateEmployee } from '../services/employeeService';

const styles = {
  container: {
    padding: '20px',
    width: '100%',
    overflow: 'auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  title: {
    fontSize: '24px',
    color: '#2d3748',
    margin: '0'
  },
  searchInput: {
    padding: '10px 16px',
    borderRadius: '4px',
    border: '1px solid #e2e8f0',
    width: '300px',
    fontSize: '14px',
    marginBottom: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  th: {
    backgroundColor: '#f8fafc',
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568',
    borderBottom: '2px solid #e2e8f0'
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '14px',
    color: '#4a5568'
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    marginTop: '24px',
    padding: '16px'
  },
  pageButton: {
    padding: '8px 16px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  },
  pageInfo: {
    fontSize: '14px',
    color: '#4a5568'
  },
  disabledButton: {
    backgroundColor: '#CBD5E0',
    cursor: 'not-allowed'
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  noData: {
    textAlign: 'center',
    padding: '24px',
    color: '#4a5568',
    backgroundColor: '#f8fafc'
  }
};

// Add hover effects
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .table-row:hover {
    background-color: #f8fafc;
  }
  
  .delete-btn:hover {
    background-color: #DC2626;
  }
  
  .page-btn:hover:not(:disabled) {
    background-color: #357ABD;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #4A90E2;
    box-shadow: 0 0 0 1px #4A90E2;
  }
`;
document.head.appendChild(styleSheet);

// Modal styles
const modalStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: '1000'
};

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '400px'
};

const EmployeeList = ({ refreshList }) => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, [page, search, refreshList]);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees(page, search);
      setEmployees(response.employees);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await updateEmployee(selectedEmployee);
      setShowEditModal(false);
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Employee List</h2>
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
          className="search-input"
        />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Mobile</th>
            <th style={styles.th}>Designation</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>Course</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id} className="table-row">
                <td style={styles.td}>
                  <img
                    src={employee.image}
                    alt={employee.name}
                    style={styles.profileImage}
                  />
                </td>
                <td style={styles.td}>{employee.name}</td>
                <td style={styles.td}>{employee.email}</td>
                <td style={styles.td}>{employee.mobile}</td>
                <td style={styles.td}>{employee.designation}</td>
                <td style={styles.td}>{employee.gender}</td>
                <td style={styles.td}>{employee.course.join(', ')}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleEdit(employee)}
                    style={styles.deleteButton}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    style={styles.deleteButton}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={styles.noData}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{
            ...styles.pageButton,
            ...(page === 1 ? styles.disabledButton : {})
          }}
          className="page-btn"
        >
          Previous
        </button>
        <span style={styles.pageInfo}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          style={{
            ...styles.pageButton,
            ...(page === totalPages ? styles.disabledButton : {})
          }}
          className="page-btn"
        >
          Next
        </button>
      </div>

      Edit Modal
      {showEditModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h3>Edit Employee</h3>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={selectedEmployee.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={selectedEmployee.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Mobile</label>
              <input
                type="text"
                name="mobile"
                value={selectedEmployee.mobile}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                value={selectedEmployee.designation}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Gender</label>
              <input
                type="text"
                name="gender"
                value={selectedEmployee.gender}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Course</label>
              <input
                type="text"
                name="course"
                value={selectedEmployee.course.join(', ')}
                onChange={handleChange}
              />
            </div>
            <button onClick={handleUpdate}>Submit</button>
            <button onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default EmployeeList;
