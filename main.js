import { games } from "./Data.js";
import { AficherPanier } from "./Panier.js";
import { displayGames } from "./FilterByCategory.js";
import { cart_modal } from "./Panier.js";
import { cart_icon } from "./Panier.js";
import { close_cart } from "./Panier.js";
// import { initDarkMode } from "./darkmode.js";
// document.addEventListener("DOMContentLoaded", () => {
//   initDarkMode();
// });
let image_slider = document.getElementById("image_slider");
let search_input = document.getElementById('search_input');
let cart_count = document.getElementById('cart_count');
export function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}
export function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
image_slider.innerHTML = "";
games.forEach((game) => {
    image_slider.innerHTML += `
    <div class="bg-white rounded-lg shadow-lg p-4 transition duration-500 ease-in-out hover:scale-10 cursor-pointer  hover:translate-y-1 hover:shadow-inner bg-white rounded-lg shadow-lg p-4">
    <img src="${game.image}" class="w-full h-48 object-cover rounded-lg">

    <h2 class="text-xl font-bold mt-2">${game.title}</h2>
    <p class="text-gray-600 text-sm">${game.category}</p>
    <p class="text-blue-600 font-semibold">$${game.price}</p>
    <p class = "message text-green-500 text-xl"></p>
   <button 
   data_id = "${game.id}"
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
        <div class="cart bg-white rounded-lg shadow-lg p-4 transition duration-300 hover:scale-10 hover:shadow-inner bg-white rounded-lg shadow-lg p-4">
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
    setupCartButtons();
});
//  cart_count.innerHTML = 0;
function setupCartButtons() {
    let buttons = document.querySelectorAll('.btn_panier');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            let id = button.getAttribute('data_id');
            if(id === null) return;
            else{
                AficherPanier(parseInt(id));
           iziToast.success({
            title: 'OK',
            message: 'Produit ajouté ✅',
            position: 'topCenter',
            timeout: 1000,
        });
            }
            
        });
    });
}
setupCartButtons() 

const btn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btn.classList.remove("hidden");
    } else {
      btn.classList.add("hidden");
    }
  });
  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });


