const searchBar = document.querySelector('#searchBar');
const container = document.querySelector('.container');

function readForm() {
    return searchBar.value;
};

function resetForm() {
    searchBar.value = "";
};


function createPage(weatherData) {
    const locationTitle = document.createElement('h2');
    locationTitle.innerText = weatherData['location'];
    container.appendChild(locationTitle);

    const dateTitle = document.createElement('h3');
    dateTitle.innerText = weatherData['datetime'];
    container.appendChild(dateTitle);

    const descTitle = document.createElement('h3');
    descTitle.innerText = weatherData['desc'];
    container.appendChild(descTitle);

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let headTR = document.createElement('tr');
    ['Value', 'Real Temp', 'Feels Like'].forEach(e => {
        const th = document.createElement('th');
        th.innerText = e;
        headTR.appendChild(th);
    })
    thead.appendChild(headTR);
    table.appendChild(thead);

    let tbody = document.createElement('tbody');
    ['', 'min', 'max'].forEach(e => {
        const tr = document.createElement('tr');
        
        const th = document.createElement('th');
        th.innerText = `Temperature ${e.toUpperCase()}`
        tr.appendChild(th);

        const realTD = document.createElement('td');
        let realKey = 'temp' + e;
        realTD.innerText = weatherData[realKey];
        tr.appendChild(realTD);

        const feelTD = document.createElement('td');
        let feelKey = 'feelslike' + e;
        feelTD.innerText = weatherData[feelKey];
        tr.appendChild(feelTD);

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);
};

export {createPage, readForm, resetForm}