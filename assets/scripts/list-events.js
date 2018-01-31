'use strict'
const getFormFields = require('../../lib/get-form-fields.js')
const api = require('./list-api')
const ui = require('./list-ui')
const store = require('./store')

const onRemoveItemClick = function (event) {
  event.preventDefault()
  let data = event.target
  data = $(event.target).data('id')
  console.log(data)
  api.deleteItem(data)
    .then(ui.createItemSuccess)
    .catch(ui.getOldListFailure)
}

const onItemUpdate = function (event) {
  event.preventDefault()
  let data = getFormFields(event.target)
  data.item.archived = 'OFF'
  data.item.id = store.itemUpdate.id
  data.item.list_id = store.oldList.id
  data = JSON.stringify(data)
  api.updateItem(data)
    .then(ui.createItemSuccess)
    .catch(ui.itemUpdateFailure)
}

const onNvmClick = function () {
  $('#write-list-notification').html('')
  api.getList()
    .then(ui.getListSuccess)
    .catch(ui.getListFailure)
}

const onItemClick = function (event) {
  if (store.itemBeingEdited !== true) {
    store.itemUpdate = {}
    store.itemBeingEdited = true
    store.itemUpdate.id = $(event.target).data('id')
    store.itemUpdate.content = $(event.target).data('content')
    const listHtml = (`
      <form id="update-item-form" class="change-pass-form update-item-form" style="width: 100%; display: block; margin: auto; height: 120px;">
       <input type="TEXT" name= "item[content]" placeholder="${store.itemUpdate.content}" class="input-field"><p></p>   <p class="nvm" data-id=${store.itemUpdate.id}>NVM</p> <p class="remove-item" data-id=${store.itemUpdate.id}>X</p>
        </form>
    `)
    $(this).html(listHtml).removeClass('item-changer')
    $('#list-directions').html('PRESS ENTER TO EDIT')
  } else {
    $('#list-directions').html('ONE AT A TIME PLEASE')
  }
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
  onItemClick,
  onNvmClick,
  onItemUpdate,
  onRemoveItemClick
}
