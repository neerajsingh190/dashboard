

import React from 'react';
import { useState, useCallback } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';

const styles = {
  container: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  },
  header: {
    marginBottom: '32px',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '16px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '8px'
  },
  welcome: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '24px'
  },
  content: {
    display: 'grid',
    gap: '32px',
    gridTemplateColumns: '1fr',
    '@media (min-width: 768px)': {
      gridTemplateColumns: '1fr 2fr'
    }
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  }
};

// Add responsive styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @media (min-width: 768px) {
    .dashboard-content {
      grid-template-columns: 1fr 2fr !important;
    }
  }
`;
document.head.appendChild(styleSheet);

const DashboardPage = () => {
  const username = localStorage.getItem('username') || 'Guest';
  const [refreshList, setRefreshList] = useState(false);
  
  const triggerFetch = useCallback(() => {
    setRefreshList((prev) => !prev);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <h2 style={styles.welcome}>Welcome, {username}</h2>
      </div>

      <div style={styles.content} className="dashboard-content">
        <div style={styles.section}>
          <EmployeeForm onEmployeeCreated={triggerFetch} />
        </div>
        
        <div style={styles.section}>
          <EmployeeList refreshList={refreshList} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;