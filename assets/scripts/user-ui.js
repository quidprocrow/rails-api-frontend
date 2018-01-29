'use strict'

const store = require('./store')

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
  store.user = null
  $('#game-title').text('BYE BYE BYE').css('text-transform', 'uppercase')
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
  $('#sign-in-error').html(errorHtml).attr('class', 'sign-notice')
  $('#sign-up-redirect').on('click', redirect)
}

module.exports = {
  signInSuccess,
  signInFailure,
  signUpFailure,
  signUpSuccess,
  signOutSuccess,
  signOutFailure
}