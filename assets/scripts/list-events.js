'use strict'
const getFormFields = require('../../lib/get-form-fields.js')
const api = require('./list-api')
const ui = require('./list-ui')
const store = require('./store')

const onItemClick = function (event) {
  store.itemUpdate = {}
  store.itemUpdate.id = $(event.target).data('id')
  store.itemUpdate.content = $(event.target).data('content')
  const listHtml = (`
    <form id="update-item-form" class="change-pass-form">
      <input type="TEXT" name= "item[content]" placeholder="${store.itemUpdate.content}" class="input-field">
      </form>
  `)
  $(this).html(listHtml).removeClass('item-changer')
}

const onLoadList = function (event) {
  event.preventDefault()
  let data = event.target
  data = $(event.target).data('id')
  store.newList = {}
  store.newList.id = data
  api.getList()
    .then(ui.getOldListSuccess)
    .catch(ui.getOldListFailure)
}

const onRemoveList = function (event) {
  event.preventDefault()
  let data = event.target
  data = $(event.target).data('id')
  api.deleteList(data)
    .then(ui.removeListSuccess)
    .catch(ui.getOldListFailure)
}

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
  addListHandlers,
  onRemoveList,
  onLoadList,
  onItemClick
}
