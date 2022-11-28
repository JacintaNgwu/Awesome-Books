
let bookList = [
  {title: 'Loreum ipsum',
  author: 'Testeroo Testyy'},
  {title: 'Second Book',
  author: 'Testeroo Testyy'}
];

let book = {
  Title: '',
  Author: ''
}

const addBookForm = document.getElementById('add_book_form');


document.getElementById('add_book_btn').addEventListener('click', () => {
  book.Title = document.getElementById('title').value;
  book.Author = document.getElementById('author').value;

  localStorage.setItem('book', JSON.stringify('book'));
});
