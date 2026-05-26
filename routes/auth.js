const router = require('express').Router();
const passport = require('passport');

// Initiates the GitHub login handshake
router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Handles redirect logouts
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).json({ message: "Successfully logged out from active session." });
  });
});

// Callback route target endpoint
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  function(req, res) {
    // Redirects user back to documentation panel upon validation success
    res.redirect('/api-docs');
  }
);

module.exports = router;
