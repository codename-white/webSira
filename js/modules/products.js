/**
 * Product Module - Shopsirasimmee 🍿 Mirror
 * Manages product data, rendering, filtering, and search
 * Updated with "MADE IN THAILAND" Collection
 */

const PRODUCTS = [
    {
        id: 1,
        name: "สติกเกอร์ MITH #1",
        price: 109,
        category: "Stickers",
        description: "สติกเกอร์ MITH คอลเลกชันพิเศษ เซ็ตที่ 1 สำหรับแปะโน้ตบุ๊กและอุปกรณ์ต่างๆ",
        image: "assets/3.png"
    },
    {
        id: 2,
        name: "สติกเกอร์ MITH #2",
        price: 109,
        category: "Stickers",
        description: "สติกเกอร์ MITH คอลเลกชันพิเศษ เซ็ตที่ 2 รวมดีไซน์สตรีทและป้ายต่างๆ",
        image: "assets/2.png"
    },
    {
        id: 3,
        name: "ไอแก๊ป รุ่นที่ 1",
        price: 349,
        category: "Collectibles",
        description: "เนื้อทองเหลือง รังแตก ไม่ยัดกรุ เดิมๆ สำหรับผู้สนับสนุนล็อตแรก",
        image: "assets/1.png"
    }
];

let currentFilter = 'all';
let currentSearch = '';

export const initProducts = () => {
    console.log("Product Module: Initialized");
    renderProductGrid();
    setupEventListeners();
};

const setupEventListeners = () => {
    // Category Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.category;
            renderProductGrid();
        });
    });

    // Search
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();
            renderProductGrid();
        });
    }
};

const createProductCard = (product) => {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" 
                     onload="console.log('Image loaded: ${product.image}')"
                     onerror="console.error('Failed to load image: ${product.image}'); this.src='https://placehold.co/600x600/f8f9fa/E91E63?text=Image+Not+Found'">
                <span class="category-badge">${product.category}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">฿${product.price.toLocaleString()}</p>
                <button class="btn btn-outline btn-sm add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
};

const renderProductGrid = () => {
    const listContainer = document.getElementById('products-list');
    if (!listContainer) return;

    // Filter and Search logic
    const filteredProducts = PRODUCTS.filter(p => {
        const matchesCategory = currentFilter === 'all' || p.category === currentFilter;
        const matchesSearch = p.name.toLowerCase().includes(currentSearch);
        return matchesCategory && matchesSearch;
    });

    // Clear the container but keep the filters
    const existingHeader = listContainer.querySelector('.section-header');
    const existingGrid = listContainer.querySelector('.product-grid');
    
    if (!existingHeader) {
        const sectionHeader = `
            <div class="section-header">
                <h2>Shopsirasimmee Collections 🍿</h2>
                <p class="section-desc">สัมผัสคอลเลกชันพิเศษ "Made in Thailand" ที่คัดสรรมาเพื่อคุณโดยเฉพาะ</p>
            </div>
        `;
        listContainer.insertAdjacentHTML('beforeend', sectionHeader);
    }

    if (!existingGrid) {
        listContainer.insertAdjacentHTML('beforeend', '<div class="product-grid"></div>');
    }

    const gridContainer = listContainer.querySelector('.product-grid');

    if (filteredProducts.length === 0) {
        gridContainer.innerHTML = `<p class="empty-msg">ไม่พบสินค้าที่ตรงตามเงื่อนไขการค้นหาครับ Maker</p>`;
    } else {
        gridContainer.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    }

    // Re-attach listeners for Add to Cart buttons
    gridContainer.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const product = PRODUCTS.find(p => p.id === id);
            if (product) {
                const event = new CustomEvent('add-to-cart', { detail: product });
                window.dispatchEvent(event);
            }
        });
    });
};
