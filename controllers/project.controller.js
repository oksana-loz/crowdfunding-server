const projectService = require('../services/project.service');


const createProject = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { name, description, price, category } = req.body;
    const project = await projectService.createProject(userId, name, description, price, category);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProjectInfo = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await projectService.getProjectInfo(projectId);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addDonation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { projectId, amount } = req.body;
    const donation = await projectService.addDonation(userId, projectId, amount);
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(201).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMyProjects = async (req, res) => {
  try {
    const { userId } = req.user;
    const projects = await projectService.getAllMyProjects(userId);
    res.status(201).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMyDonations = async (req, res) => {
  try {
    const { userId } = req.user;
    const projects = await projectService.getAllMyDonations(userId);
    res.status(201).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createProject,
  getProjectInfo,
  addDonation,
  getAllProjects,
  getAllMyProjects,
  getAllMyDonations
};
