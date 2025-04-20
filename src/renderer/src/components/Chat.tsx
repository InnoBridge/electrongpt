import React, { useState } from 'react';

interface ChatMessage {
  role: string;
  content: string;
}

const Chat: React.FC = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<ChatMessage[]>([]);

    const sendMessage = async () => {
        if (message.trim()) {
            setChat([...chat, { role: 'user', content: message }]);
            setMessage('');
            try {
                const response = await window.api.llm.createCompletion(message);
                setChat([...chat, { role: 'AI', content: response.content }]);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    return (
        <div>
            <div>
                {chat.map((msg, index) => (
                    <div key={index} className={msg.role}>
                        <strong>{msg.role}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;