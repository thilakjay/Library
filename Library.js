let myLibrary = [];

addEventListener("submit", addBookToLibrary);

function Book(title, author, pages, isRead) {
    // this.title = title;
    // this.author = author;
    // this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(e) {
    e.preventDefault();

    const newBook = Object.create(Book);
    newBook.title = document.querySelector("#title").value;
    newBook.author = document.querySelector("#author").value;
    newBook.pages = document.querySelector("#pages").value;
    newBook.isRead = document.querySelector("#read").checked;

    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    clearBooks();

    myLibrary.forEach((book, i) => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.dataset.attribute = i;

        const title = document.createElement("p");
        title.innerText = book.title;

        const author = document.createElement("p");
        author.innerText = book.author;
        
        const pages = document.createElement("p");
        pages.innerText = book.pages;

        const read = document.createElement("p");
        read.innerText = book.isRead ? "Read" : "Not Read";

        const removeBookBtn = document.createElement("button");
        removeBookBtn.textContent = "Remove";
        removeBookBtn.addEventListener("click", () => {
            removeBook(i);
            displayBooks();
        });

        const changeReadStatusBtn = document.createElement("button");
        changeReadStatusBtn.textContent = "Change Read Status";
        changeReadStatusBtn.addEventListener("click", () => {
            book.isRead = !book.isRead;
            clearBooks();
            displayBooks();
        });        
        
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(removeBookBtn);
        card.appendChild(changeReadStatusBtn);
        document.querySelector("#main").appendChild(card);
    })
}

function clearBooks() {
    let element = document.querySelector("#main");
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function removeBook(bookIndex) {
    myLibrary.splice(bookIndex, 1);
}
