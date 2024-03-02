const jwt = require('jsonwebtoken');

const checkLogin2 = (redirectPage = '/redirect-page') => {
  return (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return next();
    }

    try {
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (req.originalUrl === '/customer/Login') {
        return res.redirect(redirectPage);
      }

      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
};

module.exports = checkLogin2;
