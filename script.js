const bookDisplay = document.querySelector('#book-display')
const bookBtn = document.querySelector('#book-input')

let myLibrary

window.addEventListener('load', function() {
	let retLibrary = localStorage.getItem('savedLibrary');
	console.log(retLibrary)
	if (retLibrary.length > 0) {
		myLibrary = JSON.parse(retLibrary)
	} else {
		return;
	}
})

render()

//creating a book functions

bookBtn.addEventListener('click', function () {
	let bookName = document.querySelector('#input-title').value
	let bookAuthor = document.querySelector('#input-author').value
	let bookLength = document.querySelector('#input-length').value
	let bookRead = document.querySelector('#input-read').value

	if (bookName == '' || bookAuthor == '' || bookLength == '') {
		if (bookName == '') {
			document.querySelector('#input-title').placeholder = '**MANDATORY**'
		}
		if (bookAuthor == '') {
			document.querySelector('#input-author').placeholder = '**MANDATORY**'
		}
		if (bookLength == '') {
			document.querySelector('#input-length').placeholder = '**NUM**'
		}
		return
	} else {
		addBookToLibrary(bookName, bookAuthor, bookLength, bookRead);
	}
})

function addBookToLibrary(name, author, length, read) {
  let book = new createBook(name, author, length, read);
  myLibrary.push(book);
  render();
}

function createBook(name, author, length, read) {
  this.name = name
  this.author = author
  this.length = length
  this.read = read
}

//rendering function

function render() {
	let last_div = bookDisplay.lastElementChild;
	while (last_div) {
		bookDisplay.removeChild(last_div);
		last_div = bookDisplay.lastElementChild;
	}

	for (i = 0; i < myLibrary.length; i++) {
		let div = document.createElement('div');
		let currentBook = 'book' + i
		let color = randColor()
		div.innerHTML = `<p style='font-weight: bold'>${myLibrary[i].name}</p><p>by ${myLibrary[i].author}</p><p>${myLibrary[i].length} Pgs</p><p>${myLibrary[i].read}</p>`
		div.setAttribute('id', currentBook)
		div.setAttribute('style', `border-top: 5px solid ${color}`);

		let btn = document.createElement('button');
		btn.classList.add('display-btn')
		btn.classList.add('delete-btn')
		btn.innerHTML = 'Delete'

		btn.addEventListener('click', function() {
			let target = '#' + currentBook
			let targetBook = currentBook.replace('book', '')
			let targetDiv = document.querySelector(target)
			myLibrary.splice(targetBook, 1);
			targetDiv.remove();
			render()
		})

		let btn2 = document.createElement('button');
		btn2.classList.add('display-btn')
		btn2.innerHTML = 'Read'

		btn2.addEventListener('click', function() {
			let targetBook = currentBook.replace('book', '')
			if (myLibrary[targetBook].read !== 'Finished') {
				myLibrary[targetBook].read = 'Finished'
			} else {
				myLibrary[targetBook].read = 'Not Finished'
			}
			render()
		})

		bookDisplay.appendChild(div);
		div.appendChild(btn);
		div.appendChild(btn2);

		localStorage.setItem('savedLibrary', JSON.stringify(myLibrary));
		document.querySelector('#input-title').value = ''
		document.querySelector('#input-author').value = ''
		document.querySelector('#input-length').value = ''
		document.querySelector('#input-title').placeholder = 'Book Title'
		document.querySelector('#input-author').placeholder = 'Book Author'
		document.querySelector('#input-length').placeholder = 'Pgs'
	}
}

function randColor() {
	return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}