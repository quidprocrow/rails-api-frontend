'use strict'

const config = require('./config')
const store = require('./store')

// Signs out user.
const signOutUser = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// Signs in user.
const signInUser = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

// Signs up user.
const signUpUser = function (data) {
  console.log(config.apiOrigin)
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

module.exports = {
  signInUser,
  signUpUser,
  signOutUser
}
