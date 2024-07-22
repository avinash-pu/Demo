import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../api/axiosInstance';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

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
    <Container className="mt-4">
      <h2>Edit Employee</h2>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group controlId="employeeName">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Employee Name"
            {...formik.getFieldProps('employeeName')}
            isInvalid={formik.touched.employeeName && formik.errors.employeeName}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.employeeName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            {...formik.getFieldProps('address')}
            isInvalid={formik.touched.address && formik.errors.address}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.address}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Age"
            {...formik.getFieldProps('age')}
            isInvalid={formik.touched.age && formik.errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.age}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Department"
            {...formik.getFieldProps('department')}
            isInvalid={formik.touched.department && formik.errors.department}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.department}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="employeeStatus">
          <Form.Label>Employee Status</Form.Label>
          <Form.Control
            as="select"
            {...formik.getFieldProps('employeeStatus')}
            isInvalid={formik.touched.employeeStatus && formik.errors.employeeStatus}
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
        <Button type="submit" className="mt-3" variant="primary">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditEmployeeForm;
