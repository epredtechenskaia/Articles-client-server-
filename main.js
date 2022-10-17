function getCurrentPageNumber() {
    const qureyString = window.location.search;
    const urlParams = new URLSearchParams(qureyString);
    return urlParams.get('page');
}

async function getPageData(pageNumber) {
    const response = await fetch('https://gorest.co.in/public-api/posts?page=' + pageNumber);
    const rawData = await response.json();

    return rawData;
}

function createLiElement(liData) {
    let item = document.createElement('li');
    let title = document.createElement('h2');
    let body = document.createElement('div');

    item.id = liData.id;

    item.classList.add('list-group-item');

    let aTag = document.createElement('a');
    aTag.href = 'index2.html?page=' + liData.id;
    aTag.textContent = liData.title;
    title.append(aTag);

    body.textContent = liData.body;

    item.append(title, body);
    return item;
}

function appendLi(liElement) {
    document.querySelector('.article-list').append(liElement);
}


function addPageButton(pageNumber) {
    let btn = document.createElement('button');
    let aTag = document.createElement('a');

    aTag.textContent = pageNumber;

    btn.append(aTag);
    btn.classList.add('btn');

    document.querySelector('#pagination').append(btn);

    return aTag;
}

function addDotsButton() {
    addPageButton('...');
}

function createPagination(currentPage, totalPages) {
    if (currentPage >= 3) {
        const aTag = addPageButton(1);
        aTag.href = 'index.html?page=' + 1;
    }
    if (currentPage >= 4) {
        addDotsButton();
    }

    let i = 0;
    for (i = currentPage == totalPages ? Math.max(currentPage - 2, 1) : Math.max(currentPage - 1, 1); i <= totalPages && i <= Math.max(currentPage - 1, 1) + 2; i++) {
        const aTag = addPageButton(i);
        if (i == currentPage) {
            aTag.style.color = 'blueviolet';
            continue;
        }
        aTag.href = 'index.html?page=' + i;
    }

    if (i <= totalPages - 1) {
        addDotsButton();
    }
    if (i <= totalPages) {
        const aTag = addPageButton(totalPages);
        aTag.href = 'index.html?page=' + totalPages;
    }
};

function createArticleList(data) {
    for (element of data) {
        const liElement = createLiElement(element);
        appendLi(liElement);
    }
}

async function createPage(pageNumber) {

    const rawData = await getPageData(pageNumber);

    const totalPages = rawData.meta.pagination.pages;
    const data = rawData.data;

    createPagination(pageNumber, totalPages);
    createArticleList(data);
}

let currentPageNumber = getCurrentPageNumber();
if (currentPageNumber == null || currentPageNumber < 1) currentPageNumber = 1;
createPage(currentPageNumber);