// products.js (商品微前端)
window.products = {
  mount: (container) => {
    const productsDiv = document.createElement('div');
    productsDiv.innerHTML = '<h2>商品列表</h2><ul id="productList"></ul>';
    container.appendChild(productsDiv);

    const productList = document.getElementById('productList');
    const products = [
      { id: 1, name: '商品 1 👚', price: 100 },
      { id: 2, name: '商品 2 👔', price: 200 },
      { id: 3, name: '商品 3 🥾', price: 300 }
    ];

    products.forEach(product => {
      const li = document.createElement('li');
      li.textContent = `${product.name} - $${product.price} - `;
      const addButton = document.createElement('button');
      addButton.textContent = '加入購物車';
      addButton.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('addToCart', { detail: product }));
      });
      li.appendChild(addButton);
      productList.appendChild(li);
    });
  }
};