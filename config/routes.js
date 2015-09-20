/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': function (req, res) {
    User.findOne({id: req.session.userId}).exec(function (err, loggedInUser){
      if (err) { return res.negotiate(err); }
      return res.view('homepage', {
        me: loggedInUser||null
      });
    });
  },

  'GET /some-other-page': function (req, res) {
    User.findOne({id: req.session.userId}).exec(function (err, loggedInUser){
      if (err) { return res.negotiate(err); }
      return res.view('some-other-page', {
        me: loggedInUser||null
      });
    });
  },

  'PUT /login': function (req, res) {

    // Use a fairly long timeout to simulate a complex route.
    setTimeout(function (){
      User.findOne({
        username: req.param('username'),
        password: req.param('password')
      }).exec(function (err, matchedUser) {
        if (err) { return res.negotiate(err); }
        if (!matchedUser) { return res.forbidden(); }

        // If we made it here, the provided credentials are valid!
        // Remember the logged-in user in the session, then respond.
        req.session.userId = matchedUser.id;
        return res.json({stuff: 'things'});
      });
    }, 750);

  }

};
