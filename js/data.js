
let bookList = [{
  Title: '',
  Author: ''
}];


const addBookForm = document.getElementById('add_book_form');
const bookListDiv = document.getElementById('book-list');

function showBookList () {
  document.getElementById('book-list').innerHTML = '';

  if (localStorage.getItem('bookList') !== null) {
    bookList = JSON.parse(localStorage.getItem('bookList'));
    bookList.forEach((book) => {

      const titleDiv = document.createElement('div');
      titleDiv.id = 'title-div';
      titleDiv.innerText = book.Title;
      document.getElementById('book-list').appendChild(titleDiv);

      const authorDiv = document.createElement('div');
      authorDiv.id = 'author-div';
      authorDiv.innerText = book.Author;
      document.getElementById('book-list').appendChild(authorDiv);

      const removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-book');
      removeBtn.innerText = 'Remove';
      document.getElementById('book-list').appendChild(removeBtn);
    });
  }
}

document.getElementById('add_book_btn').addEventListener('click', () => {
  const book = {
    Title: '',
    Author: ''
  };

  book.Title = document.getElementById('title').value;
  book.Author = document.getElementById('author').value;

  bookList.push(book);

  localStorage.setItem('bookList', JSON.stringify(bookList));
  showBookList ();
});


window.addEventListener('load', () => {
  showBookList ();
});
/*
document.querySelector('.remove-book').addEventListener('click', () => {
  bookList.pop();
});
*/