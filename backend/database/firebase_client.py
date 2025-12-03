import firebase_admin
from firebase_admin import credentials, firestore
import os

class FirebaseClient:
    def __init__(self):
        # In production, use a service account JSON or default credentials
        # For this demo/free-tier, we'll assume GOOGLE_APPLICATION_CREDENTIALS is set
        # or use a placeholder if not configured to avoid crash during dev
        try:
            if not firebase_admin._apps:
                cred = credentials.ApplicationDefault()
                firebase_admin.initialize_app(cred)
            self.db = firestore.client()
            print("Firebase initialized successfully.")
        except Exception as e:
            print(f"Firebase init warning: {e}. Using mock DB mode.")
            self.db = None

    def add_mood_entry(self, entry_data: dict):
        if self.db:
            self.db.collection("mood_logs").add(entry_data)
        else:
            print(f"[MOCK DB] Added mood entry: {entry_data}")

    def add_chat_log(self, log_data: dict):
        if self.db:
            self.db.collection("chat_logs").add(log_data)
        else:
            print(f"[MOCK DB] Added chat log: {log_data}")

firebase_client = FirebaseClient()
