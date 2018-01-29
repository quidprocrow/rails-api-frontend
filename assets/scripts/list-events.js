'use strict'
const getFormFields = require('../../lib/get-form-fields.js')
const api = require('./list-api')
const ui = require('./list-ui')
// const store = require('./store')

const createNewList = function (event) {
  event.preventDefault()
  let data = getFormFields(event.target)
  data = JSON.stringify(data)
  api.createList(data)
    .then(ui.createListSuccess)
    .catch(ui.createListFailure)
  $('#create-list-form').find('input[type=text], textarea').val('')
}

// Add list specific handlers.
const addListHandlers = function () {
  $('#create-list-form').on('submit', createNewList)
}

module.exports = {
  createNewList,
  addListHandlers
}
