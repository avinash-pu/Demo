import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../api/axiosInstance';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

// Validation schema using Yup
const validationSchema = Yup.object({
  employeeName: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  age: Yup.number().required('Required').min(18, 'Must be at least 18'),
  department: Yup.string().required('Required'),
  employeeStatus: Yup.string().required('Required'),
});

const AddEmployeeForm = () => {
  const formik = useFormik({
    initialValues: {
      employeeName: '',
      address: '',
      age: '',
      department: '',
      employeeStatus: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axiosInstance.post('/employees', values);
        alert('Employee added successfully!');
        resetForm();
      } catch (error) {
        console.error('Error adding employee:', error);
        alert('Failed to add employee. Please try again.');
      }
      setSubmitting(false);
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="employeeName">
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

        <Form.Group as={Col} controlId="address">
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
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="age">
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

        <Form.Group as={Col} controlId="department">
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
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="employeeStatus">
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
      </Row>

      <Button type="submit" disabled={formik.isSubmitting}>
        Add Employee
      </Button>
    </Form>
  );
};

export default AddEmployeeForm;
