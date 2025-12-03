import React, { useState, useEffect } from 'react';
import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';
import HelplineLocator from '../components/HelplineLocator';
import SafetyModal from '../components/SafetyModal';
import { Menu } from 'lucide-react';
import { chatService } from '../services/api';

const Chat = () => {
    const [activeTab, setActiveTab] = useState('chat');
    const [safetyModalOpen, setSafetyModalOpen] = useState(false);
    const [safetyActions, setSafetyActions] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [externalMessage, setExternalMessage] = useState(null);

    useEffect(() => {
        function adjustLayout() {
            const app = document.querySelector('.app');
            const sidebar = document.querySelector('.sidebar');
            const header = document.querySelector('.header');
            const canvas = document.querySelector('.canvas');
            if (!app || !sidebar || !header || !canvas) return;

            try {
                const cs = window.getComputedStyle(app);
                const gridCols = cs.gridTemplateColumns.split(' ');
                let sidebarWidth = gridCols[0];
                if (sidebarWidth && sidebarWidth.endsWith('px')) {
                    const px = parseFloat(sidebarWidth);
                    header.style.paddingLeft = (px * 0.22 + 18) + 'px';
                    canvas.style.paddingLeft = Math.max(20, px * 0.25) + 'px';
                }
            } catch (e) { }
        }

        window.addEventListener('resize', adjustLayout);
        // Run initially and after a short delay to ensure rendering
        adjustLayout();
        const timer = setTimeout(adjustLayout, 120);

        return () => {
            window.removeEventListener('resize', adjustLayout);
            clearTimeout(timer);
        };
    }, []);

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
        <div className="app-container app">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} onTabChange={handleSidebarAction} />

            {/* Main Content */}
            <main className="flex flex-col h-full overflow-hidden">

                {/* Header */}
                <header className="glass-header header px-[22px] flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3 brand">
                        <div className="md:hidden">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                <Menu size={24} />
                            </button>
                        </div>
                        <div className="w-[44px] h-[44px] rounded-[12px] bg-gradient-to-br from-[#C9BEFF] to-[#B9F2E6] flex items-center justify-center text-white font-bold">
                            MM
                        </div>
                        <div>
                            <h1 className="m-0 text-[18px] font-bold">MindMate</h1>
                            <div className="text-[12px] text-[#97A0B3] mt-[4px]">Student mental-health companion</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-[10px]">
                        <div className="hidden md:block px-3 py-2 rounded-full border border-[rgba(11,22,40,0.06)] bg-[rgba(255,255,255,0.65)] cursor-pointer text-sm">Profiles</div>
                        <div className="hidden md:block px-3 py-2 rounded-full border border-[rgba(11,22,40,0.06)] bg-[rgba(255,255,255,0.65)] cursor-pointer text-sm">Dark</div>
                        <button
                            onClick={handleEmergencyClick}
                            className="px-3 py-2 rounded-full font-bold text-[#3b0b0b] bg-gradient-to-r from-[#FF8A8A] to-[#FFD1D1] border-none cursor-pointer text-sm"
                        >
                            SOS
                        </button>
                    </div>
                </header>

                {/* Canvas */}
                <section className="flex flex-col h-[calc(100%-72px)] px-[26px] py-[20px] canvas">
                    <div className="flex flex-col h-full">
                        {activeTab === 'chat' && (
                            <ChatBox
                                onSafetyTrigger={handleSafetyTrigger}
                                externalMessage={externalMessage}
                                onMessageConsumed={() => setExternalMessage(null)}
                            />
                        )}

                        {activeTab === 'map' && (
                            <div className="h-full overflow-auto">
                                <HelplineLocator />
                            </div>
                        )}

                        {(activeTab !== 'chat' && activeTab !== 'map') && (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <p>Feature coming soon...</p>
                            </div>
                        )}
                    </div>
                </section>

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
