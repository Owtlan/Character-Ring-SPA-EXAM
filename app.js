import page from '../node_modules/page/page.mjs';
import { html, render } from '/node_modules/lit-html/lit-html.js'


import { registerView } from './src/register.js';
import { loginView } from './src/login.js';
import { logout } from './src/logout.js';
import { catalogView } from './src/dashboard.js';
import { createView } from './src/create.js';
import { detailsView } from './src/details.js';
// import { editView } from './src/edit.js';
// import { createSearch } from './src/search.js';

// page('/search', createSearch)
page('/register', registerView)
page('/login', loginView)
page('/dashboard', catalogView)
page('/create', createView)
page('/details/:detailsId', detailsView)
// page('/edit/:albumId', editView)
page.start()



//logout
document.querySelector('a[href="/logout"]').addEventListener('click', logout)

export const updateInfo = () => {
    let userDiv = document.querySelector('.user')
    let guestDiv = document.querySelector('.guest')

    if (localStorage.length == 0) {
        userDiv.style.display = 'none'
        guestDiv.style.display = 'inline'
    } else {
        userDiv.style.display = 'inline'
        guestDiv.style.display = 'none'
    }
}
updateInfo()


export function showHomePage() {
    const template = html`
<section id="hero">
    <h1>Welcome to Elden Ring Explorer, your gateway
        to the mystical world of Elden Ring! Embark
        on an epic journey through a land shrouded
        in myth and mystery. Whether you're a seasoned
        adventurer or new to this realm, our app will
        guide you through the wonders and challenges
        that await in this extraordinary game world</h1>
    <img id="hero-img" src="./images/hero.png" alt="hero">
</section>
    `
    render(template, document.querySelector('main'))
}
showHomePage()