'use strict'


function onInit() {
    renderBooks();
    renderBrowsing()
}

function onCreateNewBook() {
    onToggleAddBookMenu(true);
}

function renderBrowsing() {
    var strHTML = '';
    var pageCount = Math.ceil(gBooks.length / PAGE_SIZE)
    for (var i = 0; i < pageCount; i++) {
        strHTML += `<button onclick="onSelectPage(this,${i})">${i + 1}</button>`
    }
    document.querySelector('.browsing').innerHTML = strHTML;
}

function onSelectPage(elPage,pageNum) {
    const elPages = document.querySelectorAll('.browsing button')
    elPages.forEach(elPage => {
        elPage.classList.remove('active-page');
    })
    elPage.classList.add('active-page');
    goToPage(pageNum);
    renderBooks();
}


function onSetSortBy(sortBy) {
    setBookSort(sortBy);
    renderBooks();
}

function onSubmitBook() {
    const newName = document.querySelector('#book-name').value;
    const newPrice = document.querySelector('#book-price').value;
    const newRating = document.querySelector('#book-rating').value;
    if (!newName || !newPrice || !newRating) return onNoInput();
    _createBook(newName, newPrice, newRating);
    onToggleNoBookLeft(false);
    onToggleAddBookMenu(false);
    renderBrowsing();
    renderBooks();
}

function onNoInput() {
    const elModal = document.querySelector('.no-input-modal');
    elModal.style.display = 'block';
    setTimeout(() => { elModal.style.display = 'none'; }, 700)
}

function onToggleAddBookMenu(open) {
    var elAddBookMenu = document.querySelector('.create-new-book')
    elAddBookMenu.style.top = (open) ? '50%' : '200%';
}




function onSortBy(sortBy) {
    setSortBy(sortBy);
    renderBooks();
}

function onUpdate(bookId) {
    const newPrice = +prompt('Enter a new price')
    updateBook(bookId, newPrice);
    renderBooks();
}

function onDelete(bookId) {
    deleteBook(bookId);
    renderBooks();
    renderBrowsing();
}


function onChangeRating(bookId, action) {
    changeBookRating(bookId, action);
    onRead(bookId);
    renderBooks();
}

function onBookDetailsExit() {
    document.querySelector('.book-details').style.top = '200%';
}

// function onUrlClick(urlLink) {
//     console.log(urlLink);
//     // window.open(urlLink, '_black');
// }

function onRead(bookId) {

    const book = gBooks.find(book => book.id === bookId)
    var elBookDetailsModal = document.querySelector('.book-details');
    elBookDetailsModal.style.top = '50%';

    const strHTML = `
                <button class="close-book-details" onclick="onBookDetailsExit()">X</button>
                <h2>${book.name}</h2>
                <h3>Book Details</h3>
                <p class="book-info">${getBookDescription(bookId)}</p>
                <h4>Book Rating</h4>
                <div class="rating-buttons flex-row align-center">
                    <button onclick="onChangeRating(${bookId}, 'subtract')">-</button>
                    <div class="rating">${book.rating}</div>
                    <button onclick="onChangeRating(${bookId}, 'add')">+</button>
                </div>
    `
    elBookDetailsModal.innerHTML = strHTML;
}



function renderBooks() {
    const books = getBooks();
    // if (!books) return onNoBooksInStore();

    const strHTMLs = books.map(book => {
        return `
        <tr>
            <td>${book.id}</td>
            <td onclick="onUrlClick(${book.imgUrl})">${book.name}</td>
            <td>${book.price.toFixed(2)}&#8362;</td>
            <td>${book.rating}</td>
            <td><button class="btn-read" onclick="onRead(${book.id})">Read</button></td>
            <td><button class="btn-update" onclick="onUpdate(${book.id})">Update</button></td>
            <td><button class="btn-delete" onclick="onDelete(${book.id})">Delete</button></td>
        </tr>
        `
    })
    document.querySelector('tbody').innerHTML = strHTMLs.join('');
}



function onNoBooksInStore() {
    onToggleNoBookLeft(true);
}


function onToggleNoBookLeft(noBookLeft) {
    var elBoBookModal = document.querySelector('.no-books-left ')
    var elTable = document.querySelector('table');
    elBoBookModal.style.display = (noBookLeft) ? 'block' : 'none';
    elTable.style.display = (noBookLeft) ? 'none' : '';

}