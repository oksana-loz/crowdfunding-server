const { User, Project, Donation } = require('../models/models');


const createProject = async (userId, name, description, price, category) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const project = await Project.create({ userId, name, description, price, category });
  return project;
};


const getProjectInfo = async (projectId) => {
  const project = await Project.findByPk(projectId, {
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName', 'email']
      },
      {
        model: Donation,
        attributes: ['amount', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['firstName', 'lastName']
          }
        ]
      }
    ]
  });
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
};

const getAllProjects = async () => {
  const project = await Project.findAll({
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName', 'email']
      },
      {
        model: Donation,
        attributes: ['amount', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['firstName', 'lastName']
          }
        ]
      }
    ]
  });
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
};

const getAllMyProjects = async (userId) => {
  const projects = await Project.findAll({
    where: { userId },
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName', 'email']
      },
      {
        model: Donation,
        attributes: ['amount', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['firstName', 'lastName']
          }
        ]
      }
    ]
  });
  if (!projects) {
    throw new Error('Projects not found');
  }
  return projects;
};

const getAllMyDonations = async (userId) => {

  const donations = await Donation.findAll({
    where: { userId },
    include: [
      {
        model: Project,
        attributes: ['id', 'name', 'description', 'price'], // Include project details
        include: {
          model: User,
          attributes: ['firstName', 'lastName', 'email'] // Include user details for each project
        }
      }
    ]
  });

  return donations;
};


const addDonation = async (userId, projectId, amount) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const project = await Project.findByPk(projectId);
  if (!project) {
    throw new Error('Project not found');
  }
  const donation = await Donation.create({ userId, projectId, amount });
  project.sumDonated += parseFloat(amount);
  await project.save();
  return donation;
};

module.exports = {
  createProject,
  getProjectInfo,
  addDonation,
  getAllProjects,
  getAllMyProjects,
  getAllMyDonations
};
