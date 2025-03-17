const Application = require('../models/application.model');

exports.createApplication = async (req, res) => {
  try {
    const { title, body, user_id } = req.body;

    const application = new Application({ title, body, user_id });
    await application.save();

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('user_id', 'name');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
