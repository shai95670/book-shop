var gBooks = createBooks()
var gSortBooksByPrice = 'priceLowToHigh'
var gSortBooksByTitle = 'titleFirstToLast'
const G_PAGE_ITEM_LIMIT = 4
var gfromItemNum = 0
var gToItemNum = G_PAGE_ITEM_LIMIT

function getBooks() {
  return gBooks.slice(gfromItemNum, gToItemNum)
}

function getBooksCount(){
  return gBooks.length
}

function getNextBooks(fromNum, toNum) {
  gfromItemNum = fromNum
  gToItemNum = toNum
}

function getPageItemLimit(){
  return G_PAGE_ITEM_LIMIT
}

function changeRating(diff){
  debugger
  var value = parseInt(document.querySelector('.rating').value, 10)
  value = isNaN(value) ? 0 : value
  if (value < 10 && value >= 1) {
    value += diff
    document.querySelector('.rating').value = value
  }
}

function deleteBook(bookId) {
  var bookIdx = _getBookById(bookId)
  gBooks.splice(bookIdx, 1)
  saveToStorage('books', gBooks)
}

function updateBook(bookId, bookPrice) {
  var book = _getBookById(bookId)
  book.price = bookPrice
  saveToStorage('books', gBooks)
}

function _getBookById(bookId) {
  return (book = gBooks.find(function (book) {
    return book.id === bookId
  }))
}

function saveBookRating(bookTitle, rating) {
  var book = gBooks.find(function (book) {
    return book.title === bookTitle
  })
  book.rating = rating
  saveToStorage('books', gBooks)
}

function getBookDetails(id) {
  var book = _getBookById(id)
  var bookDetails = null
  bookDetails = {
    bookName: book.title,
    price: book.price,
    bookImg: book.imgUrl,
    desc: getLorem(),
    rating: book.rating,
  }
  return bookDetails
}

function getCurrentBookId() {
  return gBooks[gBooks.length - 1].id
}

function addBook(bookTitle, bookPrice) {
  debugger
  var currentId = getCurrentBookId()
  var book = _createBook(currentId + 1, bookTitle, 'img/random.png', bookPrice)
  gBooks.push(book)
  saveToStorage('books', gBooks)
}

function sortBooksByPrice() {
  if (gSortBooksByPrice === 'priceLowToHigh') {
    gBooks.sort((bookOne, bookTwo) => {
      return bookOne.price - bookTwo.price
    })
    gSortBooksByPrice = 'priceHighToLow'
    saveToStorage('books', gBooks)
    return
  }
  if (gSortBooksByPrice === 'priceHighToLow') {
    gBooks.sort((bookOne, bookTwo) => {
      return bookTwo.price - bookOne.price
    })
    gSortBooksByPrice = 'priceLowToHigh'
    saveToStorage('books', gBooks)
    return
  }
}

function sortBooksByTitle() {
  if (gSortBooksByTitle === 'titleFirstToLast') {
    gBooks.sort(function (bookOne, bookTwo) {
      var titleOne = bookOne.title.toUpperCase()
      var titleTwo = bookTwo.title.toUpperCase()
      if (titleOne < titleTwo) return -1
      if (titleOne > titleTwo) return 1
      return 0
    })
    gSortBooksByTitle = 'titleLastToFirst'
    saveToStorage('books', gBooks)
    return
  }
  if (gSortBooksByTitle === 'titleLastToFirst') {
    gBooks.sort(function (bookOne, bookTwo) {
      var titleOne = bookOne.title.toUpperCase()
      var titleTwo = bookTwo.title.toUpperCase()
      if (titleOne > titleTwo) return -1
      if (titleOne < titleTwo) return 1
      return 0
    })
    gSortBooksByTitle = 'titleFirstToLast'
    saveToStorage('books', gBooks)
    return
  }
}

function createBooks() {
  var books = []
  if(loadFromStorage('books')){
    books = loadFromStorage('books')
    return books
  }
  var titles = [
    'harry potter and the half blood prince',
    'harry potter and the goblet of fire',
    'A song of ice and fire: a feast of crows',
    'Harry potter and the prince from azkaban',
    'test3',
    'test4',
    'test6',
    'test8',
    'test900',
    'test400',
    'test600',
    'test800',
    'test8000'
  ]
  books = titles.map((title, id) =>
    _createBook(id + 1, title, `img/${id + 1}.jpg`),
  )
  saveToStorage('books', books)
  return books
}

function _createBook(
  id,
  bookTitle,
  imgUrl,
  price = getRandomIntInclusive(100, 500),
) {
  var book = null
  book = {
    id,
    title: bookTitle,
    price,
    imgUrl,
    rating: 1,
  }
  return book
}
