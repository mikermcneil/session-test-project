/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // Below, we ensure that these fake users ALWAYS exist.
  var FAKE_USERS = [
    {
      username: 'irlnathan',
      password: 'abc123'
    },
    {
      username: 'mikermcneil',
      password: 'abc123'
    },
    {
      username: 'rachaelshaw',
      password: 'abc123'
    }
  ];


  // Look up our fake users, and if they don't exist, create them.
  User.find({
    username: _.pluck(FAKE_USERS, 'username')
  }).exec(function (err, existingUsers) {
    if (err) {
      return cb(err);
    }

    var missingUsernames = _.difference(_.pluck(FAKE_USERS, 'username'), _.pluck(existingUsers,'username'));
    var usersToCreate = _.filter(FAKE_USERS, function (fakeUser) {
      return _.contains(missingUsernames, fakeUser.username);
    });
    User.create(usersToCreate).exec(function (err) {
      if (err) {
        return cb(err);
      }

      // It's very important to trigger this callback method when you are finished
      // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
      cb();
    });

  });

};
