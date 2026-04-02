import { games } from "./Data.js";
import { getCart } from "./main.js";
import { saveCart } from "./main.js";
let cart_icon = document.getElementById('cart_icon');
let cart_modal = document.getElementById('cart_modal');
let close_cart = document.getElementById('close_cart');
let cart_count = document.getElementById('cart_count');
let cart_items = document.getElementById('cart_items');
export function AficherPanier(id){
    let cart = getCart();
    let game = games.find(g => g.id === id);
    if (game){
        cart.push(game);
        saveCart(cart);
        cart_count.innerHTML = cart.length;
     cart_items.innerHTML += `
<div class="flex flex-col md:flex-row items-center justify-between gap-4 border-b bg-gray-100 p-3 rounded-lg shadow">

    <!-- LEFT (image + info) -->
    <div class="flex items-center gap-3 w-full md:w-auto">
        <img src="${game.image}" 
             class="w-20 h-20 md:w-24 md:h-24 object-cover rounded">

        <div>
            <h3 class="text-sm md:text-md font-bold">${game.title}</h3>
            <p class="text-gray-600 text-xs md:text-sm">${game.category}</p>
            <p class="text-blue-600 font-semibold text-sm md:text-md">$${game.price}</p>
        </div>
    </div>

    <!-- RIGHT (controls) -->
    <div class="flex items-center justify-between w-full md:w-auto gap-3">

        <div class="flex items-center gap-2">
            <button class="moins bg-gray-400 text-white text-sm md:text-lg px-3 py-1 rounded hover:bg-gray-500">-</button>
            
            <p class="counter text-sm md:text-lg font-semibold">1</p>
            
            <button class="plus bg-gray-400 text-white text-sm md:text-lg px-3 py-1 rounded hover:bg-gray-500">+</button>
        </div>

        <i class="fa-solid fa-trash text-red-500 hover:text-red-700 cursor-pointer text-lg"></i>
    </div>

</div>
`;
    }
}
cart_items.addEventListener('click', (e) => {

    // PLUS
    if (e.target.classList.contains('plus')) {
        let counter = e.target.parentElement.querySelector('.counter');
        let value = parseInt(counter.innerHTML);
        counter.innerHTML = value + 1;
    }

    // MOINS
    if (e.target.classList.contains('moins')) {
        let counter = e.target.parentElement.querySelector('.counter');
        let value = parseInt(counter.innerHTML);

        if (value > 1) {
            counter.innerHTML = value - 1;
        }
    }

});

let totalElement = document.querySelector('.total');
function TotalPrice(){
    let cart = getCart();
    let total = cart.reduce((sum , game) => sum + game.price,0);
    totalElement.innerHTML = `Total : ${total}`;
}
export { cart_icon, cart_modal, close_cart, cart_count };
cart_icon.onclick = function() {
    cart_modal.classList.remove('hidden');
} 
close_cart.onclick = function(){
    cart_modal.classList.add('hidden');
}

