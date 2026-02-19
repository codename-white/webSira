/**
 * Web SiraSimmee - Main Application Entry Point
 * Architecture: ES6 Modules
 */

console.log("SiraSimmee AI Architect: System Online");

import { initProducts } from './modules/products.js';
import { initCart } from './modules/cart.js';
import { initCheckout } from './modules/checkout.js';
import { initNavbar } from './modules/navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing App...");
    
    // Start modules
    initNavbar();
    initProducts();
    initCart();
    initCheckout();
});
