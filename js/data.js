class Book {
  constructor(title, author, next = null) {
    this.title = title;
    this.author = author;
    this.next = next;
  }
}

class BookList {
  constructor() {
    this.head = null;
  }

  prepend(title, author) {
    const newhead = new Book(title, author);
    newhead.next = this.head;
    this.head = newhead;
  }

  add(title, author) {
    const book = new Book(title, author);
    if (this.head === null) {
      this.head = book;
      return;
    }

    let current = this.head;

    while (current.next !== null) {
      current = current.next;
    }
    current.next = book;
  }

  remove(title, author) {
    if (this.head === null) { return; }
    let current = this.head;
    let previous = null;

    while (current !== null) {
      if (current.title === title && current.author === author) {
        if (previous === null) {
          this.head = current.next;
        } else {
          previous.next = current.next;
        }
      }
      previous = current;
      current = current.next;
    }
  }

  getList() {
    let current = this.head;

    const book = {};
    const bookList = [];

    while (current) {
      book.Title = current.title;
      book.Author = current.author;
      current = current.next;
      bookList.push(book);
    }
    return bookList;
  }

  indexOf(title, author) {
    let count = 0;
    let current = this.head;

    while (current !== null) {
      if (current.title === title && current.author === author) {
        return count;
      }
      count++;
      current = current.next;
    }
    return -1;
  }

  removeFrom(index) {
    if (this.head === null) { return; }
    let current = this.head;
    if (index === 0) {
      this.head = current.next;
      return;
    }
    let previous;
    let i = 0;

    while (i < index) {
      i++;
      previous = current;
      current = current.next;
    }
    previous.next = current.next;
  }
}

const newBookList = new BookList();

function showBookList() {
  document.getElementById('book-list').innerHTML = '';

  if (localStorage.getItem('bookList') !== null) {
    const bookList = JSON.parse(localStorage.getItem('bookList'));
    let book = bookList.head;
    while (book !== null) {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('title');
      titleDiv.innerText = book.title;
      bookDiv.appendChild(titleDiv);

      const authorDiv = document.createElement('div');
      authorDiv.classList.add('author');
      authorDiv.innerText = book.author;
      bookDiv.appendChild(authorDiv);

      const removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-book-btn');
      removeBtn.innerText = 'Remove';
      const btnDiv = document.createElement('div');
      btnDiv.classList.add('btn-wrap');
      btnDiv.appendChild(removeBtn);
      bookDiv.appendChild(btnDiv);

      document.getElementById('book-list').appendChild(bookDiv);

      book = book.next;
    }
  }
}

document.getElementById('add_book_btn').addEventListener('click', () => {
  if (document.getElementById('title').value !== '') {
    newBookList.add(document.getElementById('title').value, document.getElementById('author').value);

    localStorage.setItem('bookList', JSON.stringify(newBookList));
    showBookList();
  }
});

function storeInClass() {
  const bookList = JSON.parse(localStorage.getItem('bookList'));
  if (bookList !== null) {
    let book = bookList.head;
    if (book === undefined) { return; }
    while (book !== null) {
      newBookList.add(book.Title, book.Author);
      book = book.next;
    }
  }
}

window.addEventListener('load', () => {
  showBookList();
  storeInClass();
});

const upsellBtn = document.getElementById('book-list');

upsellBtn.addEventListener('click', (event) => {
  const bookCurrent = event.target.closest('.book');
  // const bookCurrent = event.target.closest('.remove-book-btn');
  if (bookCurrent) {
    const nodelist = bookCurrent.childNodes;
    const [title, author] = nodelist;
    newBookList.remove(title.innerText, author.innerText);
    localStorage.removeItem('bookList');
    localStorage.setItem('bookList', JSON.stringify(newBookList));
    showBookList();
  }
});
