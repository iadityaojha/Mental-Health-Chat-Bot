import React from 'react';
import { Plus, MessageSquare, Smile, Wind, BookOpen, MapPin, Settings, LogOut, HelpCircle } from 'lucide-react';

const Sidebar = ({ activeTab, onTabChange, isOpen, toggleSidebar }) => {
    const menuItems = [
        { id: 'chat', icon: <MessageSquare size={18} />, label: 'Chat' },
        { id: 'mood', icon: <Smile size={18} />, label: 'Mood Tracker' },
        { id: 'breathing', icon: <Wind size={18} />, label: 'Exercises' },
        { id: 'resources', icon: <BookOpen size={18} />, label: 'Resources' },
        { id: 'map', icon: <MapPin size={18} />, label: 'Helplines' },
        { id: 'faq', icon: <HelpCircle size={18} />, label: 'FAQ' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            />

            <aside className={`sidebar-container ${isOpen ? 'open' : ''}`}>
                {/* New Chat Button */}
                <div className="p-2">
                    <button
                        onClick={() => onTabChange('new-chat')}
                        className="new-chat-btn w-[calc(100%-16px)] text-left hover:bg-gray-100 transition-colors"
                    >
                        <Plus size={16} />
                        New chat
                    </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Features
                    </div>
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                onTabChange(item.id);
                                if (window.innerWidth < 768) toggleSidebar();
                            }}
                            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 p-2">
                    <div className="sidebar-item">
                        <Settings size={18} />
                        <span>Settings</span>
                    </div>
                    <div className="sidebar-item text-red-500 hover:text-red-600">
                        <LogOut size={18} />
                        <span>Log out</span>
                    </div>

                    <div className="flex items-center gap-3 px-3 py-3 mt-2 border-t border-gray-200">
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">Mind Mate</div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
