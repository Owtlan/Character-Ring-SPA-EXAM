import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';



let dashboardTemplate = (catalog) => html`
  <h2>Characters</h2>
<section id="characters">
    <!-- Display a div with information about every post (if any)-->
      ${catalog.length > 0 ? catalog.map(c => html`
    <div class="character">
        <img src="${c.imageUrl}" alt="example1" />
        <div class="hero-info">
            <h3 class="category">${c.category}</h3>
            <p class="description">${c.description}</p>
            <a class="details-btn" href="/details/${c._id}">More Info</a>
        </div>
            `) : html`<h2>No added Heroes yet.</h2>`}
    </div>
</section>`

const getCatalog = () => {
    return fetch('http://localhost:3030/data/characters?sortBy=_createdOn%20desc')
        .then(res => res.json())
        .then(data => Object.values(data))
}

export const catalogView = (ctx) =>
    getCatalog()
        .then(catalog => render(dashboardTemplate(catalog), document.querySelector('main')))