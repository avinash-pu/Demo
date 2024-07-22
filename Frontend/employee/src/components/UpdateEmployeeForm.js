import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../features/employeeSlice';

const UpdateEmployeeForm = ({ employee }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(employee.name);
  const [position, setPosition] = useState(employee.position);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEmployee({ id: employee.id, employee: { name, position } }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Position:
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </label>
      <button type="submit">Update Employee</button>
    </form>
  );
};

export default UpdateEmployeeForm;
