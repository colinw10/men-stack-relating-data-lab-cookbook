function isSignedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/auth/sign-in');
}

module.exports = isSignedIn;

