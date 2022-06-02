import { moveBook, deleteBook, editBook } from './lib.js';

export const createBookList = (bookObject) => {
    const listCard = document.createElement('div');
    listCard.classList.add('list-card');

    const listHeader = document.createElement('div');
    listHeader.classList.add('list-header');
    listHeader.innerHTML = bookObject.title;
    listCard.appendChild(listHeader);

    const authorGroup = document.createElement('div');
    authorGroup.classList.add('form-group-row');
    listCard.appendChild(authorGroup);

    const authorLabel = document.createElement('p');
    authorLabel.innerHTML = 'Penulis:';
    authorGroup.appendChild(authorLabel);

    const author = document.createElement('p');
    author.innerHTML = bookObject.author;
    authorGroup.appendChild(author);

    const yearGroup = document.createElement('div');
    yearGroup.classList.add('form-group-row');
    listCard.appendChild(yearGroup);

    const yearLabel = document.createElement('p');
    yearLabel.innerHTML = 'Tahun:';
    yearGroup.appendChild(yearLabel);

    const year = document.createElement('p');
    year.innerHTML = bookObject.year;
    yearGroup.appendChild(year);

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('list-button');
    listCard.appendChild(buttonGroup);

    const moveBookButton = document.createElement('button');
    const moveBookText = bookObject.isCompleted ? 'Belum selesai dibaca' : 'Selesai dibaca';
    moveBookButton.innerHTML = moveBookText;
    moveBookButton.classList.add('button', 'button-primary', 'font-sm');

    moveBookButton.addEventListener('click', () => {
        moveBook(bookObject.id);
    });
    
    buttonGroup.appendChild(moveBookButton);

    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.classList.add('button', 'button-secondary');
    editButton.addEventListener('click', () => {
        editBook(bookObject.id);
    });

    buttonGroup.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Hapus';
    deleteButton.classList.add('button', 'button-tertiary');
    deleteButton.addEventListener('click', () => {
        deleteBook(bookObject.id);
    });
    buttonGroup.appendChild(deleteButton);

    return listCard;
};
