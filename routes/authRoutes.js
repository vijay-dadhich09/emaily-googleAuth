const passport = require('passport');

module.exports = app => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }))
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.send('google auth successful');
    }
  );
  app.get('/', (req, res) => {
    res.send('Test project using heroku.');
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    req.send(req.user);
  })
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  })
}
