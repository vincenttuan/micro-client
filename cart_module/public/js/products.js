// products.js
window.products = {
    state: {
        products: [
            { id: 1, name: '商品 1 👚', price: 100 },
            { id: 2, name: '商品 2 👔', price: 200 },
            { id: 3, name: '商品 3 🥾', price: 300 }
        ]
    },

    mount: function(container) {
        this.container = container;
        this.render();
        this.attachListeners();
    },

    render: function() {
        this.container.innerHTML = `
            <h2>商品列表</h2>
            <ul id="productList"></ul>
        `;
        this.updateProductList();
    },

    updateProductList: function() {
        const productList = this.container.querySelector('#productList');
        productList.innerHTML = this.state.products.map(product => `
            <li data-product-id="${product.id}">
                ${product.name} - $${product.price}
                <button class="add-to-cart-btn">加入購物車</button>
            </li>
        `).join('');
    },

    attachListeners: function() {
        this.container.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-to-cart-btn')) {
                const productId = parseInt(event.target.closest('li').dataset.productId);
                this.addToCart(productId);
            }
        });
    },

    addToCart: function(productId) {
        const product = this.state.products.find(p => p.id === productId);
        if (product) {
            console.log('Adding to cart:', product); // 用於調試
            window.eventSystem.emit('addToCart', product);
        } else {
            console.error('Product not found:', productId);
        }
    }
};

/* 
React 轉換注意事項：
1. 將 state 轉換為 React 的 useState 或 useReducer。
2. 將 render 方法轉換為 React 組件的 return 語句，使用 JSX。
3. 使用 React 的事件處理方式替代事件委託。
4. 考慮將產品項渲染邏輯抽取為單獨的 React 組件。
5. 使用 useCallback 來優化 addToCart 方法。
*/