import re

class SafetyFilter:
    def __init__(self):
        # Regex patterns for high-risk content
        self.danger_patterns = [
            r"(kill|hurt|cut|end)\s+(myself|my\s+life)",
            r"suicide",
            r"die",
            r"overdose",
            r"want\s+to\s+die",
            r"better\s+off\s+dead"
        ]
        
    def check_safety(self, message: str) -> dict:
        """
        Checks the message for safety violations.
        Returns a dict with 'is_safe', 'risk_level', and 'actions'.
        """
        message_lower = message.lower()
        
        for pattern in self.danger_patterns:
            if re.search(pattern, message_lower):
                return {
                    "is_safe": False,
                    "risk_level": "high",
                    "actions": [
                        {"type": "call", "label": "Call National Helpline", "tel": "988"}, # Placeholder
                        {"type": "sms", "label": "Text Crisis Line", "sms": "741741"},
                        {"type": "contact", "label": "Contact Campus Counselor", "action": "open_modal"}
                    ]
                }
                
        return {"is_safe": True, "risk_level": "low", "actions": []}

safety_filter = SafetyFilter()
