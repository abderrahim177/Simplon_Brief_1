let buttons = document.querySelectorAll('.button');
let image_slider = document.getElementById("image_slider");
import { games } from "./Data.js";
buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        
        buttons.forEach(b => {
            b.classList.remove("bg-blue-500", "text-white");
            b.classList.add("bg-gray-200");
        });

        
        btn.classList.remove("bg-gray-200");
        btn.classList.add("bg-blue-500", "text-white");

        
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
            <p class = "message text-green-500 text-xl"></p>
            <button 
            class="btn_panier mt-2 w-[100%] bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Ajouter au panier
            </button>
        </div>
        `;
    });
}