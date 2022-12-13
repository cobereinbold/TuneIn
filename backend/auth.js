const isAuth = (req, res, next) => {
    if (req.session.isAuth) { // if the user has a valid cookie, continue
      next();
    } else {
      res.status(401).send('User is not authorized.'); // if the user does not have a cookie, stop and return a 401.
    }
};

module.exports = isAuth;