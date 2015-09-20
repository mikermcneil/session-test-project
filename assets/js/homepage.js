/**
 * `homepage.js`
 *
 * Client-side JavaScript to run on when a user's browser loads `homepage.ejs`.
 */

$(function whenDOMIsReady(){

  // If this is not the homepage, bail.
  var $page = $('[is="page"][data-page="homepage"]');
  if ($page.length === 0) {
    return;
  }

  // Otherwise bind a submit event to the login form.
  $page.on('submit', 'form[is="login-form"]', function (e) {

    $.ajax({
      method: 'PUT',
      url: '/login',
      data: {
        username: $('input[name="username"]').val(),
        password: $('input[type="password"]').val()
      }
    }).done(function (data){
      console.log('RESULT DATA:',data);
      console.log('all args!',arguments);

      // Redirect
      window.location = '/some-other-page';
    }).fail(function (jqxhr) {
      console.log('FIAL!!!',jqxhr);
    });

    // Prevent default form submission behavior
    // (i.e. because we're using AJAX instead above)
    e.preventDefault();
    return false;
  });

});
