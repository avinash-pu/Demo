const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    changeDate: { type: Date, default: Date.now },
    changeType: { type: String, enum: ['CREATE', 'UPDATE', 'DELETE'], required: true },
    changedData: { type: mongoose.Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model('History', historySchema);
