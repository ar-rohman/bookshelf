import { books, addBook, searchBook, getData, isStorageExist } from './lib.js';
import { createBookList } from './book-list.js';
import defaults from './defaults.js';

document.addEventListener('DOMContentLoaded', () => {
    const modalOpen = document.getElementById('add-book');
    const modalClose = document.getElementById('modal-close');
    const modal = document.getElementById('modal');
    const submitForm = document.getElementById('form');
    const search = document.getElementById('search');
    const searchButton = document.getElementById('search-button');

    if (isStorageExist()) getData();

    modalOpen.addEventListener('click', () => {
        modal.classList.toggle('hidden');
    });

    modalClose.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    submitForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addBook();
        
        modal.classList.add('hidden');
        submitForm.reset();
    });

    searchButton.addEventListener('click', async () => {
        event.preventDefault();
        const keyword = search.value;
        await searchBook(keyword);
        search.value = '';
    });

    search.addEventListener('keypress', async (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            event.preventDefault();
            const keyword = event.target.value;
            await searchBook(keyword);
            event.target.value = '';
        }
    });
});


document.addEventListener(defaults.RENDER_EVENT, () => {
    const unreadBooks = document.getElementById('unread');
    const readedBooks = document.getElementById('readed');

    unreadBooks.innerHTML = '';
    readedBooks.innerHTML = '';

    for (const book of books) {
        const bookItem = createBookList(book);
        book.isCompleted ? readedBooks.append(bookItem) : unreadBooks.append(bookItem);
    }

    if (!readedBooks.children.length) readedBooks.innerHTML = 'Tidak ada buku yang sudah selesai dibaca';
    if (!unreadBooks.children.length) unreadBooks.innerHTML = 'Tidak ada buku yang belum selesai dibaca';
});
