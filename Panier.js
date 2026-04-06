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
    let cart = getCart();
    let game = games.find(g => g.id === id);
    let exxisting = cart.find(e => e.id === id);

    if (exxisting){
        return;
    } else {
        cart.push(game);
        saveCart(cart);
        cart_count.innerHTML = cart.length;

        cart_items.innerHTML += `
<div class="cart-item flex flex-col md:flex-row items-center justify-between gap-4 border-b bg-gray-100 p-3 rounded-lg shadow">
    <div class="flex items-center gap-3 w-full md:w-auto">
        <img src="${game.image}" class="w-20 h-20 md:w-24 md:h-24 object-cover rounded">
        <div>
            <h3 class="text-sm md:text-md font-bold">${game.title}</h3>
            <p class="text-gray-600 text-xs md:text-sm">${game.category}</p>
            <p class="price text-blue-600 font-semibold text-sm md:text-md">$${game.price}</p>
        </div>
    </div>

    <div class="flex items-center justify-between w-full md:w-auto gap-3">
        <div class="flex items-center gap-2">
            <button class="moins bg-gray-400 text-white px-3 py-1 rounded">-</button>
            <p class="counter font-semibold">1</p>
            <button class="plus bg-gray-400 text-white px-3 py-1 rounded">+</button>
        </div>

        <i data-id="${game.id}" class="delete_item fa-solid fa-trash text-red-500 cursor-pointer"></i>
    </div>
</div>
`;
    }
    updateTotal();
}

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

    // DELETE
    if (e.target.classList.contains('delete_item')) {
        let id = parseInt(e.target.getAttribute('data-id'));
        let cart = getCart();

        let index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1); 
        }

        saveCart(cart);
        e.target.closest('.cart-item').remove();
        cart_count.innerHTML = cart.length;
        updateTotal();
    }
});

cart_icon.onclick = function() {
    cart_modal.classList.remove('hidden');
}

let commander = document.getElementById('commander');

commander.addEventListener('click' , () => {
    if(Somme < 1){
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'le panier est vide ❌',
        });
    } else {
        Commander();
        Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Produit ajouté avec succés ✅',
        });
        CloseCart();
    }
});

function Commander(){
    cart_items.innerHTML = "";
    localStorage.removeItem('cart');
    cart_count.innerHTML = 0;
    updateTotal();
}

export { cart_icon, cart_modal, close_cart, cart_count };

function CloseCart(){
    if(Somme < 1){
        return;
    } else {
        cart_modal.classList.add('hidden');
    }
}

close_cart.onclick = function(){
    cart_modal.classList.add('hidden');
}

function loadCart() {
    let cart = getCart();
    cart_items.innerHTML = "";
    cart.forEach(game => {
        cart_items.innerHTML += `
<div class="cart-item flex flex-col md:flex-row items-center justify-between gap-4 border-b bg-gray-100 p-3 rounded-lg shadow">

    <div class="flex items-center gap-3 w-full md:w-auto">
        <img src="${game.image}" class="w-20 h-20 md:w-24 md:h-24 object-cover rounded">
        <div>
            <h3 class="text-sm md:text-md font-bold">${game.title}</h3>
            <p class="text-gray-600 text-xs md:text-sm">${game.category}</p>
            <p class="price text-blue-600 font-semibold">$${game.price}</p>
        </div>
    </div>

    <div class="flex items-center justify-between w-full md:w-auto gap-3">
        <div class="flex items-center gap-2">
            <button class="moins bg-gray-400 text-white px-3 py-1 rounded">-</button>
            <p class="counter font-semibold">1</p>
            <button class="plus bg-gray-400 text-white px-3 py-1 rounded">+</button>
        </div>

        <i data-id="${game.id}" class="delete_item fa-solid fa-trash text-red-500 cursor-pointer"></i>
    </div>

</div>
`;
    });
}

let Somme = 0;
getCart().length > 0 && loadCart();

function updateTotal() {
    let total = 0;
    let items = cart_items.querySelectorAll('.cart-item');
    items.forEach(item => {
        let priceText = item.querySelector('.price').innerText;
        let price = parseFloat(priceText.replace('$', ''));
        let quantity = parseInt(item.querySelector('.counter').innerText);

        total += price * quantity;
    });

    Somme = total;
    document.getElementById('cart_total').innerText = total.toFixed(2);
}

updateTotal();