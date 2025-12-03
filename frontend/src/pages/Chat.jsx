import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import HelplineLocator from '../components/HelplineLocator';
import SafetyModal from '../components/SafetyModal';

const Chat = () => {
    const [safetyModalOpen, setSafetyModalOpen] = useState(false);
    const [safetyActions, setSafetyActions] = useState([]);

    const handleSafetyTrigger = (actions) => {
        setSafetyActions(actions);
        setSafetyModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Chat Area */}
                <div className="lg:col-span-2">
                    <ChatBox onSafetyTrigger={handleSafetyTrigger} />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <HelplineLocator />

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-semibold text-gray-800 mb-2">Quick Actions</h3>
                        <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-indigo-600">
                            📅 Schedule Appointment
                        </button>
                        <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-indigo-600">
                            📝 Daily Journal
                        </button>
                        <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-indigo-600">
                            📊 Mood Tracker
                        </button>
                    </div>
                </div>
            </div>

            <SafetyModal
                isOpen={safetyModalOpen}
                onClose={() => setSafetyModalOpen(false)}
                actions={safetyActions}
            />
        </div>
    );
};

export default Chat;
