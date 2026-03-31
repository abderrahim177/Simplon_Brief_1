let cart_icon = document.getElementById('cart_icon');
let cart_modal = document.getElementById('cart_modal');
let close_cart = document.getElementById('close_cart');

export { cart_icon, cart_modal, close_cart };
cart_icon.onclick = function() {
    cart_modal.classList.remove('hidden');
}
close_cart.onclick = function(){
    cart_modal.classList.add('hidden');
}