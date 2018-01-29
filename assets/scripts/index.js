'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const userEvents = require('./user-events')

$(() => {
  setAPIOrigin(location, config)
  userEvents.addSignInHandlers()
  userEvents.addSignUpHandlers()
  userEvents.addIntroHandlers()
  userEvents.addProfileHandlers()
  $('#change-pass').hide()
  $('#profile').hide()
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#navigation').hide()
  $('#credit').hide()
  $('.non-game').hide()
  $('#greeting-space').hide()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
