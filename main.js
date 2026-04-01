import { games } from "./Data.js";
import { displayGames } from "./FilterByCategory.js";
import { cart_modal } from "./Panier.js";
import { cart_icon } from "./Panier.js";
import { close_cart } from "./Panier.js";
let image_slider = document.getElementById("image_slider");
let search_input = document.getElementById('search_input');
image_slider.innerHTML = "";
games.forEach((game) => {
    image_slider.innerHTML += `
    <div class="bg-white rounded-lg shadow-lg p-4 transition duration-500 ease-in-out hover:scale-95  hover:translate-y-1 hover:shadow-inner bg-white rounded-lg shadow-lg p-4">
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

function FilterGames(value){
    image_slider.innerHTML = '';
    for (let i = 0 ; i <games.length ; i++){
        if (games[i].title.toLocaleLowerCase().includes(value.toLocaleLowerCase())){
            image_slider.innerHTML += `
    <div class="bg-white rounded-lg shadow-lg p-4 transition duration-300 hover:scale-10 hover:shadow-inner bg-white rounded-lg shadow-lg p-4">
    <img src="${games[i].image}" class="w-full h-48 object-cover rounded-lg">

    <h2 class="text-xl font-bold mt-2">${games[i].title}</h2>
    <p class="text-gray-600 text-sm">${games[i].category}</p>
    <p class="text-blue-600 font-semibold">$${games[i].price}</p>
    <p class = "message text-green-500 text-xl"></p>
   <button 
    class="btn_panier mt-2 w-[100%] bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
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
let cart_count = document.getElementById('cart_count');
cart_count.innerHTML = 0;
let buttons = document.querySelectorAll('.btn_panier');
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // let game = games[index];
        cart_count.innerHTML++;
        let message = button.parentElement.querySelector('.message');
        message.innerHTML = "Produit ajouté au panier !";
        setTimeout(() => {
            message.innerHTML = "";
        }, 2000);
    });
});

