import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import AddEmployeeForm from './components/AddEmployeeForm';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Employee List</Link>
          <Link to="/add">Add Employee</Link>
        </nav>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<AddEmployeeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
