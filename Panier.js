import { games } from "./Data.js";
import { getCart } from "./main.js";
import { saveCart } from "./main.js";
let cart_icon = document.getElementById('cart_icon');
let cart_modal = document.getElementById('cart_modal');
let close_cart = document.getElementById('close_cart');
let cart_count = document.getElementById('cart_count');
let cart_items = document.getElementById('cart_items');
cart_count.innerHTML = getCart().length;
export function AficherPanier(id){
    // localStorage.removeItem('cart');
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

    <div class="flex items-center justify-between w-full md:w-auto gap-3">

        <div class="flex items-center gap-2">
            <button class="moins bg-gray-400 text-white text-sm md:text-lg px-3 py-1 rounded hover:bg-gray-500">-</button>
            
            <p class="counter text-sm md:text-lg font-semibold">1</p>
            
            <button class="plus bg-gray-400 text-white text-sm md:text-lg px-3 py-1 rounded hover:bg-gray-500">+</button>
        </div>

        <i id = "delete_item" data-id = "${game.id}" class="fa-solid fa-trash text-red-500 hover:text-red-700 cursor-pointer text-lg"></i>
    </div>
</div>
`;
    }
}
let delete_buttons = document.querySelectorAll('#delete-item');

cart_items.addEventListener('click', (e) => {
    // PLUS
    if (e.target.classList.contains('plus')) {
        let counter = e.target.parentElement.querySelector('.counter');
        let value = parseInt(counter.innerHTML);
        counter.innerHTML = value + 1;
        updateTotal();
    }
    // MOINS
    if (e.target.classList.contains('moins')) {
        let counter = e.target.parentElement.querySelector('.counter');
        let value = parseInt(counter.innerHTML);
        if (value > 1) {
            counter.innerHTML = value - 1;
        }
        updateTotal();
    }
    if (e.target.id === 'delete_item') {
        let id = parseInt(e.target.getAttribute('data-id'));
        let cart = getCart();
        let index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1); 
        }
        saveCart(cart);
        e.target.closest('.flex.flex-col').remove();
        cart_count.innerHTML = cart.length;
        updateTotal();
    }
});
let commander = document.getElementById('commander');
commander.addEventListener('click' , () => {
    Commander();
    Toastify ({
        text: "Merci pour votre Commande !",
        duration: 2000,
        gravity: "top",
        position: "center",
        backgroundColor : "orange",
    }).showToast();
})
function Commander(){
    cart_items.innerHTML = "";
    localStorage.removeItem('cart');
    cart_count.innerHTML = 0;
    updateTotal();
}
export { cart_icon, cart_modal, close_cart, cart_count };
cart_icon.onclick = function() {
    cart_modal.classList.remove('hidden');
} 
close_cart.onclick = function(){
    cart_modal.classList.add('hidden');
}

function loadCart() {
    let cart = getCart();
    cart_items.innerHTML = "";
    cart.forEach(game => {
        cart_items.innerHTML += `
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 border-b bg-gray-100 p-3 rounded-lg shadow">

    <div class="flex items-center gap-3 w-full md:w-auto">
        <img src="${game.image}" 
             class="w-20 h-20 md:w-24 md:h-24 object-cover rounded">
        <div>
            <h3 class="text-sm md:text-md font-bold">${game.title}</h3>
            <p class="text-gray-600 text-xs md:text-sm">${game.category}</p>
            <p class="text-blue-600 font-semibold text-sm md:text-md">$${game.price}</p>
        </div>
    </div>

    <div class="flex items-center justify-between w-full md:w-auto gap-3">
        <div class="flex items-center gap-2">
            <button class="moins bg-gray-400 text-white px-3 py-1 rounded">-</button>
            <p class="counter font-semibold">1</p>
            <button class="plus bg-gray-400 text-white px-3 py-1 rounded">+</button>
        </div>

        <i id="delete_item" data-id="${game.id}" class="fa-solid fa-trash text-red-500 cursor-pointer"></i>
    </div>

</div>
`;
    });
}
getCart().length > 0 && loadCart();
updateTotal();
function updateTotal() {
    let total = 0;
    let items = cart_items.querySelectorAll('.flex.flex-col');
    items.forEach(item => {
        let priceText = item.querySelector('.text-blue-600').innerText;
        let price = parseFloat(priceText.replace('$', ''));
        let quantity = parseInt(item.querySelector('.counter').innerText);
        total += price * quantity;
    });
    document.getElementById('cart_total').innerText = total.toFixed(2);
}
updateTotal()