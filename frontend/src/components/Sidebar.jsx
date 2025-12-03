import React from 'react';
import { Home, Smile, Wind, BookOpen, MapPin, Settings } from 'lucide-react';

const Sidebar = ({ activeTab, onTabChange }) => {
    const menuItems = [
        { id: 'chat', icon: <Home size={20} />, label: 'Home' },
        { id: 'mood', icon: <Smile size={20} />, label: 'Mood Tracker' },
        { id: 'breathing', icon: <Wind size={20} />, label: 'Exercises' },
        { id: 'resources', icon: <BookOpen size={20} />, label: 'Resources' },
        { id: 'map', icon: <MapPin size={20} />, label: 'Location' },
    ];

    return (
        <aside className="sidebar-glass sidebar flex flex-col items-center py-[18px] px-[12px] gap-[14px] h-full">
            <div className="logo w-[44px] h-[44px] rounded-[10px] bg-gradient-to-br from-[#B9F2E6] to-[#C9BEFF] flex items-center justify-center text-white font-bold shadow-[0_8px_22px_rgba(91,108,255,0.10)]">
                MM
            </div>

            {menuItems.map((item) => (
                <div
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`icon-btn ${activeTab === item.id ? 'border-indigo-200 shadow-sm' : ''}`}
                    title={item.label}
                >
                    {item.icon}
                </div>
            ))}

            <div className="flex-1"></div>

            <div className="icon-btn" title="Settings">
                <Settings size={20} />
            </div>
        </aside>
    );
};

export default Sidebar;
