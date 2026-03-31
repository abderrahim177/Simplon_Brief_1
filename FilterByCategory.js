let buttons = document.querySelectorAll('.button');
let image_slider = document.getElementById("image_slider");
import { games } from "./Data.js";
buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        const category = btn.getAttribute("data-cat");

        if(category === "all"){
            displayGames(games);
        } else {
            const filtered = games.filter(game => game.category === category);
            displayGames(filtered);
        }

    });
});

export function displayGames(gamesToDisplay){
    image_slider.innerHTML = "";

    gamesToDisplay.forEach(game => {
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
}