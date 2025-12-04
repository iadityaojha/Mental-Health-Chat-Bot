import React, { useState, useEffect } from 'react';
import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';
import HelplineLocator from '../components/HelplineLocator';
import FAQList from '../components/FAQList';
import SafetyModal from '../components/SafetyModal';
import { Menu, Plus } from 'lucide-react';
import { chatService } from '../services/api';

const Chat = () => {
    const [activeTab, setActiveTab] = useState('chat');
    const [safetyModalOpen, setSafetyModalOpen] = useState(false);
    const [safetyActions, setSafetyActions] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [externalMessage, setExternalMessage] = useState(null);
    const [chatKey, setChatKey] = useState(0);

    const handleSafetyTrigger = (actions) => {
        setSafetyActions(actions);
        setSafetyModalOpen(true);
    };

    const handleEmergencyClick = () => {
        setSafetyActions([
            { type: 'call', label: 'National Suicide Prevention Lifeline', tel: '988' },
            { type: 'sms', label: 'Crisis Text Line', sms: '741741' },
            { type: 'contact', label: 'Campus Security', tel: '555-0199' }
        ]);
        setSafetyModalOpen(true);
    };

    const handleSidebarAction = async (id) => {
        if (id === 'new-chat') {
            setChatKey(prev => prev + 1);
            setActiveTab('chat');
            setExternalMessage(null); // Clear any external messages
        } else {
            setActiveTab(id);
        }
        // Features are now set to "Coming Soon" view by default via the render logic
    };

    return (
        <div className="app-layout">
            {/* Sidebar */}
            <Sidebar
                activeTab={activeTab}
                onTabChange={handleSidebarAction}
                isOpen={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />

            {/* Main Content */}
            <main className="main-content">

                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-3 border-b border-gray-200 bg-white">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
                        <Menu size={24} />
                    </button>
                    <span className="font-semibold text-gray-700">MindMate</span>
                    <button onClick={() => handleSidebarAction('new-chat')} className="text-gray-600">
                        <Plus size={24} />
                    </button>
                </header>

                {/* Desktop Header (Minimal) */}
                <div className="hidden md:flex absolute top-4 right-4 z-10 gap-2">
                    <button
                        onClick={handleEmergencyClick}
                        className="px-3 py-1.5 rounded-md font-medium text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 text-sm transition-colors"
                    >
                        SOS Help
                    </button>
                </div>

                {/* Canvas */}
                <div className="flex-1 overflow-hidden relative">
                    {activeTab === 'chat' && (
                        <ChatBox
                            key={chatKey}
                            onSafetyTrigger={handleSafetyTrigger}
                            externalMessage={externalMessage}
                            onMessageConsumed={() => setExternalMessage(null)}
                        />
                    )}

                    {activeTab === 'map' && (
                        <div className="h-full w-full">
                            <HelplineLocator />
                        </div>
                    )}

                    {activeTab === 'faq' && (
                        <FAQList />
                    )}

                    {(activeTab !== 'chat' && activeTab !== 'map' && activeTab !== 'faq') && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-50">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">🚧</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon</h3>
                            <p className="text-gray-500 max-w-xs text-center">
                                We're working hard to bring you this feature. Stay tuned for updates!
                            </p>
                        </div>
                    )}
                </div>

            </main>

            <SafetyModal
                isOpen={safetyModalOpen}
                onClose={() => setSafetyModalOpen(false)}
                actions={safetyActions}
            />
        </div>
    );
};

export default Chat;
