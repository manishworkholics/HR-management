const Application = require('../models/application.model');

exports.createApplication = async (req, res) => {
  try {
    const { leave_type, from_date, to_date, reason, user_id } = req.body;

    const application = new Application({ leave_type, from_date, to_date, reason, user_id });
    await application.save();

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('user_id');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getApplicationsByUserId = async (req, res) => {
  try {
      const { user_id } = req.params; // Extract user_id from request parameters

      if (!user_id) {
          return res.status(400).json({ message: "User ID is required" });
      }

      const applications = await Application.find({ user_id }).populate('user_id'); // Populate user details

      if (!applications.length) {
          return res.status(404).json({ message: "No applications found for this user" });
      }

      res.status(200).json(applications);
  } catch (error) {
      console.error("Error fetching applications by user_id:", error);
      res.status(500).json({ message: "Server error" });
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
