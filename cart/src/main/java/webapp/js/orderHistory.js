window.orderHistory = {
  mount: (container) => {
    const orderHistoryDiv = document.createElement('div');
    orderHistoryDiv.innerHTML = `
      <h2>購買歷史記錄</h2>
      <ul id="orderHistoryList"></ul>
    `;
    container.appendChild(orderHistoryDiv);

    const orderHistoryList = document.getElementById('orderHistoryList');

    // 模擬從本地存儲或後端獲取訂單歷史
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];

    // 顯示訂單歷史
    const displayOrders = () => {
      orderHistoryList.innerHTML = '';
      orders.forEach((order) => {
        const li = document.createElement('li');

        // 創建一個 Map 來統計每種商品的數量和總價
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

        li.innerHTML = `
          <strong>訂單 ${order.orderId}</strong><br>
          日期: ${order.date}<br>
          總額: $${order.total.toFixed(1)}<br>
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
        `;
        orderHistoryList.appendChild(li);
      });
    };

    displayOrders();

    // 監聽新訂單事件
    window.addEventListener('newOrder', (event) => {
      const newOrder = event.detail;
      orders.unshift(newOrder);
      localStorage.setItem('orderHistory', JSON.stringify(orders));
      displayOrders();
    });
  }
};