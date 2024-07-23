import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../api/axiosInstance';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AddEmployeeForm.css'; // Import your custom CSS file
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
const validationSchema = Yup.object({
  employeeName: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  age: Yup.number().required('Required').min(18, 'Must be at least 18'),
  department: Yup.string().required('Required'),
  employeeStatus: Yup.string().required('Required'),
});

const EditEmployeeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = location.state || {};

  const formik = useFormik({
    initialValues: {
      employeeName: employee?.employeeName || '',
      address: employee?.address || '',
      age: employee?.age || '',
      department: employee?.department || '',
      employeeStatus: employee?.employeeStatus || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axiosInstance.put(`/employees/${employee._id}`, values);

        alert('Employee updated successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error updating employee:', error);
        alert('Failed to update employee. Please try again.');
      }
    },
  });

  return (
    <div className="form-container">
      <h2>Update Employee</h2>
      <Form noValidate onSubmit={formik.handleSubmit} className="add-employee-form">
        <Row className="mb-4">
          <Form.Group as={Col} controlId="employeeName">
            <Form.Label>Employee Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter employee name"
              {...formik.getFieldProps('employeeName')}
              isInvalid={formik.touched.employeeName && formik.errors.employeeName}
              className="form-control-custom"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.employeeName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              {...formik.getFieldProps('address')}
              isInvalid={formik.touched.address && formik.errors.address}
              className="form-control-custom"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.address}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col} controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              {...formik.getFieldProps('age')}
              isInvalid={formik.touched.age && formik.errors.age}
              className="form-control-custom"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.age}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department"
              {...formik.getFieldProps('department')}
              isInvalid={formik.touched.department && formik.errors.department}
              className="form-control-custom"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.department}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col} controlId="employeeStatus">
            <Form.Label>Employee Status</Form.Label>
            <Form.Control
              as="select"
              {...formik.getFieldProps('employeeStatus')}
              isInvalid={formik.touched.employeeStatus && formik.errors.employeeStatus}
              className="form-control-custom"
            >
              <option value="">Select Status</option>
              <option value="Remote Location">Remote Location</option>
              <option value="Contract Employee">Contract Employee</option>
              <option value="Full-Time">Full-Time</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.employeeStatus}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit" disabled={formik.isSubmitting} className="btn-custom">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditEmployeeForm;
