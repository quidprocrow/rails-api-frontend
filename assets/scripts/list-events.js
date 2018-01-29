'use strict'
const getFormFields = require('../../lib/get-form-fields.js')
const api = require('./list-api')
const ui = require('./list-ui')
const store = require('./store')

const createNewList = function (event) {
  event.preventDefault()
  let data = getFormFields(event.target)
  data = JSON.stringify(data)
  api.createList(data)
    .then(ui.createListSuccess)
    .catch(ui.createListFailure)
  $('#create-list-form').find('input[type=text], textarea').val('')
}

const writeNewListItem = function (event) {
  event.preventDefault()
  let data = getFormFields(event.target)
  data.item.archived = 'off'
  data.item.list_id = store.newList.id
  data = JSON.stringify(data)
  api.createItem(data)
    .then(ui.createItemSuccess)
    .catch(ui.createItemFailure)
}

// Add list specific handlers.
const addListHandlers = function () {
  $('#create-list-form').on('submit', createNewList)
  $('#write-list-form').on('submit', writeNewListItem)
}

module.exports = {
  createNewList,
  addListHandlers
}
