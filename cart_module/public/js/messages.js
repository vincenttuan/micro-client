// messages.js
window.messages = {
    state: {
        messages: []
    },

    mount: function(container) {
        this.container = container;
        this.render();
        this.attachListeners();
    },

    render: function() {
        this.container.innerHTML = `
            <h2>即時訊息</h2>
            <ul id="messageList"></ul>
            <input id="messageInput" type="text">
            <button id="sendButton">發送</button>
        `;
        this.updateMessageList();
    },

    attachListeners: function() {
        const sendButton = this.container.querySelector('#sendButton');
        const messageInput = this.container.querySelector('#messageInput');
        sendButton.addEventListener('click', () => this.sendMessage(messageInput.value));
    },

    sendMessage: function(message) {
        if (message) {
            const now = new Date();
            const formattedMessage = `${message} (${now.getHours()}:${now.getMinutes()}:${now.getSeconds()})`;
            this.state.messages.push(formattedMessage);
            this.updateMessageList();
            this.container.querySelector('#messageInput').value = '';
        }
    },

    updateMessageList: function() {
        const messageList = this.container.querySelector('#messageList');
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