// 获取页面元素
const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');

// 发送消息的函数
function sendMessage() {
    const text = userInput.value.trim();
    if (text === '') return;

    // 1. 在聊天窗口显示用户消息
    displayMessage(text, 'user');

    // 2. 调用机器人回复逻辑
    const reply = getBotReply(text);
    // 模拟机器人的“思考”延迟，让交互更自然[reference:4]
    setTimeout(() => {
        displayMessage(reply, 'bot');
    }, 500);

    // 清空输入框
    userInput.value = '';
}

// 在聊天窗口显示消息
function displayMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<div class="content">${text}</div>`;
    chatWindow.appendChild(messageDiv);
    // 自动滚动到最新消息
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 机器人回复逻辑：基于关键词匹配[reference:5][reference:6]
function getBotReply(userMessage) {
    const msg = userMessage.toLowerCase();

    // 你可以在这里自由添加或修改指令与回复的对应关系
    if (msg.includes('你好') || msg.includes('hello')) {
        return '你好呀！很高兴为您服务，请问有什么可以帮您？';
    } else if (msg.includes('我要退款') || msg.includes('退钱')) {
        return '抱歉，我无法解决你的问题。';
    } else if (msg.includes('联系电话') || msg.includes('电话')) {
        return '您可以通过客服电话 400888562 联系我们。（没事别乱打）';
    } else if (msg.includes('C0mESpaCE0N') || msg.includes('C0mESpaCE0N')) {
        return '你是谁，为什么知道，为什么为什么，说话！！！！！！！！！！！！！！！！！！';
    } else if (msg.includes('谢谢') || msg.includes('感谢')) {
        return '不客气，这是我们应该做的！';
    } else if (msg.includes('再见') || msg.includes('bye')) {
        return '感谢您的咨询，再见！祝您生活愉快！';
    } else {
        return '抱歉，我暂时还无法理解您的问题。请尝试用其他方式描述，或联系人工客服。';
    }
}

// 支持按回车键发送消息[reference:7]
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
// 1. 定义存储的键名
const STORAGE_KEY = 'chat_history';

// 2. 页面加载时自动读取历史记录
window.onload = function() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const messages = JSON.parse(saved);
        // 把保存的消息一条条显示在窗口里
        messages.forEach(msg => {
            displayMessage(msg.text, msg.sender);
        });
    }
};

// 修改发送函数：每次发消息都要存起来
function sendMessage() {
    const text = userInput.value.trim();
    if (text === '') return;

    // 显示并保存用户消息
    displayMessage(text, 'user');
    saveMessage(text, 'user');

    const reply = getBotReply(text);
    setTimeout(() => {
        // 显示并保存机器人回复
        displayMessage(reply, 'bot');
        saveMessage(reply, 'bot');
    }, 500);

    userInput.value = '';
}

// 3. 新增：保存单条消息到 localStorage
function saveMessage(text, sender) {
    // 先取出旧数据
    const saved = localStorage.getItem(STORAGE_KEY);
    const messages = saved ? JSON.parse(saved) : [];
    // 追加新消息
    messages.push({ text, sender });
    // 存回去（转成字符串）
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}
// 对应的清空函数
function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
    document.getElementById('chatWindow').innerHTML = ''; // 清空界面
}