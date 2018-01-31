'use strict'
const store = require('./store')
const api = require('./list-api')
const showListTemplate = require('./showListTemplate.handlebars')
const indexListTemplate = require('./indexListTemplate.handlebars')

// Display the fact of an error to the user.
const itemUpdateFailure = function (data) {
  const errorHtml = (`
    <p>Please ensure you gave that task some content.</p>
    `)
  $('#write-list-notification').html(errorHtml).attr('class', 'center')
}

// Remove list success.
const removeListSuccess = function () {
  api.getListIndex()
    .then(indexListSuccess)
    .catch(getOldListFailure)
}

// Index Lists.
const indexListSuccess = function (data) {
  const indexListHtml = indexListTemplate({ lists: data.lists })
  $('#list-index').html(indexListHtml)
}

// Indicate success .
const createListSuccess = function (data) {
  store.newList = data.list
  store.oldList = store.newList
  store.itemBeingEdited = false
  $('#write-list-area').html('')
  $('#create-list').hide()
  $('#profile').hide()
  $('#write-list').show()
  const nameHtml = (`
    ${store.newList.name}
    `)
  $('#list-directions').html('CLICK TO EDIT ITEMS')
  $('#list-name').html(nameHtml).css('text-transform', 'uppercase')
}

// Display the fact of an error to the user.
const createListFailure = function (data) {
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Please ensure you gave that list a name.</p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
    `)
  $('#create-list-notification').html(errorHtml).attr('class', 'center')
}
// Display the fact of an error to the user.
const getListSuccess = function (data) {
  store.itemBeingEdited = false
  $('#list-directions').html('CLICK TO EDIT ITEMS')
  const showListHtml = showListTemplate({ items: data.list.items })
  $('#write-list-area').html(showListHtml)
}

// Display the fact of an error to the user.
const getListFailure = function (data) {
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Please ensure you filled out this field correctly.</p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
    `)
  $('#write-list-notification').html(errorHtml).attr('class', 'center')
}

// Indicate success creating an item.
const createItemSuccess = function (data) {
  $('#write-list-notification').html('')
  store.newItem = data.item
  $('#write-list-form').find('input[type=text], textarea').val('')
  api.getList()
    .then(getListSuccess)
    .catch(getListFailure)
}

// Display the fact of an error to the user.
const createItemFailure = function (data) {
  const errorHtml = (`
    <p>Please ensure you gave that task some content.</p>
    `)
  $('#write-list-notification').html(errorHtml).attr('class', 'center')
}

// Get list success.
const getOldListSuccess = function (data) {
  store.oldList = data.list
  $('#write-list-area').html('')
  $('#create-list').hide()
  $('#profile').hide()
  $('#write-list').show()
  const nameHtml = (`
    ${store.oldList.name}
    `)
  $('#list-name').html(nameHtml).css('text-transform', 'uppercase')
  api.getList()
    .then(getListSuccess)
    .catch(getListFailure)
}

// Display the fact of an error to the user.
const getOldListFailure = function (data) {
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    `)
  $('#profile-error').html(errorHtml).attr('class', 'center')
}

module.exports = {
  createListFailure,
  createListSuccess,
  createItemFailure,
  createItemSuccess,
  getListFailure,
  getListSuccess,
  indexListSuccess,
  removeListSuccess,
  getOldListSuccess,
  getOldListFailure,
  itemUpdateFailure
}
