import { games } from "./Data.js";
import { displayGames } from "./FilterByCategory.js";

let image_slider = document.getElementById("image_slider");
let search_input = document.getElementById('search_input');
image_slider.innerHTML = "";
games.forEach((game) => {
    image_slider.innerHTML += `
    <div class="bg-white rounded-lg shadow-lg p-4">
    <img src="${game.image}" class="w-full h-48 object-cover rounded-lg">

    <h2 class="text-xl font-bold mt-2">${game.title}</h2>
    <p class="text-gray-600 text-sm">${game.category}</p>
    <p class="text-blue-600 font-semibold">$${game.price}</p>

    <button onclick="ADD_TO_CART(${game.id})" 
    class="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Ajouter au panier
    </button>
</div>
`;
});

function FilterGames(value){
    image_slider.innerHTML = '';
    for (let i = 0 ; i <games.length ; i++){
        if (games[i].title.toLocaleLowerCase().includes(value.toLocaleLowerCase())){
            image_slider.innerHTML += `
    <div class="bg-white rounded-lg shadow-lg p-4">
    <img src="${games[i].image}" class="w-full h-48 object-cover rounded-lg">

    <h2 class="text-xl font-bold mt-2">${games[i].title}</h2>
    <p class="text-gray-600 text-sm">${games[i].category}</p>
    <p class="text-blue-600 font-semibold">$${games[i].price}</p>

    <button onclick="ADD_TO_CART(${games[i].id})" 
    class="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Ajouter au panier
    </button>
</div>
`;
        }
    }
}


search_input.addEventListener("keyup", () => {
    let value = search_input.value;
    FilterGames(value);
});
// let sliderImg = document.getElementById("slider_img");
// let sliderTitle = document.getElementById("slider_title");
// // Auto slider with fade effect
// setInterval(() => {
//     sliderImg.style.opacity = 0;
//     sliderTitle.style.opacity = 0;
//     setTimeout(() => {
//         currentIndex++;
//         if (currentIndex >= games.length) currentIndex = 0;
//         sliderImg.src = games[currentIndex].image;
//         sliderTitle.textContent = games[currentIndex].title;
//         sliderImg.style.opacity = 1;
//         sliderTitle.style.opacity = 1;
//     }, 300);
// }, 3000);

// // Next / Prev buttons
// document.getElementById("next").onclick = () => {
//     currentIndex++;
//     if (currentIndex >= games.length) currentIndex = 0;
//     sliderImg.src = games[currentIndex].image;
//     sliderTitle.textContent = games[currentIndex].title;
// };
// document.getElementById("prev").onclick = () => {
//     currentIndex--;
//     if (currentIndex < 0) currentIndex = games.length - 1;
//     sliderImg.src = games[currentIndex].image;
//     sliderTitle.textContent = games[currentIndex].title;
// };