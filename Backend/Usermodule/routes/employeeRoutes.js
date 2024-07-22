const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');

router.post('/employees', employeeController.createEmployee);

router.get('/employees', employeeController.getAllEmployees);

router.get('/employees/:id', employeeController.getEmployeeById);

router.put('/employees/:id', employeeController.updateEmployee);


router.delete('/employees/:id', employeeController.deleteEmployee);
router.get('/employees/:id/history', employeeController.getEmployeeHistory);  //update 

module.exports = router;
