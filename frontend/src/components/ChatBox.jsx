import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, User, Bot } from 'lucide-react';
import { chatService } from '../services/api';

const ChatBox = ({ onSafetyTrigger, externalMessage, onMessageConsumed }) => {
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            content: "Hello. I'm MindMate. I'm here to listen without judgment.",
            subContent: "How are you feeling today?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (externalMessage) {
            setMessages(prev => [...prev, {
                ...externalMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            if (onMessageConsumed) onMessageConsumed();
        }
    }, [externalMessage, onMessageConsumed]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, loading]);

    // Auto-resize textarea
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
        }
    }, [input]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = {
            role: 'user',
            content: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);
        if (inputRef.current) inputRef.current.style.height = 'auto';

        try {
            const response = await chatService.sendMessage("test-user-123", userMsg.content);

            if (response.safety_flag) {
                onSafetyTrigger(response.safety_actions);
            }

            setMessages(prev => [...prev, {
                role: 'bot',
                content: response.reply,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMessage = error.response?.data?.detail || error.message || "Connection error";
            setMessages(prev => [...prev, {
                role: 'bot',
                content: `Error: ${errorMessage}. Check backend terminal.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full w-full relative">
            {/* Chat Scroll Area */}
            <div className="chat-scroll-area">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message-row ${msg.role}`}>
                        <div className="message-container">
                            <div className={`avatar ${msg.role}`}>
                                {msg.role === 'bot' ? <Bot size={18} /> : <User size={18} />}
                            </div>
                            <div className="message-content">
                                <div className="font-bold mb-1 text-sm text-gray-800">
                                    {msg.role === 'bot' ? 'MindMate' : 'You'}
                                </div>
                                <div className="whitespace-pre-wrap">{msg.content}</div>
                                {msg.subContent && <div className="text-sm text-gray-500 mt-1">{msg.subContent}</div>}
                            </div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="message-row bot">
                        <div className="message-container">
                            <div className="avatar bot">
                                <Bot size={18} />
                            </div>
                            <div className="message-content flex items-center gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="input-area-container">
                <div className="input-box-wrapper">
                    <div className="input-box">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Paperclip size={20} />
                        </button>
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Message MindMate..."
                            className="chat-input scrollbar-hide"
                            rows={1}
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            className={`send-btn ${!input.trim() ? 'opacity-50 cursor-default' : 'hover:bg-indigo-600'}`}
                        >
                            <Send size={16} />
                        </button>
                    </div>
                    <div className="text-center text-xs text-gray-400 mt-2">
                        MindMate can make mistakes. Consider checking important information.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
