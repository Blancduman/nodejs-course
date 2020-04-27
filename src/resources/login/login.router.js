const router = require('express').Router();
const loginService = require('./login.service');

router.route('/').post(async (req, res) => {
  const createdUser = await loginService.postUser(req.body);

  return res.status(createdUser.status).json(createdUser.result);
});

module.exports = router;
