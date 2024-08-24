// main.js
// 這裡的程式碼是用來載入微前端的程式碼
name = 'messages';
elementId = 'messages';
script.onload = () => {
	// 這裡的 window[name] 是 messages.js 中的 window.messages
	window[name].mount(document.getElementById(elementId));
};

// messages.js
// 這裡的程式碼是用來載入微前端的程式碼
window.messages = {
    mount: (container) => {
        // 微前端的初始化邏輯
    }
};