'use strict'
const store = require('./store')
const api = require('./list-api')
const showListTemplate = require('./showListTemplate.handlebars')
const indexListTemplate = require('./indexListTemplate.handlebars')

// Index Lists.
const indexListSuccess = function (data) {
  console.log('hello', data)
  const indexListHtml = indexListTemplate({ lists: data.lists })
  $('#list-index').html(indexListHtml)
}

// // Index Lists.
// const indexListFailure = function (data) {
//   const indexListHtml = indexListTemplate({ lists: data.lists })
//   $('#list-index').html(showListHtml)
// }

// Indicate success .
const createListSuccess = function (data) {
  store.newList = data.list
  $('#create-list').hide()
  $('#write-list').show()
  const nameHtml = (`
    ${store.newList.name}
    `)
  $('#list-name').html(nameHtml).css('text-transform', 'uppercase')
}

// Display the fact of an error to the user.
const createListFailure = function (data) {
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Please ensure you filled out this field correctly.</p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
    `)
  $('#create-list-notification').html(errorHtml).attr('class', 'center')
}
// Display the fact of an error to the user.
const getListSuccess = function (data) {
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
  $('#create-list-notification').html(errorHtml).attr('class', 'center')
}

// Indicate success creating an item.
const createItemSuccess = function (data) {
  store.newItem = data.item
  $('#write-list-form').find('input[type=text], textarea').val('')
  api.getList()
    .then(getListSuccess)
    .catch(getListFailure)
}

// Display the fact of an error to the user.
const createItemFailure = function (data) {
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    `)
  $('#write-list-notification').html(errorHtml).attr('class', 'center')
}

module.exports = {
  createListFailure,
  createListSuccess,
  createItemFailure,
  createItemSuccess,
  getListFailure,
  getListSuccess,
  indexListSuccess
}
