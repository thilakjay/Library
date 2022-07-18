let myLibrary = [];

const bookForm = document.querySelector("#add-book-card");
const showFormBtn = document.querySelector("#show-form-btn");

showFormBtn.addEventListener("click", toggleFormDisplay);

addEventListener("click", (e) => {
    if(bookForm.classList.contains("active") && !bookForm.contains(e.target)){
        bookForm.classList.remove("active");
    }   
});

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

    document.querySelector("#add-book-form").reset();
    toggleFormDisplay(e);
    displayBooks();
}

function toggleFormDisplay(e) {
    e.stopPropagation();

    bookForm.classList.contains("active") ? 
        bookForm.classList.remove("active") : bookForm.classList.add("active");
}

function displayBooks() {
    clearBooks();

    myLibrary.forEach((book, i) => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.dataset.attribute = i;

        const title = document.createElement("div");
        title.innerText = book.title;

        const author = document.createElement("div");
        author.innerText = book.author;
        
        const pages = document.createElement("div");
        pages.innerText = book.pages;

        // const read = document.createElement("div");
        // read.innerText = book.isRead ? "Read" : "Not Read";

        const changeReadStatusBtn = document.createElement("button");
        
        if(book.isRead) {
            changeReadStatusBtn.textContent = "Read";
            changeReadStatusBtn.className = "read";
        }else {
            changeReadStatusBtn.textContent = "Not Read";
            changeReadStatusBtn.className = "not-read";
        }

        changeReadStatusBtn.addEventListener("click", () => {
            book.isRead = !book.isRead;
            clearBooks();
            displayBooks();
        });        

        const removeBookBtn = document.createElement("button");
        removeBookBtn.textContent = "Remove";
        removeBookBtn.addEventListener("click", () => {
            removeBook(i);
            displayBooks();
        });
        
        
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(changeReadStatusBtn);
        card.appendChild(removeBookBtn);
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
