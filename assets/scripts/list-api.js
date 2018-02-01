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

const getListIndex = function () {
  return $.ajax({
    url: config.apiOrigin + '/lists/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// Deletes a list.
const deleteList = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/lists/' + data,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token,
      'Content-Type': 'application/json'
    }
  })
}

// Creates list.
const updateItem = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/items/' + store.itemUpdate.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token,
      'Content-Type': 'application/json'
    },
    data
  })
}

// Deletes an item.
const deleteItem = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/items/' + data,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token,
      'Content-Type': 'application/json'
    }
  })
}

// Gets all items.
const getItems = function () {
  return $.ajax({
    url: config.apiOrigin + '/items/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// Gets an item.
const getItem = function (getMe) {
  return $.ajax({
    url: config.apiOrigin + '/items/' + getMe,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createList,
  createItem,
  getList,
  getListIndex,
  deleteList,
  updateItem,
  deleteItem,
  getItems,
  getItem
}
