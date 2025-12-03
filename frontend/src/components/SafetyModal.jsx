import React from 'react';
import { Phone, MessageSquare, X } from 'lucide-react';

const SafetyModal = ({ isOpen, onClose, actions }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Support Resources</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <p className="text-gray-600 mb-6">
                    It sounds like you might be going through a tough time. Please consider connecting with one of these resources:
                </p>

                <div className="space-y-3">
                    {actions.map((action, index) => (
                        <div key={index} className="w-full">
                            {action.type === 'call' && (
                                <a
                                    href={`tel:${action.tel}`}
                                    className="flex items-center justify-center w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
                                >
                                    <Phone className="mr-2" size={20} />
                                    {action.label}
                                </a>
                            )}

                            {action.type === 'sms' && (
                                <a
                                    href={`sms:${action.sms}?body=I need help.`}
                                    className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                                >
                                    <MessageSquare className="mr-2" size={20} />
                                    {action.label}
                                </a>
                            )}

                            {action.type === 'contact' && (
                                <button
                                    className="flex items-center justify-center w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                                    onClick={() => alert("Opening campus counselor appointment form...")}
                                >
                                    Contact Campus Counselor
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-sm text-gray-500 text-center">
                    <p>You are not alone. Help is available 24/7.</p>
                </div>
            </div>
        </div>
    );
};

export default SafetyModal;
