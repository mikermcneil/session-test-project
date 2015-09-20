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

    // Acquire lock and render syncing state
    var $submitButton = $('[type="submit"]');
    var origSubmitButtonTxt = $submitButton.text();
    $submitButton.attr('disabled', 'disabled').text('Logging in...');

    $.ajax({
      method: 'PUT',
      url: '/login',
      data: {
        username: $('input[name="username"]').val(),
        password: $('input[type="password"]').val()
      }
    }).done(function onSuccess(data){
      console.log('RESULT DATA:',data);
      console.log('all args!',arguments);

      // Redirect
      // (no need to release lock since we're redirecting)
      window.location = '/some-other-page';
    })
    .fail(function onFailure(jqxhr) {
      // Log error
      console.error('FAILED!!!',jqxhr);

      // Release lock
      $submitButton.removeAttr('disabled').text(origSubmitButtonTxt);
    });

    // Prevent default form submission behavior
    // (i.e. because we're using AJAX instead above)
    e.preventDefault();
    return false;
  });

});
