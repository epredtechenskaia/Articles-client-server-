function getCurrentPageNumber() {
    const qureyString = window.location.search;
    const urlParams = new URLSearchParams(qureyString);
    return urlParams.get('page');
}

async function getPageData(pageNumber) {
    const response = await fetch('https://gorest.co.in/public-api/posts/' + pageNumber);
    const rawData = await response.json();

    return rawData;
}

function createElement(data) {
    let title = document.querySelector('h1');
    let descr = document.querySelector('p');

    title.textContent = data.title;
    descr.textContent = data.body;
}

function appendLi(liElement) {
    document.querySelector('.comments').append(liElement);
}


function createCommentsList(data) {
    for (element of data) {
        const liElement = createLiElement(element);
        appendLi(liElement);
    }
}

function createLiElement(data) {
    let item = document.createElement('li');
    let name = document.createElement('h2');
    let email = document.createElement('p');
    let body = document.createElement('div');

    name.textContent = data.name;
    email.textContent = data.email;
    body.textContent = data.body;

    name.classList.add('h5');
    item.classList.add('list-group-item');

    item.append(name, email, body);
    return item;
}

async function getCommentsData(pageNumber) {
    const response = await fetch('https://gorest.co.in/public-api/comments?post_id=' + pageNumber);
    const rawCommemt = await response.json();

    return rawCommemt;
}

async function createComments(pageNumber) {

    const rawData = await getCommentsData(pageNumber);

    const data = rawData.data;

    createCommentsList(data);

}

async function createPage(pageNumber) {

    const rawData = await getPageData(pageNumber);

    const data = rawData.data;

    createElement(data);
    createComments(pageNumber);
}

let currentPageNumber = getCurrentPageNumber();
if (currentPageNumber == null || currentPageNumber < 1) currentPageNumber = 1;
createPage(currentPageNumber);