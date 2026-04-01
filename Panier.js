let cart_icon = document.getElementById('cart_icon');
let cart_modal = document.getElementById('cart_modal');
let close_cart = document.getElementById('close_cart');
let cart_count = document.getElementById('cart_count');
let btn_panier = document.getElementById('btn_panier');
console.log(btn_panier);

export { cart_icon, cart_modal, close_cart, cart_count };
cart_icon.onclick = function() {
    cart_modal.classList.remove('hidden');
}
close_cart.onclick = function(){
    cart_modal.classList.add('hidden');
}

export function AficherPanier(){
    
}