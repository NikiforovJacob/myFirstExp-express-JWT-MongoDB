const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(403).json({ massage: 'User is not authorized'});
      }
      const { roles: userRoles } = jwt.verify(token, secret);
      const hasAccess = userRoles.reduce((acc, role) => roles.includes(role), false);
      if (!hasAccess) {
        return res.status(403).json({ massage: 'User has not access'});
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ massage: 'User is not authorized'});
    }
  };
};
