// cart.js
window.cart = {
    state: {
        items: [],
        total: 0
    },

    mount: function(container) {
        this.container = container;
        this.render();
        this.attachListeners();
    },

    render: function() {
        this.container.innerHTML = `
            <h2>購物車</h2>
            <ul id="cartList"></ul>
            <p>總計: <span id="cartTotal">$0</span></p>
            <button id="checkoutButton">結帳</button>
        `;
        this.updateCart();
    },

    attachListeners: function() {
        this.container.querySelector('#checkoutButton').addEventListener('click', () => this.checkout());
        window.eventSystem.on('addToCart', product => this.addItem(product));
    },

    addItem: function(product) {
        this.state.items.push(product);
        this.state.total += product.price;
        this.updateCart();
    },

    removeItem: function(index) {
        const removedItem = this.state.items.splice(index, 1)[0];
        this.state.total -= removedItem.price;
        this.updateCart();
    },

    updateCart: function() {
        const cartList = this.container.querySelector('#cartList');
        cartList.innerHTML = this.state.items.map((item, index) => `
            <li>
                ${item.name} - $${item.price}
                <button onclick="window.cart.removeItem(${index})">移除</button>
            </li>
        `).join('');
        this.container.querySelector('#cartTotal').textContent = `$${this.state.total}`;
    },

    checkout: function() {
        if (this.state.items.length === 0) {
            alert('購物車是空的，請先添加商品。');
            return;
        }

        const orderSummary = this.state.items.map(item => `${item.name}: $${item.price}`).join('\n');
        const currentOrderId = parseInt(localStorage.getItem('currentOrderId') || '1');

        if (confirm(`訂單 #${currentOrderId} 確認！總計: $${this.state.total}\n\n訂單明細:\n${orderSummary}`)) {
            const newOrder = {
                orderId: currentOrderId,
                date: new Date().toLocaleString(),
                total: this.state.total,
                items: [...this.state.items]
            };

            window.eventSystem.emit('newOrder', newOrder);

            localStorage.setItem('currentOrderId', currentOrderId + 1);

            this.state.items = [];
            this.state.total = 0;
            this.updateCart();
        }
    }
};

/* 
React 轉換注意事項：
1. 將 state 轉換為 React 的 useState 或 useReducer。
2. 將 render 方法轉換為 React 組件的 return 語句，使用 JSX。
3. 使用 useEffect 來處理事件監聽和清理。
4. 將方法轉換為 React 組件的方法或自定義 hooks。
5. 考慮使用 Context API 或 Redux 來管理購物車狀態。
*/