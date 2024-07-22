import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { ADD_EMP } from '../config';

const AddEmployeeForm = () => {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      employeeId: '',
      employeeName: '',
      address: '',
      age: '',
      department: '',
      employeeStatus: ''
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(ADD_EMP, values);
        console.log('Employee added:', response.data);
        // Optionally reset the form
        formik.resetForm();
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Add Employee</h2>
      <label>
        Employee ID:
        <input
          type="number"
          name="employeeId"
          value={formik.values.employeeId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>
      <br />
      <label>
        Employee Name:
        <input
          type="text"
          name="employeeName"
          value={formik.values.employeeName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>
      <br />
      <label>
        Department:
        <input
          type="text"
          name="department"
          value={formik.values.department}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>
      <br />
      <label>
        Employee Status:
        <select
          name="employeeStatus"
          value={formik.values.employeeStatus}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="" label="Select status" />
          <option value="Full-Time" label="Full-Time" />
          <option value="Part-Time" label="Part-Time" />
        </select>
      </label>
      <br />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;
