// messages.js (即時訊息微前端)
window.messages = {
  mount: (container) => {
    const messagesDiv = document.createElement('div');
    messagesDiv.innerHTML = '<h2>即時訊息</h2><ul id="messageList"></ul><input id="messageInput" type="text"><button id="sendButton">發送</button>';
    container.appendChild(messagesDiv);

    const messageList = document.getElementById('messageList');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    sendButton.addEventListener('click', () => {
      const message = messageInput.value;
      if (message) {
		now = new Date();
        const li = document.createElement('li');
        li.textContent = message + ' (' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ')';
        messageList.appendChild(li);
        messageInput.value = '';
        // 這裡可以添加向後端發送消息的邏輯
      }
    });
  }
};