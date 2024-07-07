import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const editTemplate = (album, onSubmit) => html`
  <section id="edit">
    <div class="form" >
        <img class="border" src="./images/border.png" alt="">
        <h2>Edit Character</h2>
        <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="category" id="category" placeholder="Character Type" .value=${album.category} />
            <input type="text" name="image-url" id="image-url" placeholder="Image URL" .value=${album.imageUrl} />
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="10">${album.description}</textarea>
            <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2"
                cols="10">${album.moreInfo}</textarea>
            <button type="submit">Edit</button>
        </form>
        <img class="border" src="./images/border.png" alt="">
    </div>
</section>
`

const getAlbumDetails = (id) => {

    return fetch(`http://localhost:3030/data/characters/${id}`)
        .then(res => res.json())
};

const editAlbum = (id, album) => {
    return fetch(`http://localhost:3030/data/characters/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(album)
    })
        .then(res => res.json())
};


export const editView = (ctx) => {
    const albumId = ctx.params.albumId
    console.log(albumId);
    getAlbumDetails(albumId)
        .then(album => {
            const onSubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);


                let category = document.getElementById('category').value
                let imageUrl = document.getElementById('image-url').value
                let description = document.getElementById('description').value
                let moreInfo = document.getElementById('additional-info').value


                if (category === '' || imageUrl === '' || description === '' || moreInfo === '') {
                    window.alert('you need to fill all fields')
                    return
                }

                const editedAlbum = {
                    category,
                    imageUrl,
                    description,
                    moreInfo
                };
                if (Object.values(editedAlbum).some(field => field.trim() === '')) {
                    return alert('All fields are required!');
                }

                editAlbum(albumId, editedAlbum)
                    .then(() => {
                        page.redirect(`/details/${albumId}`);
                    });
            }
            render(editTemplate(album, onSubmit), document.querySelector('main'))
        })
}