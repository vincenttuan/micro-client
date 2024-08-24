// main.js (主應用程序)
const app = document.getElementById('app');
// 載入微前端
// 這個函數是整個架構的關鍵，它實現了動態加載和初始化微前端模塊
function loadMicrofrontend(name, elementId) {
  const script = document.createElement('script');
  script.src = `js/${name}.js?${new Date()}`;
  document.body.appendChild(script);
  script.onload = () => {
    window[name].mount(document.getElementById(elementId));
  };
}

// 創建容器元素
const messagesContainer = document.createElement('div');
messagesContainer.id = 'messages';
const productsContainer = document.createElement('div');
productsContainer.id = 'products';
const cartContainer = document.createElement('div');
cartContainer.id = 'cart';
const orderHistoryContainer = document.createElement('div');
orderHistoryContainer.id = 'orderHistory';

app.appendChild(messagesContainer);
app.appendChild(productsContainer);
app.appendChild(cartContainer);
app.appendChild(orderHistoryContainer);

// 載入微前端
loadMicrofrontend('messages', 'messages');
loadMicrofrontend('products', 'products');
loadMicrofrontend('cart', 'cart');
loadMicrofrontend('orderHistory', 'orderHistory');