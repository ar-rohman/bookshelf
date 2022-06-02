import defaults from './defaults.js';

export let books = [];

export const addBook = () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const isCompleted = document.getElementById('is-completed').checked;
    const id = +new Date();
    const newBookObject = { id, title, author, year, isCompleted };
    books = [...books, newBookObject];
    document.dispatchEvent(new Event(defaults.RENDER_EVENT));
    storeData();
};

export const editBook = (bookId) => {
    const modalClose = document.getElementById('modal-edit-close');
    const modal = document.getElementById('modal-edit');
    const submitForm = document.getElementById('form-edit');
    modal.classList.toggle('hidden');
    
    const book = books.find((book) => book.id === bookId);
    if (book) {
        document.getElementById('title-edit').value = book.title;
        document.getElementById('author-edit').value = book.author;
        document.getElementById('year-edit').value = book.year;
        document.getElementById('is-completed-edit').checked = book.isCompleted;
    }

    modalClose.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    submitForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title-edit').value;
        const author = document.getElementById('author-edit').value;
        const year = document.getElementById('year-edit').value;
        const isCompleted = document.getElementById('is-completed-edit').checked;
        for (const book of books) {
            if (book.id === bookId) {
                book.title = title;
                book.author = author;
                book.year = year;
                book.isCompleted = isCompleted;
                break;
            }
        }
        document.dispatchEvent(new Event(defaults.RENDER_EVENT));
        storeData();

        modal.classList.add('hidden');
        submitForm.reset();
    });
};

export const searchBook = (keyword) => {
    getData();
    if (keyword) {
        const filteredBooks = books.filter((book) => {
            return book.title.toLowerCase().includes(keyword.toLowerCase());
        });
        books = filteredBooks;
    }
    document.dispatchEvent(new Event(defaults.RENDER_EVENT));
};

export const moveBook = (bookId) => {
    for (const book of books) {
        if (book.id === bookId) {
            book.isCompleted = !book.isCompleted;
            break;
        }
    }
    document.dispatchEvent(new Event(defaults.RENDER_EVENT));
    storeData();
};

export const deleteBook = (bookId) => {
    for (const book of books) {
        if (book.id === bookId) {
            books.splice(books.indexOf(book), 1);
            break;
        }
    }
    document.dispatchEvent(new Event(defaults.RENDER_EVENT));
    storeData();
};

export const storeData = () => {
    if (isStorageExist()) {
        const data = JSON.stringify(books);
        localStorage.setItem(defaults.STORAGE_KEY, data);
    }
};

export const getData = () => {
    const data = localStorage.getItem(defaults.STORAGE_KEY);
    books = data ? JSON.parse(data) : [];
    document.dispatchEvent(new Event(defaults.RENDER_EVENT));
};

export const isStorageExist = () => {
    if (typeof (Storage) === undefined) {
        alert('Your browser does not support local storage');
        return false;
    }
    return true;
};
