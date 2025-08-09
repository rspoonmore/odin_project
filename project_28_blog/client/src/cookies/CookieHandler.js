import { server } from "../public_fields";

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

async function setCurrentUserIfCookie(setCurrentUser) {
    async function getCurrentUser() {
        fetch(`${server}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(outcome => {
            if(outcome.success && outcome.user){
                setCurrentUser(outcome.user)
            }
        })
    }

    const cookies = document.cookie.split(';');
    for(let i = 0;i < cookies.length; i++) {
        if(cookies[i].split('=')[0].trim() === 'jwt' || cookies[i].split(':')[0].trim() === 'jwt') {
            getCurrentUser()
            return
        };
    };
}

export {clearCookiesIfNoCurrentUser, setCurrentUserIfCookie}