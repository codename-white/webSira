/**
 * Checkout Module
 * Handles order summary, delivery form, and submission
 */

let isCheckoutOpen = false;

export const initCheckout = () => {
    console.log("Checkout Module: Initialized");
    setupListeners();
};

const setupListeners = () => {
    const checkoutClose = document.getElementById('checkout-close');
    const checkoutForm = document.getElementById('checkout-form');

    if (checkoutClose) {
        checkoutClose.addEventListener('click', closeCheckout);
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleOrderSubmission();
        });
    }

    // Modal background click to close
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeCheckout();
        });
    }
};

export const openCheckout = (cartItems, total) => {
    if (cartItems.length === 0) {
        alert("ตะกร้าของคุณยังว่างอยู่ครับ Maker");
        return;
    }

    const modal = document.getElementById('checkout-modal');
    const summaryList = document.getElementById('checkout-summary-list');
    const totalAmount = document.getElementById('checkout-total-amount');

    if (modal && summaryList && totalAmount) {
        // Render Summary
        summaryList.innerHTML = cartItems.map(item => `
            <div class="summary-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>฿${(item.price * item.quantity).toLocaleString()}</span>
            </div>
        `).join('');

        totalAmount.innerText = `฿${total.toLocaleString()}`;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
        isCheckoutOpen = true;
    }
};

const closeCheckout = () => {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        isCheckoutOpen = false;
    }
};

const handleOrderSubmission = () => {
    const btn = document.querySelector('.confirm-order-btn');
    const originalText = btn.innerText;

    // Fast loading simulation
    btn.disabled = true;
    btn.innerText = "กำลังประมวลผล...";

    setTimeout(() => {
        // Mock Success
        alert("🎉 สั่งซื้อสำเร็จ! ลูก้ากำลังเตรียมจัดส่งให้ครับ");
        
        // Dispatch success event to clear cart
        window.dispatchEvent(new CustomEvent('order-success'));
        
        closeCheckout();
        btn.disabled = false;
        btn.innerText = originalText;
        
        // Clear form
        document.getElementById('checkout-form').reset();
    }, 1500);
};
