const Router = require('express');
const { addComment, getComments } = require('../services/comment.service');
const authMiddleware = require('../middleware/authMiddleware');



const router = new Router();

router.use(authMiddleware)


router.post('/', async (req, res) => {
  try {
    const { userId } = req.user;
    const { projectId, text } = req.body;
    const comment = await addComment(userId, projectId, text);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const { projectId } = req.query;
    const comments = await getComments(projectId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
