'use strict'

var gBooks = [];
var gNextId;
var gSortBy;
var gSortBy;
var gPageIdx = 0;
const PAGE_SIZE = 5;



// _createBooks();


function goToPage(pageIdx) {
    gPageIdx = pageIdx;
}



function getBooks() {
    gBooks = loadFromStorage('booksDB')
    console.log(gBooks);
    if (!gBooks || !gBooks.length) return _createBooks();
    if (gSortBy === 'id') gBooks.sort((a, b) => { return a.id - b.id })
    else if (gSortBy === 'rating') gBooks.sort((a, b) => { return a.rating - b.rating })
    else if (gSortBy === 'price') gBooks.sort((a, b) => { return a.price - b.price })
    else if (gSortBy === 'name') gBooks.sort((a, b) => _compareByName(a.name, b.name))
    _saveBooksToStorage()
    const startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}


function setSortBy(sortBy) {
    gSortBy = sortBy

}


function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
    if (gBooks.length % PAGE_SIZE === 0) gPageIdx--;
    
}

function updateBook(bookId, newPrice) {
    const book = findBookById(bookId);
    book.price = newPrice;
    _saveBooksToStorage();
}

function validateRating(newRating) {
    if (newRating > 10) newRating = 10;
    else if (newRating < 0) newRating = 0;
    return newRating
}

function findBookById(bookId) {
    return gBooks.find(book => book.id === bookId)
}


function changeBookRating(bookId, action) {
    const book = findBookById(bookId);
    if (action === 'add' && book.rating === 10) return
    if (action === 'subtract' && book.rating === 0) return
    if (action === 'add') book.rating++
    else if (action === 'subtract') book.rating--;
    _saveBooksToStorage();
}


function getBookDescription(bookId) {
    // could be a real book description

    return ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eligendi earum dolor eius magnam corrupti maxime
    soluta quasi non ratione similique dolores necessitatibus eum laudantium, voluptatem libero, quam quas cum doloribus
    incidunt. Ratione eos aut ea, voluptas cupiditate sunt vitae beatae soluta nam. Magni aspernatur vitae, quos illum
    veniam sed. Soluta velit a, architecto ut necessitatibus laboriosam sed inventore, reiciendis voluptatum veniam
    impedit autem error sequi repellat dignissimos nulla modi fuga possimus alias? Voluptatem nam ducimus, facere
    aperiam repudiandae expedita dignissimos reiciendis praesentium nulla provident non, nostrum, at sapiente adipisci.
    Modi dolores itaque amet ab facere blanditiis porro sit fugit.`
}


function _createBook(newName, newPrice, newRating = 0) {
    const book = {
        id: gNextId++,
        name: newName,
        price: +newPrice,
        imgUrl: '',
        rating: validateRating(newRating)
    }
    gBooks.push(book);
    console.log(gBooks);
    _saveBooksToStorage();
}


function _saveBooksToStorage() {
    saveToStorage('booksDB', gBooks)
}

function toUseLate() {
    if (!book.imgUrl) book.imgUrl = alert('This book doesn\'t have an img yet')
}



function _createBooks() {

    gNextId = 1;
    gBooks = [
        {
            id: gNextId++,
            name: 'Harry Potter',
            price: 53.07,
            imgUrl: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/5903/9780590353427.jpg',
            rating: getRandomInt(0, 11)
        },
        {
            id: gNextId++,
            name: 'The Hobbit',
            price: 96.56,
            imgUrl: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2611/9780261103283.jpg',
            rating: getRandomInt(0, 11)
        },
        {
            id: gNextId++,
            name: 'Dune',
            price: 97.72,
            imgUrl: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4732/9781473233959.jpg',
            rating: getRandomInt(0, 11)
        }
    ]

    gNextId = gBooks[gBooks.length - 1].id + 1;
    _saveBooksToStorage();
}
