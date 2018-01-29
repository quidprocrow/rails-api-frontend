'use strict'
const store = require('./store')

// Indicate success .
const createListSuccess = function (data) {
  store.newGame = data.list
  $('#create-list').hide()
  $('#write-list').show()
  const nameHtml = (`
    ${store.newGame.name}
    `)
  $('#list-name').html(nameHtml)
}

// Display the fact of an error to the user.
const createListFailure = function (data) {
  console.log('GREAT failure')
  const errorHtml = (`<p>
    <b>Oops!</b> There's been an error!
    </p>
    <p>Please ensure you filled out this fields correctly.</p>
    <p>Contact the
    <a href="mailto:windmillwarrior@gmail.com">administrator</a> otherwise.</p>
    `)
  $('#create-list-notification').html(errorHtml).attr('class', 'center')
}

module.exports = {
  createListFailure,
  createListSuccess
}
