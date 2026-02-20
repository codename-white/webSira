let cart = JSON.parse(localStorage.getItem('sirashim_cart')) || [];

export const initCart = () => {
    console.log("Cart Module: Initialized");
    updateCartUI();
    setupCartListeners();
};

const setupCartListeners = () => {
    // Listen for add-to-cart events (dispatched from products or other modules)
    window.addEventListener('add-to-cart', (e) => {
        addItem(e.detail);
    });

    // Toggle Cart Drawer
    const cartToggle = document.getElementById('cart-toggle');
    const cartClose = document.getElementById('cart-close');
    const overlay = document.getElementById('cart-overlay');

    if (cartToggle) cartToggle.addEventListener('click', toggleCart);
    if (cartClose) cartClose.addEventListener('click', toggleCart);
    if (overlay) overlay.addEventListener('click', toggleCart);
};

const clearCart = () => {
    cart = [];
    saveCart();
    updateCartUI();
};

export const addItem = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    openCart(); // Auto open drawer when adding
};

const removeItem = (id) => {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
};

const updateQuantity = (id, delta) => {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeItem(id);
    } else {
        saveCart();
        updateCartUI();
    }
};

const saveCart = () => {
    localStorage.setItem('sirashim_cart', JSON.stringify(cart));
};

const toggleCart = () => {
    document.body.classList.toggle('cart-open');
};

const openCart = () => {
    document.body.classList.add('cart-open');
};

const updateCartUI = () => {
    const list = document.getElementById('cart-items-list');
    const countBadge = document.getElementById('cart-count');
    const totalElement = document.getElementById('cart-total-amount');

    if (!list) return;

    // Update Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countBadge) {
        countBadge.innerText = totalItems;
        countBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Update List
    const emptyView = document.getElementById('cart-empty-view');
    const footer = document.getElementById('cart-footer');
    const continueBtn = document.getElementById('continue-shopping');

    if (continueBtn && !continueBtn.dataset.listener) {
        continueBtn.addEventListener('click', toggleCart);
        continueBtn.dataset.listener = 'true';
    }

    if (cart.length === 0) {
        if (list) list.style.display = 'none';
        if (emptyView) emptyView.style.display = 'block';
        if (footer) footer.style.display = 'none';
        if (totalElement) totalElement.innerText = '฿0';
        return;
    }

    if (list) list.style.display = 'block';
    if (emptyView) emptyView.style.display = 'none';
    if (footer) footer.style.display = 'block';

    let total = 0;
    list.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>฿${item.price.toLocaleString()}</p>
                    <div class="quantity-controls">
                        <button class="qty-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">&times;</button>
            </div>
        `;
    }).join('');

    if (totalElement) totalElement.innerText = `฿${total.toLocaleString()}`;

    // Re-attach listeners for buttons in the list
    list.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const delta = e.target.classList.contains('plus') ? 1 : -1;
            updateQuantity(id, delta);
        });
    });

    list.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            removeItem(id);
        });
    });
};
