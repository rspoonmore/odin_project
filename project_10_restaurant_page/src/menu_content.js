function loadMenuContent() {
    let content = document.querySelector('div#content');

    const title = document.createElement('h2');
    title.textContent = "Menu";
    content.appendChild(title);

    const menuItems = {
        'Turkey Sandwich': '$10',
        'Ham Sandwich': '$10',
        'Chicken Salad': '$9',
        'Hamburger': '$14',
        'Cheeseburger': '$15'
    };

    const menu = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const th_item = document.createElement('th');
    th_item.textContent = 'Item';
    const th_price = document.createElement('th');
    th_price.textContent = 'Price';
    const tbody = document.createElement('tbody');

    tr.appendChild(th_item);
    tr.appendChild(th_price);
    thead.appendChild(tr);
    menu.appendChild(thead);
    
    for (const [item, price] of Object.entries(menuItems)) {
        const tr = document.createElement('tr');
        const th_item = document.createElement('th');
        th_item.textContent = item;
        const th_price = document.createElement('th');
        th_price.textContent = price;

        tr.appendChild(th_item);
        tr.appendChild(th_price);
        tbody.appendChild(tr);
    }

    menu.appendChild(tbody);
    content.appendChild(menu);
}


export default loadMenuContent;