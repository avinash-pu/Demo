const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId : {type: Number,required: true},
    employeeName: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    department: { type: String, required: true },
    employeeStatus: { type: String, enum: ['Remote Location', 'Contract Employee', 'Full-Time'], required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
