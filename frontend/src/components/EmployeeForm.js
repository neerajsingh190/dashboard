

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../services/employeeService';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a5568',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '4px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
  },
  select: {
    padding: '10px 12px',
    borderRadius: '4px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    width: '100%',
    backgroundColor: 'white',
    outline: 'none',
  },
  radioGroup: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  checkboxGroup: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  fileInput: {
    padding: '10px 0',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#2d3748',
    marginBottom: '12px',
  }
};

// Add hover and focus styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  input:focus, select:focus {
    border-color: #4A90E2;
    box-shadow: 0 0 0 1px #4A90E2;
  }
  
  button:hover {
    background-color: #357ABD;
  }
  
  .radio-input, .checkbox-input {
    width: 16px;
    height: 16px;
    accent-color: #4A90E2;
  }
`;
document.head.appendChild(styleSheet);

const EmployeeForm = ({ onEmployeeCreated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const newCourses = checked
        ? [...formData.course, value]
        : formData.course.filter((course) => course !== value);
      setFormData({ ...formData, course: newCourses });
    } else if (type === 'file') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === 'image') {
        data.append(key, formData[key]);
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => data.append(`${key}[]`, item));
      } else {
        data.append(key, formData[key]);
      }
    }
    try {
      await createEmployee(data);
      if (onEmployeeCreated) {
        onEmployeeCreated();
      }
      alert('Employee created successfully');
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.sectionTitle}>Create New Employee</h3>

      <div style={styles.inputGroup}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <input
          type="text"
          name="mobile"
          placeholder="Mobile No"
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <select
          name="designation"
          onChange={handleChange}
          required
          style={styles.select}
        >
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Gender</label>
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              required
              className="radio-input"
            />
            Male
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              required
              className="radio-input"
            />
            Female
          </label>
        </div>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Education</label>
        <div style={styles.checkboxGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              value="MCA"
              onChange={handleChange}
              className="checkbox-input"
            />
            MCA
          </label>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              value="BCA"
              onChange={handleChange}
              className="checkbox-input"
            />
            BCA
          </label>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              value="BSc"
              onChange={handleChange}
              className="checkbox-input"
            />
            BSc
          </label>
        </div>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Profile Image</label>
        <input
          type="file"
          name="image"
          accept=".jpg,.png"
          onChange={handleChange}
          required
          style={styles.fileInput}
        />
      </div>

      <button type="submit" style={styles.button}>
        Create Employee
      </button>
    </form>
  );
};

export default EmployeeForm;