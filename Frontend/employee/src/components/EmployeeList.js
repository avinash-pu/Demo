import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../features/employeeSlice';
import { Link, useLocation } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import axiosInstance from '../api/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EmployeeList.css'; // Import your custom CSS
import MapComponent from './MapView';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const status = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);
  const location = useLocation(); // Hook to get the current location

  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [dispatch, status]);
  useEffect(() => {
    dispatch(fetchEmployees());

  }, [location]);
  const handleShow = async (employee) => {
    setSelectedEmployee(employee);
    try {
      const resHistory = await axiosInstance.get(`/employees/${employee._id}/history`);
      setHistory(resHistory?.data?.data);
    } catch (err) {
      console.error('Failed to fetch employee data:', err);
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    setHistory([]);
  };

  return (
    <div className="container ">
      
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <>
          <Table striped bordered hover className="employee-list">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Age</th>
                <th>Department</th>
                <th>Status</th>
                <th>Update</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.employeeId}</td>
                  <td>{employee.employeeName}</td>
                  <td>{employee.address}</td>
                  <td>{employee.age}</td>
                  <td>{employee.department}</td>
                  <td>{employee.employeeStatus}</td>
                  <td>
                    <Link to={`/edit`} state={{ employee }}>
                      <Button variant="warning">Edit</Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleShow(employee)}
                      className="ml-2"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Modal for displaying employee details, history, and location */}
          <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Employee Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Container defaultActiveKey="details">
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="details">Employee Details</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="history">Employee History</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="location">Employee Location</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="details">
                    {selectedEmployee && (
                      <div className="employee-details">
                        <p><strong>ID:</strong> {selectedEmployee.employeeId}</p>
                        <p><strong>Name:</strong> {selectedEmployee.employeeName}</p>
                        <p><strong>Address:</strong> {selectedEmployee.address}</p>
                        <p><strong>Age:</strong> {selectedEmployee.age}</p>
                        <p><strong>Department:</strong> {selectedEmployee.department}</p>
                        <p><strong>Status:</strong> {selectedEmployee.employeeStatus}</p>
                      </div>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="history">
                    <h5>Employee History</h5>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Change Type</th>
                          <th>Changed Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((each) => (
                          <tr key={each._id}>
                            <td>{each.changeType}</td>
                            <td>{each.changedData.address}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="location">
                    <div style={{ height: '500px', width: '100%' }}>
                      <MapComponent />
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
