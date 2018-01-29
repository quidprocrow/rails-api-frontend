'use strict'

const config = require('./config')
const store = require('./store')

// Creates list.
const createList = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/lists/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token,
      'Content-Type': 'application/json'
    },
    data
  })
}

module.exports = {
  createList
}
