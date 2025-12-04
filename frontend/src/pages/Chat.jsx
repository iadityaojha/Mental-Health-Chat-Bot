import React, { useState, useEffect } from 'react';
import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';
import HelplineLocator from '../components/HelplineLocator';
import SafetyModal from '../components/SafetyModal';
import { Menu, Plus } from 'lucide-react';
import { chatService } from '../services/api';

const Chat = () => {
    const [activeTab, setActiveTab] = useState('chat');
    const [safetyModalOpen, setSafetyModalOpen] = useState(false);
    const [safetyActions, setSafetyActions] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [externalMessage, setExternalMessage] = useState(null);

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
        setActiveTab(id);

        try {
            if (id === 'mood') {
                const data = await chatService.getMoods();
                const text = data.moods.length
                    ? data.moods.map(m => `${m.mood} — ${new Date(m.ts).toLocaleString()}`).join('\n')
                    : 'No mood entries yet.';
                setExternalMessage({ role: 'bot', content: `Mood entries:\n${text}` });
                setActiveTab('chat');
            } else if (id === 'breathing') {
                const data = await chatService.getExercises();
                const text = data.exercises.map(x => x.title).join(', ');
                setExternalMessage({ role: 'bot', content: `Exercises: ${text}` });
                setActiveTab('chat');
            } else if (id === 'resources') {
                const data = await chatService.getResources();
                const text = data.resources.map(r => r.title).join(', ');
                setExternalMessage({ role: 'bot', content: `Resources: ${text}` });
                setActiveTab('chat');
            } else if (id === 'map') {
                // Keep on map tab
            }
        } catch (error) {
            console.error("Error fetching feature data:", error);
        }
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
                    <button onClick={() => handleSidebarAction('chat')} className="text-gray-600">
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

                    {(activeTab !== 'chat' && activeTab !== 'map') && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <p>Feature coming soon...</p>
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
