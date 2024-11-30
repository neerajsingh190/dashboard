import React from 'react';
import Routes from './routes';
import {AuthProvider} from './context/AuthContext'

function App() {
  return (
    <div>
        <AuthProvider>
      <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
