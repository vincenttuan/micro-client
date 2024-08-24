// main.js

// 簡單的事件系統
window.eventSystem = {
    listeners: {},
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    },
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
};

// 載入微前端
function loadMicrofrontend(name, elementId) {
    const script = document.createElement('script');
    script.src = `js/${name}.js?${new Date().getTime()}`;
    document.body.appendChild(script);
    script.onload = () => {
        window[name].mount(document.getElementById(elementId));
    };
}

// 創建容器元素並載入微前端
function initApp() {
    const app = document.getElementById('app');
    ['messages', 'products', 'cart', 'orderHistory'].forEach(name => {
        const container = document.createElement('div');
        container.id = name;
        app.appendChild(container);
        loadMicrofrontend(name, name);
    });
}

// 啟動應用
document.addEventListener('DOMContentLoaded', initApp);

// 清除本地存儲的功能
document.getElementById('clearLocalStorage').addEventListener('click', function() {
    if (confirm('確定要清除所有本地儲存的資料嗎？這將重置所有訂單歷史和訂單ID。')) {
        localStorage.clear();
        alert('所有本地儲存的資料已被清除。頁面將重新載入。');
        location.reload();
    }
});

/* 
React 轉換注意事項：
1. 將 eventSystem 替換為 React 的 Context API 或狀態管理庫（如 Redux）。
2. 使用 React 組件替換 loadMicrofrontend 函數。
3. 考慮使用 React.lazy() 和 Suspense 來實現代碼分割和延遲加載。
4. 將清除本地存儲的功能集成到 React 組件中。
*/