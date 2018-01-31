'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const userEvents = require('./user-events')
const listEvents = require('./list-events')

$(() => {
  setAPIOrigin(location, config)
  userEvents.addSignInHandlers()
  userEvents.addSignUpHandlers()
  userEvents.addIntroHandlers()
  userEvents.addProfileHandlers()
  listEvents.addListHandlers()
  $('#change-pass').hide()
  $('#profile').hide()
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#navigation').hide()
  $('#credit').hide()
  $('.non-game').hide()
  $('#greeting-space').hide()
  $('#create-list').hide()
  $('#write-list').hide()
  $('body').on('click', '.remove-list', listEvents.onRemoveList)
  $('body').on('click', '.load-list', listEvents.onLoadList)
  $('body').on('mouseenter', '.remove-list', userEvents.onDeleteHover)
  $('body').on('mouseout', '.remove-list', userEvents.onDeleteOff)
  $('body').on('mouseenter', '.load-list', userEvents.onLoadHover)
  $('body').on('mouseout', '.load-list', userEvents.onLoadOff)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
