// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${
  import.meta.env.REACT_APP_JSON_SERVER_PORT
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const bookURL = `${baseServerURL}/books`;
let mainSection = document.getElementById("data-list-wrapper");

// book
let bookTitleInput = document.getElementById("book-title");
let bookImageInput = document.getElementById("book-image");
let bookCategoryInput = document.getElementById("book-category");
let bookAuthorInput = document.getElementById("book-author");
let bookPriceInput = document.getElementById("book-price");
let bookCreateBtn = document.getElementById("add-book");

// Update book
let updateBookIdInput = document.getElementById("update-book-id");
let updateBookTitleInput = document.getElementById("update-book-title");
let updateBookImageInput = document.getElementById("update-book-image");
let updateBookAuthorInput = document.getElementById("update-book-author");
let updateBookCategoryInput = document.getElementById("update-book-category");
let updateBookPriceInput = document.getElementById("update-book-price");
let updateBookBtn = document.getElementById("update-book");

//Update price
let updatePriceBookId = document.getElementById("update-price-book-id");
let updatePriceBookPrice = document.getElementById("update-price-book-price");
let updatePriceBookPriceButton = document.getElementById("update-price-book");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterClassic = document.getElementById("filter-Classic");
let filterFantasy = document.getElementById("filter-Fantasy");
let filterMystery = document.getElementById("filter-Mystery");

//Search by title/author

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

//Books Data
let booksData = [];

bookCreateBtn.addEventListener("click",postBook);
updateBookBtn.addEventListener("click",updateBook);
updatePriceBookPriceButton.addEventListener("click",updatePrice);
sortAtoZBtn.addEventListener("click",()=>{fetchData(`${bookURL}?_sort=price&_order=asc`)});
sortZtoABtn.addEventListener("click",()=>{fetchData(`${bookURL}?_sort=price&_order=desc`)});
filterClassic.addEventListener("click",()=>{fetchData(`${bookURL}?category=Classic`)});
filterFantasy.addEventListener("click",()=>{fetchData(`${bookURL}?category=Fantasy`)});
filterMystery.addEventListener("click",()=>{fetchData(`${bookURL}?category=Mystery`)});
searchByInput.addEventListener("input",()=>{deBounce1()})

//fetch the data from api
async function fetchData(url){
  try{
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    appenData(data);
  }
  catch(error){
    console.log(error);
  }
}

//append data in the dom
function appenData(data){
  mainSection.innerHTML = "";

  let cardList = document.createElement("div");
  cardList.className = "card-list";

  data.forEach(item => {
    let card = createCard(item);
    cardList.append(card);
  });

  mainSection.append(cardList);

}

//create card
function createCard(item){

  let card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-id",item.id);

  let card_img = document.createElement("div");
  card_img.className = "card-img";

  let img = document.createElement("img");
  img.src = item.image;
  img.alt = "book";

  let card_body = document.createElement("div");
  card_body.className = "card-body";

  let card_title = document.createElement("h4");
  card_title.className = "card-title";
  card_title.innerText = item.title;

  let card_author = document.createElement("p");
  card_author.className = "card-author";
  card_author.innerText = item.author;

  let card_cat = document.createElement("p");
  card_cat.className = "card-category";
  card_cat.innerText = item.category;

  let card_price = document.createElement('p');
  card_price.className = "card-price";
  card_price.innerText = item.price;

  let card_link = document.createElement("a");
  card_link.className = "card-link";
  card_link.setAttribute("dat-id",item.id);
  card_link.innerText = "Edit";
  card_link.href = "#"
  card_link.addEventListener("click",(e)=>{fillData(e,item)})

  let btn = document.createElement("button");
  btn.className = "card-button";
  btn.setAttribute("data-id",item.id);
  btn.innerText = "Delete";
  btn.addEventListener("click",()=>{deleteBook(item.id)});

  card_img.append(img);
  card_body.append(card_title,card_author,card_cat,card_price,card_link,btn);

  card.append(card_img,card_body);

  return card;
}

//to post a new book
async function postBook(){
  try{

    let book ={
      title:bookTitleInput.value,
      author:bookAuthorInput.value,
      category:bookCategoryInput.value,
      image:bookImageInput.value,
      price:updateBookPriceInput.value
    }

    let res = await fetch(bookURL,{
      method:"POST",
      body:JSON.stringify(book),
      headers:{
        "Content-type":"application/json"
      }
    });

    let data = await res.json();
    console.log(data);
    fetchData(bookURL);
  }
  catch(error){
    console.log(error);
  }
}

//to delete a book
async function deleteBook(id){
  try{
    let res = await fetch(`${bookURL}/${id}`,{
      method:"DELETE",
    })
    let data = await res.json();
    console.log(data);
    fetchData(bookURL);
  }
  catch(error){
    console.log(error);
  }
}

//to fill the data while cliclink on edit link
function fillData(e,item){
  e.preventDefault();
  updateBookIdInput.value = item.id;
  updateBookTitleInput.value = item.title;
  updateBookImageInput.value = item.image;
  updateBookAuthorInput.value = item.author;
  updateBookCategoryInput.value = item.category;
  updateBookPriceInput.value = item.price;
  updatePriceBookId.value = item.id;
  updatePriceBookPrice.value = item.price;
}

//to update all the data of the book
async function updateBook(){
  try{

    let book ={
      title:updateBookTitleInput.value,
      author:updateBookAuthorInput.value,
      category:updateBookCategoryInput.value,
      image:updateBookImageInput.value,
      price:updateBookPriceInput.value
    }

    let res = await fetch(`${bookURL}/${updateBookIdInput.value}`,{
      method:"PATCH",
      body:JSON.stringify(book),
      headers:{
        "Content-type":"application/json"
      }
    });

    let data = await res.json();
    console.log(data);
    fetchData(bookURL);
  }
  catch(error){
    console.log(error);
  }
}

//to upadte the price only
async function updatePrice(){
  try{

    let book ={
      price:updatePriceBookPrice.value
    }

    let res = await fetch(`${bookURL}/${updatePriceBookId.value}`,{
      method:"PATCH",
      body:JSON.stringify(book),
      headers:{
        "Content-type":"application/json"
      }
    });

    let data = await res.json();
    console.log(data);
    fetchData(bookURL);
  }
  catch(error){
    console.log(error);
  }
}


function deBounce(fn,delay){
  let timer;

  return function(){
    clearTimeout(timer);
    timer = setTimeout(fn,delay);
  }
}

let deBounce1 = deBounce(()=>{fetchData(`${bookURL}?${searchBySelect.value}_like=${searchByInput.value}`)},500)

fetchData(bookURL)

let deBounce2 = deBounce(()=>{deboun.innerText = inpt1.value;},500)

let defaul = document.querySelector(".default");
let deboun = document.querySelector(".debounce");
let inpt1 = document.getElementById("debounce_inpt");
inpt1.addEventListener("input",()=>{
  defaul.innerText = inpt1.value;
  deBounce2();
})


