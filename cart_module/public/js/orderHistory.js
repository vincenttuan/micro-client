// orderHistory.js
window.orderHistory = {
    state: {
        orders: JSON.parse(localStorage.getItem('orderHistory')) || []
    },

    mount: function(container) {
        this.container = container;
        this.render();
        this.attachListeners();
    },

    render: function() {
        this.container.innerHTML = `
            <h2>購買歷史記錄</h2>
            <ul id="orderHistoryList"></ul>
        `;
        this.updateOrderList();
    },

    attachListeners: function() {
        window.eventSystem.on('newOrder', (newOrder) => this.addOrder(newOrder));
    },

    addOrder: function(newOrder) {
        this.state.orders.unshift(newOrder);
        localStorage.setItem('orderHistory', JSON.stringify(this.state.orders));
        this.updateOrderList();
    },

    updateOrderList: function() {
        const orderHistoryList = this.container.querySelector('#orderHistoryList');
        orderHistoryList.innerHTML = this.state.orders.map(order => {
            const itemCount = new Map();
            order.items.forEach(item => {
                if (itemCount.has(item.name)) {
                    const existingItem = itemCount.get(item.name);
                    existingItem.quantity += 1;
                    existingItem.totalPrice += item.price;
                } else {
                    itemCount.set(item.name, { quantity: 1, price: item.price, totalPrice: item.price });
                }
            });

            return `
                <li>
                    <strong>訂單 ${order.orderId}</strong><br>
                    日期: ${order.date}<br>
                    總額: $${order.total.toFixed(1)}<br>
                    數量: ${order.items.length}<br>
                    商品:
                    <ul>
                        ${Array.from(itemCount.entries()).map(([name, data]) => `
                            <li>
                                ${name} - 單價: $${data.price.toFixed(1)}, 
                                數量: ${data.quantity}, 
                                小計: $${data.totalPrice.toFixed(1)}
                            </li>
                        `).join('')}
                    </ul>
                    <hr>
                </li>
            `;
        }).join('');
    }
};

/* 
React 轉換注意事項：
1. 將 state 轉換為 React 的 useState 或 useReducer。
2. 使用 useEffect 來從 localStorage 加載初始訂單數據。
3. 將 render 方法轉換為 React 組件的 return 語句，使用 JSX。
4. 考慮將訂單列表項抽取為單獨的 React 組件以提高可維護性。
5. 使用 useCallback 來優化事件處理函數。
*/