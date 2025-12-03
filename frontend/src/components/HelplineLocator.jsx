import React, { useState, useEffect } from 'react';
import { helplineService } from '../services/api';
import { MapPin, Phone } from 'lucide-react';

const HelplineLocator = () => {
    const [helplines, setHelplines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const findNearby = () => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const data = await helplineService.getNearby(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    setHelplines(data);
                } catch (err) {
                    setError("Failed to fetch helplines. Please try again.");
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setError("Unable to retrieve your location");
                setLoading(false);
            }
        );
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Nearby Help</h2>
                <button
                    onClick={findNearby}
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                    <MapPin size={18} className="mr-2" />
                    {loading ? 'Locating...' : 'Find Near Me'}
                </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="space-y-4 max-h-96 overflow-y-auto">
                {helplines.map((hl) => (
                    <div key={hl.id} className="border p-4 rounded-md hover:bg-gray-50 transition">
                        <div className="flex justify-between">
                            <h3 className="font-medium text-lg">{hl.name}</h3>
                            <span className="text-sm text-gray-500">{hl.distance_km} km</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{hl.type} • {hl.gov_affiliated ? 'Gov Verified' : 'NGO'}</p>
                        <a href={`tel:${hl.phone}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
                            <Phone size={16} className="mr-1" />
                            {hl.phone}
                        </a>
                    </div>
                ))}

                {helplines.length === 0 && !loading && !error && (
                    <p className="text-gray-500 text-center py-4">Click "Find Near Me" to see local resources.</p>
                )}
            </div>
        </div>
    );
};

export default HelplineLocator;
