const Router = require('express');
const { createProject, getProjectInfo, addDonation, getAllProjects, getAllMyProjects, getAllMyDonations } = require('../controllers/project.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.use(authMiddleware)


router.post('/', createProject);

router.get('/', getAllProjects);

router.get('/my', getAllMyProjects);

router.get('/donations/my', getAllMyDonations);

router.get('/:projectId', getProjectInfo);


router.post('/donations', addDonation);

module.exports = router;
