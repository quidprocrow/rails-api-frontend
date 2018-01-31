'use strict'

const store = require('./store')
const listApi = require('./list-api')
const listUi = require('./list-ui')

// Indicate success and invite user back to profile.
const changePassSuccess = function () {
  const redirect = function () {
    $('#change-pass').hide()
    $('#profile').show()
  }
  const successHtml = (`<p>
    <b>Excellent!</b> Back to <a id="pass-profile-redirect">your profile</a>, then?</p>
    `)
  $('#password-notification').html(successHtml).attr('class', 'center')
  $('#pass-profile-redirect').on('click', redirect)
}

// Display the fact of an error to the user.
const changePassFailure = function (data) {
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Please ensure you filled out both fields correctly.</p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
    `)
  $('#password-notification').html(errorHtml).attr('class', 'center')
}

// Hide the previous section, show the profile, and store user information.
const signOutSuccess = function (data) {
  $('#profile').hide()
  $('#intro').show()
  $('#change-pass').hide()
  $('#game-board').hide()
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#navigation').hide()
  $('#instructions').hide()
  $('#credit').hide()
  $('#personal-statistics').hide()
  $('#profile-error').remove()
  $('#show-games').html('')
  $('.game-link').hide()
  $('.non-game').hide()
  $('.sign-link').hide()
  $('#vs-play-button').hide()
  $('#greeting-space').hide()
  $('#sign-space').hide()
  $('#create-list').hide()
  $('#write-list').hide()
  $('#write-list-area').html('')
  $('#yell-at-me').hide()
  store.user = null
  $('#game-title').text('BYE BYE BYE').css('text-transform', 'uppercase')
  $('#sign-up-notification').html('')
  $('#sign-in-notification').html('')
}

// Display the fact of an error to the user.
const signOutFailure = function (data) {
  console.log('BIG FAILURE')
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Did you perhaps need to <a id="sign-up-redirect">sign up</a>?</p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
    `)
  $('#profile-error').html(errorHtml).addClass('scooch')
}

// Voluntary redirect, used in both success or failure.
const redirect = function () {
  $('#sign-up').hide()
  $('#sign-in').show()
  $('#sign-up-notification').html('')
  $('#sign-in-notification').html('')
}

// Hide the previous section, show the profile, and store user information.
const signUpSuccess = function (data) {
  store.user = data.user
  const successHtml = (`<p>Success, <b>${store.user.email}</b>!</p>
    <p>Please <a id="sign-in-redirect">sign in</a>.</p>
    `)
  $('#sign-up-notification').html(successHtml).attr('class', 'sign-notice')
  $('#sign-in-redirect').on('click', redirect)
}

// Display the fact of an error to the user.
const signUpFailure = function (data) {
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Did you perhaps need to <a id="sign-in-redirect">sign in</a>?</p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
    `)
  $('#sign-up-notification').html(errorHtml).attr('class', 'sign-notice')
  $('#sign-in-redirect').on('click', redirect)
}

// Hide the previous section, show the profile, and store user information.
const signInSuccess = function (data) {
  $('#greeting-space').show()
  $('#sign-space').hide()
  $('.non-game').show()
  $('.sign-link').hide()
  $('#sign-in').hide()
  $('#profile').show()
  $('#write-list').hide()
  // Clear any errors from previous sign in attempts.
  $('#sign-in-error').html('')
  $('#sign-up-notification').html('')
  store.user = data.user
  const userGreet = store.user.email.split('@')
  // Greet the user.
  if (userGreet[0].length < 16) {
    $('.user-greeting').html(userGreet[0]).css('text-transform', 'uppercase')
  } else {
    $('.user-greeting').html('Friend').css('text-transform', 'uppercase')
  }
  listApi.getListIndex()
    .then(listUi.indexListSuccess)
    .catch(console.errors)
}

// Display the fact of an error to the user.
const signInFailure = function (data) {
  const redirect = function () {
    $('#sign-in').hide()
    $('#sign-up').show()
    $('#sign-in-error').html('')
  }
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Did you perhaps need to <a id="sign-up-redirect">sign up</a>?</p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
    `)
  $('#sign-in-notification').html(errorHtml).attr('class', 'sign-notice')
  $('#sign-up-redirect').on('click', redirect)
}

module.exports = {
  signInSuccess,
  signInFailure,
  signUpFailure,
  signUpSuccess,
  signOutSuccess,
  signOutFailure,
  changePassSuccess,
  changePassFailure
}
