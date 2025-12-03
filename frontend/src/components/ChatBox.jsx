import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
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

    useEffect(() => {
        if (externalMessage) {
            setMessages(prev => [...prev, {
                ...externalMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            if (onMessageConsumed) onMessageConsumed();
        }
    }, [externalMessage, onMessageConsumed]);

    const quickReplies = ["I'm feeling anxious", "I can't sleep", "I'm stressed about exams", "Just want to chat"];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, loading]);

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        const userMsg = {
            role: 'user',
            content: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

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

    return (
        <>
            {/* Chat Scroll Area */}
            <div className="flex-1 overflow-auto pb-3 pr-2 scrollbar-hide flex flex-col gap-4 chat-wrap">

                {messages.map((msg, idx) => (
                    <div key={idx} className={`fade-in-up flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} message`}>

                        {msg.role === 'bot' ? (
                            <div className="bot-bubble flex gap-3 p-3 max-w-[78%]">
                                <div className="w-[44px] h-[44px] rounded-[10px] bg-gradient-to-br from-[#C9BEFF] to-[#B9F2E6] flex items-center justify-center text-white font-bold shrink-0">
                                    M
                                </div>
                                <div className="break-words whitespace-pre-wrap content">
                                    <div className="font-semibold mb-2">{msg.content}</div>
                                    {msg.subContent && <div className="text-sm text-[#97A0B3]">{msg.subContent}</div>}
                                    <div className="text-[11px] text-[#97A0B3] mt-2">{msg.timestamp}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="user-bubble p-3 px-4 max-w-[78%] break-words whitespace-pre-wrap">
                                {msg.content}
                            </div>
                        )}

                    </div>
                ))}

                {/* Quick Chips */}
                {messages.length < 3 && !loading && (
                    <div className="flex gap-[10px] flex-wrap py-1.5 px-2 quick-chips">
                        {quickReplies.map((reply, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(reply)}
                                className="chip px-[14px] py-[8px] rounded-full border border-[rgba(11,22,40,0.06)] bg-[rgba(255,255,255,0.8)] cursor-pointer transition-transform duration-150 hover:-translate-y-1 hover:shadow-sm text-sm whitespace-nowrap"
                            >
                                {reply}
                            </button>
                        ))}
                    </div>
                )}

                {/* Typing Indicator */}
                {loading && (
                    <div className="flex justify-start gap-3 pl-1.5 mt-1.5">
                        <div className="bot-bubble flex items-center gap-3 p-3">
                            <div className="w-[44px] h-[44px] rounded-[10px] bg-gradient-to-br from-[#C9BEFF] to-[#B9F2E6] flex items-center justify-center text-white font-bold shrink-0">
                                M
                            </div>
                            <div className="flex items-center gap-3 px-2 w-[64px] h-[28px] bg-[rgba(11,22,40,0.02)] rounded-[14px] justify-evenly">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-b from-[#5B6CFF] to-[#8b74ff] opacity-90 typing-dot"></div>
                                <div className="w-2 h-2 rounded-full bg-gradient-to-b from-[#5B6CFF] to-[#8b74ff] opacity-90 typing-dot"></div>
                                <div className="w-2 h-2 rounded-full bg-gradient-to-b from-[#5B6CFF] to-[#8b74ff] opacity-90 typing-dot"></div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Floating Composer */}
            <div className="composer-wrap flex items-center gap-3 pt-[14px] px-[6px] border-t border-[rgba(19,28,45,0.03)] bg-gradient-to-b from-[rgba(255,255,255,0.6)] to-[rgba(255,255,255,0.58)]">
                <div className="composer flex-1 flex items-center gap-[10px] p-[10px] px-[14px]">
                    <button className="border-none bg-transparent cursor-pointer text-gray-400 hover:text-gray-600">
                        <Paperclip size={20} />
                    </button>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 border-none bg-transparent outline-none text-[15px] placeholder-[rgba(11,22,40,0.26)]"
                        disabled={loading}
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={loading || !input.trim()}
                        className="px-[14px] py-[8px] rounded-[12px] bg-gradient-to-r from-[#5B6CFF] to-[#7d83ff] text-white border-none cursor-pointer shadow-[0_8px_20px_rgba(91,108,255,0.12)] transition-transform duration-150 active:translate-y-[2px] disabled:opacity-50"
                    >
                        Send
                    </button>
                </div>
                <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-[#C9BEFF] to-[#B9F2E6] flex items-center justify-center text-white shadow-[0_8px_26px_rgba(91,108,255,0.12)] cursor-pointer">
                    <Smile size={24} />
                </div>
            </div>
        </>
    );
};

export default ChatBox;
