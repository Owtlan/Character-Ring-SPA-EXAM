import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const createTemplate = () => html`
<section id="create">
    <div class="form">
        <img class="border" src="./images/border.png" alt="">
        <h2>Add Character</h2>
        <form class="create-form" @submit=${addItem}>
            <input type="text" name="category" id="category" placeholder="Character Type" />
            <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
            <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2"
                cols="10"></textarea>
            <button type="submit">Add Character</button>
        </form>
        <img class="border" src="./images/border.png" alt="">
    </div>
</section>
`

function addItem(e) {
    e.preventDefault()

    let category = document.getElementById('category').value
    let imageUrl = document.getElementById('image-url').value
    let description = document.getElementById('description').value
    let moreInfo = document.getElementById('additional-info').value


    if (category === '' || imageUrl === '' || description === '' || moreInfo === '') {
        window.alert('you need to fill all fields')
        return
    }


    fetch('http://localhost:3030/data/characters', {
        method: 'POST',
        headers: {
            'X-Authorization': localStorage.token
        },
        body: JSON.stringify({
            category,
            imageUrl,
            description,
            moreInfo
        })
    })
        .then(res => res.json())
        .then(data => {
            page.redirect('/dashboard')
        })
        .catch(error => alert(error.message))
}

export const createView = (ctx) =>
    render(createTemplate(), document.querySelector('main'))