from geopy.distance import geodesic

class HelplineFinder:
    def __init__(self):
        # Sample static dataset (would be loaded from CSV/DB in prod)
        self.helplines = [
            {
                "id": "1",
                "name": "National Suicide Prevention Lifeline",
                "phone": "988",
                "type": "crisis",
                "lat": 37.7749, # Example: San Francisco
                "lon": -122.4194,
                "gov_affiliated": True
            },
            {
                "id": "2",
                "name": "Campus Counseling Center",
                "phone": "555-0199",
                "type": "counseling",
                "lat": 37.7750,
                "lon": -122.4180,
                "gov_affiliated": True
            },
             {
                "id": "3",
                "name": "City Mental Health Clinic",
                "phone": "555-0200",
                "type": "clinic",
                "lat": 40.7128, # New York
                "lon": -74.0060,
                "gov_affiliated": True
            }
        ]

    def find_nearby(self, lat: float, lon: float, radius_km: float = 50.0):
        user_loc = (lat, lon)
        nearby = []
        
        for helpline in self.helplines:
            hl_loc = (helpline["lat"], helpline["lon"])
            distance = geodesic(user_loc, hl_loc).km
            
            if distance <= radius_km:
                helpline_with_dist = helpline.copy()
                helpline_with_dist["distance_km"] = round(distance, 2)
                nearby.append(helpline_with_dist)
                
        # Sort by distance
        nearby.sort(key=lambda x: x["distance_km"])
        return nearby

helpline_finder = HelplineFinder()
