function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
        );
    };
};

function saveCart(cart) {
    if (!cart || Object.keys(cart).length == 0) {
        window.sessionStorage['jsonData'] = JSON.stringify({});
        return null;
    }
    if (!storageAvailable("sessionStorage")) {
        alert('Session Storage not available!');
        return null;
    }
    window.sessionStorage['jsonData'] = JSON.stringify(cart);
}

function loadCart() {
    let newCart = {};
    if (!storageAvailable("sessionStorage")) {
        alert('Session Storage not available!');
        return newCart;
    }
    if (!('jsonData' in window.sessionStorage)) {
        return newCart;
    }
    let jsonData = JSON.parse(window.sessionStorage['jsonData'] || "{}");
    return jsonData;
}



export {saveCart, loadCart}


