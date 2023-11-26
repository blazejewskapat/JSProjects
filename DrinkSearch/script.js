

const search = document.querySelector(".search");
const li = document.querySelectorAll("li");

// Search text input in drinks list
const searchEngine = (evt) => {
    const text = evt.target.value.toLowerCase();
    li.forEach(el => {
        const textTemp = el.textContent.toLowerCase();
        if (textTemp.indexOf(text) !== -1) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    })
}

// Search text input in drinks list - with regexp
// const searchEngine = (evt) => {
//     li.forEach(el => {
//         const match = new RegExp(search.value, 'i').test(el.textContent)
//         if (!match) {
//             el.style.display = 'none';
//         } else {
//             el.style.display = 'block';
//         }
//     })
// }

search.addEventListener("keyup", searchEngine);

