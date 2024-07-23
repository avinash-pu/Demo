import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import EmployeeList from './components/EmployeeList';
import AddEmployeeForm from './components/AddEmployeeForm';
import UpdateEmployeeForm from './components/UpdateEmployeeForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
          <Navbar.Brand >Employee Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Employee List</Nav.Link>
            <Nav.Link as={Link} to="/add">Add Employee</Nav.Link>
               
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="content">
          <Routes>
          <Route path="/add" element={<AddEmployeeForm />} />
            <Route path="/" element={<EmployeeList />} />
            
            <Route path="/edit" element={<UpdateEmployeeForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
