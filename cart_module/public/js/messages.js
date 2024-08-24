// messages.js
window.messages = {
	// state 用來組件的狀態, 在這裡用來存放即時訊息
    state: {
        messages: []
    },
	
	// mount 方法用來掛載組件到指定的容器上, 
	// container 指的是網頁上的一個 DOM 元素例如：div, span 等
	// render 方法用來渲染組件的內容
	// attachListeners 方法用來綁定事件監聽器
    mount: function(container) {
        this.container = container;
        this.render();
        this.attachListeners();
    },
	
	// render 方法用來渲染組件的內容, 這裡使用 innerHTML 來設置容器的內容, 內容一般來說是一個 HTML 字串
    render: function() {
        this.container.innerHTML = `
            <h2>即時訊息</h2>
            <ul id="messageList"></ul>
            <input id="messageInput" type="text">
            <button id="sendButton">發送</button>
        `;
        this.updateMessageList(); // 更新即時訊息列表
    },
	
	// attachListeners 方法用來綁定事件監聽器, 監聽器通常是針對使用者的操作, 例如點擊按鈕, 輸入文字等
    attachListeners: function() {
        const sendButton = this.container.querySelector('#sendButton');
        const messageInput = this.container.querySelector('#messageInput');
        sendButton.addEventListener('click', () => this.sendMessage(messageInput.value));
    },
	
	// sendMessage 方法用來發送即時訊息, 這裡將訊息加入到 messages 陣列中, 並更新訊息列表
    sendMessage: function(message) {
        if (message) {
            const now = new Date();
            // 在訊息後面加上時間
            const formattedMessage = `${message} (${now.getHours()}:${now.getMinutes()}:${now.getSeconds()})`;
            // 將訊息加入到 messages 陣列中
            this.state.messages.push(formattedMessage);
            // 更新訊息列表
            this.updateMessageList();
            // 清空輸入框
            this.container.querySelector('#messageInput').value = '';
        }
    },
	
	// updateMessageList 方法用來更新即時訊息列表, 這裡使用 innerHTML 來設置列表的內容
    updateMessageList: function() {
        const messageList = this.container.querySelector('#messageList');
        // messages 陣列透過 map 方法用來將陣列中的每個元素映射為一個 li 元素, 並使用 join 方法將這些元素連接起來
        messageList.innerHTML = this.state.messages.map(msg => `<li>${msg}</li>`).join('');
    }
};

/* 
React 轉換注意事項：
1. 將 state 轉換為 React 的 useState。
2. 將 render 方法轉換為 React 組件的 return 語句，使用 JSX。
3. 使用 useRef 來引用輸入元素，避免直接操作 DOM。
4. 考慮使用 useCallback 來優化事件處理函數。
5. 可以考慮將消息列表抽取為單獨的 React 組件以提高可維護性。
*/