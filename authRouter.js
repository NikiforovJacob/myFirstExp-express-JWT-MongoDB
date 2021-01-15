const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');

router.post('/registration',[
  check('username', 'The user name can not be empty').notEmpty(),
  check('password', 'The password should not be shorter than 4 and longer than 10').isLength({ min: 4, max: 10 }),
], controller.registration);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);

module.exports = router;
