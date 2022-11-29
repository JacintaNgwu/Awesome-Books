let bookList = [];

const book = {};

function showBookList() {
  document.getElementById('book-list').innerHTML = '';

  if (localStorage.getItem('bookList') !== null) {
    bookList = JSON.parse(localStorage.getItem('bookList'));
    bookList.forEach((book) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      const titleDiv = document.createElement('div');
      titleDiv.classList.add = 'title';
      titleDiv.innerText = book.Title;
      bookDiv.appendChild(titleDiv);

      const authorDiv = document.createElement('div');
      authorDiv.classList.add = 'author';
      authorDiv.innerText = book.Author;
      bookDiv.appendChild(authorDiv);

      const removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-book-btn');
      removeBtn.innerText = 'Remove';
      bookDiv.appendChild(removeBtn);
      const hr = document.createElement('hr');
      hr.classList.add('hr-line');
      bookDiv.appendChild(hr);
      document.getElementById('book-list').appendChild(bookDiv);
    });
  }
}

document.getElementById('add_book_btn').addEventListener('click', () => {
  book.Title = document.getElementById('title').value;
  book.Author = document.getElementById('author').value;

  bookList.push(book);

  localStorage.setItem('bookList', JSON.stringify(bookList));
  showBookList();
});

window.addEventListener('load', () => {
  showBookList();
});

const upsellBtn = document.getElementById('book-list');

upsellBtn.addEventListener('click', (event) => {
  const bookCurrent = event.target.closest('.remove-book-btn');
  if (bookCurrent) {
    const nodelist = bookCurrent.childNodes;
    const [title] = nodelist;
    bookList.splice(bookList.findIndex((search) => search.Title === title.innerText), 1);

    localStorage.removeItem('bookList');
    localStorage.setItem('bookList', JSON.stringify(bookList));
    showBookList();
  }
});
