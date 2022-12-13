

const isAuth = (req, res, next) => {
    if (req.session.isAuth) { //if user has cookie, continue.
      next();
    } else { // if user does not have session cookie, return a 401
      res.status(401).send('Please sign in.')
      //res.redirect("/user/signInUser");
    }
};

module.exports = isAuth;