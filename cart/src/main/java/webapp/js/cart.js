// cart.js (購物車微前端)
window.cart = {
	mount: (container) => {
		let currentOrderId = parseInt(localStorage.getItem('currentOrderId')) || 1;

		const cartDiv = document.createElement('div');
		cartDiv.innerHTML = `
	      <h2>購物車</h2>
	      <ul id="cartList"></ul>
	      <p>總計: <span id="cartTotal">$0</span></p>
	      <button id="checkoutButton">結帳</button>
	    `;
		container.appendChild(cartDiv);

		const cartList = document.getElementById('cartList');
		const cartTotal = document.getElementById('cartTotal');
		const checkoutButton = document.getElementById('checkoutButton');
		let total = 0;
		let items = [];

		window.addEventListener('addToCart', (event) => {
			const product = event.detail;

			// 添加商品到 items 陣列
			items.push(product);

			const li = document.createElement('li');
			li.textContent = `${product.name} - $${product.price}`;

			// 創建移除按鈕
			const removeButton = document.createElement('button');
			removeButton.textContent = '移除';
			removeButton.style.marginLeft = '10px';

			// 按下移除按鈕時，從購物車移除該商品
			removeButton.addEventListener('click', () => {
				console.log("del product: " + JSON.stringify(product));
				const index = items.indexOf(product); // 找到該項目的索引, 若沒有找到則返回 -1
				if (index > -1) { // 如果有找到該項
					items.splice(index, 1); // 僅移除該項目(1 表示只刪除 1 個元素)
					cartList.removeChild(li);
					total -= product.price;
					cartTotal.textContent = `$${total}`;
				}
			});

			li.appendChild(removeButton);
			cartList.appendChild(li);

			total += product.price;
			cartTotal.textContent = `$${total}`;
		});

		checkoutButton.addEventListener('click', () => {
			if (items.length === 0) {
				alert('購物車是空的，請先添加商品。');
				return;
			}

			const orderSummary = items.map(item => `${item.name}: $${item.price}`).join('\n');

			// 顯示訂單摘要，並詢問, 若確定則清空購物車
			if (!confirm(`訂單 #${currentOrderId} 確認！總計: $${total}\n\n訂單明細:\n${orderSummary}`)) {
				return;
			}

			// 創建新訂單
			const newOrder = {
				orderId: currentOrderId,
				date: new Date().toLocaleString(),
				total: total,
				items: items
			};

			// 儲存新訂單
			currentOrderId++;
			localStorage.setItem('currentOrderId', currentOrderId);

			// 發送 newOrder 事件
			// 這將觸發 orderHistory.js 中的 window.addEventListener('newOrder', (event) => { ... });
			window.dispatchEvent(new CustomEvent('newOrder', { detail: newOrder }));

			// 清空購物車	      	
			cartList.innerHTML = '';
			cartTotal.textContent = '$0';
			total = 0;
			items = [];
		});
	}
};
