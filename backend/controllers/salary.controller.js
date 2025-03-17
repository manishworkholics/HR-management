const Salary = require('../models/salary.model');

exports.createSalary = async (req, res) => {
  try {
    const { user_id, month, amount, slip_url } = req.body;

    const salary = new Salary({ user_id, month, amount, slip_url });
    await salary.save();

    res.status(201).json({ message: 'Salary record created', salary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSalaryByUser = async (req, res) => {
  try {
    const salary = await Salary.find({ user_id: req.params.id });
    res.json(salary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find().populate('user_id', 'name');
    res.json(salaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
