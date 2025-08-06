function clearCookiesIfNoCurrentUser(currentUser) {
    if(currentUser) {return}
    const cookies = document.cookie.split(';');
    for(let i = 0;i < cookies.length; i++) {
        if(cookies[i].split('=')[0].trim() === 'jwt' || cookies[i].split(':')[0].trim() === 'jwt') {
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            return
        };
    };
    return;
}

export {clearCookiesIfNoCurrentUser}