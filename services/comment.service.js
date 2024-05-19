const { Comment } = require('../models/models');

exports.addComment = async (userId, projectId, text) => {
  return Comment.create({ userId, projectId, text });
};

exports.getComments = async (projectId) => {
  return Comment.findAll({
    where: { projectId },
    include: ['user'],
  });
};
