function loadHomeContent() {
    let content = document.querySelector('div#content');

    const title = document.createElement('h2');
    title.textContent = "Homepage";
    content.appendChild(title);

    const infoBlock = document.createElement('div');
    infoBlock.classList.add('content-block');
    infoBlock.textContent = "Welcome to the homepage for Ryan's Restaurant. This is not a very fancy homepage, but the point of this is to practice using webpack and modules to create webpages in a more organized way.";
    content.appendChild(infoBlock);

    const hoursBlock = document.createElement('div');
    hoursBlock.classList.add('content-block');
    const hoursTitle = document.createElement('h3');
    hoursTitle.textContent = "Hours";
    hoursBlock.appendChild(hoursTitle);
    const hoursDetails = document.createElement('p');
    hoursDetails.innerHTML = "Sunday: 7am - 8pm<br>Monday: 11am - 8pm<br>Tuesday: 11am - 8pm<br>Wednesday: 11am - 8pm<br>Thursday: 11am - 8pm<br>Friday: 7am - 8pm<br>Saturday: 7am - 8pm";
    hoursBlock.appendChild(hoursDetails);
    content.appendChild(hoursBlock);
}


export default loadHomeContent;