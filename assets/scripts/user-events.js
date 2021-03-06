'use strict'
const getFormFields = require('../../lib/get-form-fields.js')
const api = require('./user-api')
const ui = require('./user-ui')
const listApi = require('./list-api')
const listUi = require('./list-ui')
const store = require('./store')

const onNvmHover = function () {
  $('#list-directions').html('RELOAD UNEDITED LIST')
}

const onNvmOff = function () {
  $('#list-directions').html('PRESS ENTER TO EDIT')
}

const onDeleteHover = function () {
  $('#hover-directions').html('DUST THAT LIST')
  $('#list-directions').html('DESTROY IT')
}

const onDeleteOff = function () {
  $('#hover-directions').html('TO BE DONE')
  $('#list-directions').html('PRESS ENTER TO EDIT')
}

const onLoadHover = function () {
  $('#hover-directions').html('ADD TASKS')
}

const onLoadOff = function () {
  $('#hover-directions').html('TO BE DONE')
}

// User is directed to create a new list.
const yellingRedirect = function () {
  $('#two-player').hide()
  $('#profile').hide()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#instructions').hide()
  $('#credit').hide()
  $('#personal-statistics').hide()
  $('#show-games').html('')
  $('#profile-error').html('')
  $('#create-list').hide()
  $('#write-list').hide()
  $('#write-list-area').html('')
  $('#hover-directions').html('TO BE DONE')
  $('#yell-at-me').show()
  $('#create-list-notification').html('')
  $('#proile-error').html('')
  $('#yelling').html('NEED SOME DIRECTION?')
  $('#yelling-area').html('')
}

// User is directed to the index.
const indexListRedirect = function () {
  $('#two-player').hide()
  $('#credit').hide()
  $('#instructions').hide()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#profile').show()
  $('#personal-statistics').hide()
  $('#show-games').html('')
  $('#profile-error').html('')
  $('#create-list').hide()
  $('#write-list').hide()
  $('#write-list-area').html('')
  $('#hover-directions').html('TO BE DONE')
  $('#yell-at-me').hide()
  $('#create-list-notification').html('')
  $('#proile-error').html('')
  listApi.getListIndex()
    .then(listUi.indexListSuccess)
    .catch(listUi.indexListFailure)
}

// User is directed to the credit.
const creditRedirect = function () {
  $('#two-player').hide()
  $('#credit').show()
  $('#instructions').hide()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#profile').hide()
  $('#personal-statistics').hide()
  $('#show-games').html('')
  $('#profile-error').html('')
  $('#create-list').hide()
  $('#write-list').hide()
  $('#write-list-area').html('')
  $('#hover-directions').html('TO BE DONE')
  $('#yell-at-me').hide()
  $('#create-list-notification').html('')
  $('#proile-error').html('')
}

// Takes the two inputs and creates a passwords objects with old and new keys,
// sends a patch request. If successful, notes this to the user and requests
// they return to their profile; otherwise, notes their failure.
// Resets form inputs upon submit and error data upon redirect.
const changePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePasswordUser(data)
    .then(ui.changePassSuccess)
    .catch(ui.changePassFailure)
  $('#change-password-form').find('input[type=password], textarea').val('')
}

// User is directed to change password section,
const changePasswordRedirect = function () {
  $('#two-player').hide()
  $('#profile').hide()
  $('#game-board').hide()
  $('#change-pass').show()
  $('#instructions').hide()
  $('#credit').hide()
  $('#personal-statistics').hide()
  $('#show-games').html('')
  $('#profile-error').html('')
  $('#create-list').hide()
  $('#write-list').hide()
  $('#write-list-area').html('')
  $('#hover-directions').html('TO BE DONE')
  $('#yell-at-me').hide()
  $('#create-list-notification').html('')
  $('#proile-error').html('')
}

// User is directed to create a new list.
const createListRedirect = function () {
  $('#two-player').hide()
  $('#profile').hide()
  $('#game-board').hide()
  $('#change-pass').hide()
  $('#instructions').hide()
  $('#credit').hide()
  $('#personal-statistics').hide()
  $('#show-games').html('')
  $('#profile-error').html('')
  $('#create-list').show()
  $('#write-list').hide()
  $('#write-list-area').html('')
  $('#hover-directions').html('TO BE DONE')
  $('#yell-at-me').hide()
  $('#create-list-notification').html('')
  $('#proile-error').html('')
}

// User is signed out.
const signOut = function (event) {
  event.preventDefault()
  const data = store
  api.signOutUser(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

// Takes sign up form information, uses get form fields to create appropriate
// object, and sends that as data to the API. On success, user is notified and
// and redirected to sign in screen; notified upon failure.
const signUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUpUser(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
  $('#sign-up-form').find('input[type=text], textarea').val('')
  $('#sign-up-form').find('input[type=password], textarea').val('')
}

// Add click events for the sign up section form; prevents refresh.
const addSignUpHandlers = function () {
  $('#sign-up-form').on('submit', signUp)
}

// Goes to sign in section, hides the intro.
const introSignIn = function (event) {
  event.preventDefault()
  $('#intro').hide()
  $('#sign-up').hide()
  $('#sign-in').show()
  $('#navigation').show()
  $('#sign-space').show()
  $('.sign-link').show()
  $('#write-list-area').html('')
  $('#sign-up-notification').html('')
  $('#sign-in-notification').html('')
}

// Goes to sign up section, hides the intro.
const introSignUp = function (event) {
  event.preventDefault()
  $('#intro').hide()
  $('#sign-in').hide()
  $('#sign-up').show()
  $('#navigation').show()
  $('#sign-space').show()
  $('.sign-link').show()
  $('#sign-up-notification').html('')
  $('#sign-in-notification').html('')
}

// Add click events for the intro section buttions.
const addIntroHandlers = function () {
  $('#sign-in-button').on('click', introSignIn)
  $('#sign-up-button').on('click', introSignUp)
  $('#sign-in-link').on('click', introSignIn)
  $('#sign-up-link').on('click', introSignUp)
}

// Add click events to change password and signout.
const addProfileHandlers = function () {
  $('#sign-out-link').on('click', signOut)
  $('#change-password-link').on('click', changePasswordRedirect)
  $('#change-password-form').on('submit', changePassword)
  $('#credit-link').on('click', creditRedirect)
  $('#create-list-link').on('click', createListRedirect)
  $('#index-list-link').on('click', indexListRedirect)
  $('#yelling-link').on('click', yellingRedirect)
}

const signIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signInUser(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
  $('#sign-in-form').find('input[type=text], textarea').val('')
  $('#sign-in-form').find('input[type=password], textarea').val('')
}

// Add click events for the sign-in section form.
const addSignInHandlers = function () {
  $('#sign-in-form').on('submit', signIn)
}
module.exports = {
  addSignInHandlers,
  addSignUpHandlers,
  addIntroHandlers,
  addProfileHandlers,
  onDeleteOff,
  onDeleteHover,
  onLoadOff,
  onLoadHover,
  onNvmOff,
  onNvmHover
}
