function init(){
  renderBookTable() 
  renderPagingButtons()
}  

function renderBookTable() {
  debugger
  var tBodyEl = document.querySelector('tbody')
  var books = getBooks()
  if (!books.length) {
    tBodyEl.innerHTML = `No more books left`
    return
  }
  var booksHtml = books.map((book, id) => {
    return `<tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td onchange='onBookUpdate(${book.id}, ${id})'><input class='price-${id}' type="text" placeholder='${book.price}$'></td>
                ${getActionHtml(book.id)}
             </tr>`
  })
  tBodyEl.innerHTML = booksHtml.join('')
}

function renderDetailsModal(bookDetails) {
  var modalEl = document.querySelector('.modal')
  modalEl.hidden = false
  var modalImgEl = document.querySelector('.modal-img')
  var modalPriceEl = document.querySelector('.modal-price')
  var modalTitleEl = document.querySelector('.modal-title')
  var modalDescEl = document.querySelector('.modal-desc')
  var modalRatingInputEl = document.querySelector('.rating')

  modalImgEl.src = bookDetails.bookImg
  modalPriceEl.innerText = 'Price:' + bookDetails.price
  modalTitleEl.innerText = bookDetails.bookName
  modalDescEl.innerText = bookDetails.desc
  modalRatingInputEl.value = bookDetails.rating
}

function renderBookRow() {
  var tBodyEl = document.querySelector('tbody')
  tBodyEl.innerHTML += `
  <tr>
    <td></td>
    <td><input type="text" placeholder='title' class='title'></td>
    <td><input type="text" placeholder='price' class='price'></td>
    <td><button onclick='onSaveBook()'>Save</button></td>
  </tr>
  `
}

function onNextClick() {
  getNextBooks()
  renderBookTable()
}

function onPriceClick() {
  console.log('test')
  sortBooksByPrice()
  renderBookTable()
}

function onTitleClick() {
  console.log('test')
  sortBooksByTitle()
  renderBookTable()
}

function onCloseModal() {
  var modalEl = document.querySelector('.modal')
  onSaveBookRating()
  modalEl.hidden = true
}

function onBookDelete(id) {
  deleteBook(id)
  renderBookTable()
}

function onBookUpdate(bookId, id) {
  var priceCellEl = document.querySelector(`.price-${id}`)
  var newPrice = +priceCellEl.value 
  if (newPrice <= 0) return
  updateBook(bookId, newPrice)
  renderBookTable()
}

function onBookRead(id) {
  var bookDetails = getBookDetails(id)
  renderDetailsModal(bookDetails)
}

function onSaveBookRating() {
  var bookModalTitleEl = document.querySelector('.modal-title')
  var ratingInputEl = document.querySelector('.rating')
  saveBookRating(bookModalTitleEl.innerText, ratingInputEl.value)
}

function renderPagingButtons(){
  var pagingContainerEl = document.querySelector('.paging-container')
  var numOfBooks = getBooksCount()
  var itemLimitPerPage = getPageItemLimit()
  var numOfButtons = Math.ceil(numOfBooks / itemLimitPerPage)
  var buttonStr = ''
  for (let i = 0; i < numOfButtons; i++) {
    buttonStr += `<button 
    onclick='onGetNextBooks(${(i * itemLimitPerPage)} ,${(i + 1) * itemLimitPerPage})'>
    ${i + 1}
    </button>`
  }
  pagingContainerEl.innerHTML = buttonStr 
}

function onGetNextBooks(fromNum ,toNum) {
  getNextBooks(fromNum, toNum)
  renderBookTable()
}  

function onSaveBook() {
  var titleEl = document.querySelector('td .title')
  var priceEl = document.querySelector('td .price')
  if (!titleEl.value || !priceEl.value) return
  addBook(titleEl.value, +priceEl.value)
  renderBookTable()
  renderPagingButtons()
}

function getActionHtml(id) { //renderPriceInput(cellId) onclick='onBookUpdate(${id}, event)'
  return `<td>
            <button onclick='onBookRead(${id})' style='background-color:red'>Read</button>
            <button onclick='onBookDelete(${id})' style='background-color:purple'>Delete</button>
          </td>`
}
