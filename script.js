document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.querySelector('.message-input input');
    const sendButton = document.querySelector('.send-button');
    const messagesContainer = document.querySelector('.messages-container');

    // Toggle between microphone and send icon when typing
    messageInput.addEventListener('input', function () {
        if (messageInput.value.trim() !== '') {
            sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
        } else {
            sendButton.innerHTML = '<i class="fas fa-microphone"></i>';
        }
    });

    // Send message functionality
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            const messageElement = document.createElement('div');
            messageElement.className = 'message message-sent';

            const now = new Date();
            const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

            messageElement.innerHTML = `
                        <div>${messageText}</div>
                        <div class="message-time">${timeString}</div>
                    `;

            messagesContainer.appendChild(messageElement);
            messageInput.value = '';
            sendButton.innerHTML = '<i class="fas fa-microphone"></i>';

            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Simulate a reply after a short delay
            setTimeout(simulateReply, 1000 + Math.random() * 2000);
        }
    }

    // Simulate a reply from another user
    function simulateReply() {
        const replies = [
            "Okay, thanks!",
            "Sounds good to me!",
            "I'll be there soon",
            "Can we reschedule?",
            "See you then!"
        ];

        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        const messageElement = document.createElement('div');
        messageElement.className = 'message message-received';

        const now = new Date();
        const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

        messageElement.innerHTML = `
                    <div>${randomReply}</div>
                    <div class="message-time">${timeString}</div>
                `;

        messagesContainer.appendChild(messageElement);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Send message when clicking send button
    sendButton.addEventListener('click', sendMessage);

    // Send message when pressing Enter
    messageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Make chat items clickable
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', function () {
            chatItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});