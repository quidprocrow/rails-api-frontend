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

// Creates item.
const createItem = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/items/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token,
      'Content-Type': 'application/json'
    },
    data
  })
}

const getList = function () {
  return $.ajax({
    url: config.apiOrigin + '/lists/' + store.newList.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createList,
  createItem,
  getList
}
