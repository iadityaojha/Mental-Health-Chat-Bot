import os
import requests
import json

class HFProvider:
    def __init__(self):
        self.api_url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
        self.api_token = os.getenv("HF_API_TOKEN") 
        
    def generate_response(self, prompt: str, system_prompt: str = "") -> str:
        if not self.api_token:
            return "Error: HF_API_TOKEN not set. Please configure it in your environment."

        headers = {"Authorization": f"Bearer {self.api_token}"}
        
        full_prompt = f"<s>[INST] {system_prompt}\n\n{prompt} [/INST]"
        
        payload = {
            "inputs": full_prompt,
            "parameters": {
                "max_new_tokens": 512,
                "temperature": 0.7,
                "top_p": 0.95,
                "return_full_text": False
            }
        }

        try:
            response = requests.post(self.api_url, headers=headers, json=payload, timeout=30)
            response.raise_for_status()
            result = response.json()
            if isinstance(result, list) and len(result) > 0:
                return result[0].get("generated_text", "").strip()
            return "I'm having trouble thinking right now. Please try again."
        except Exception as e:
            print(f"HF API Error: {e}")
            return "I am currently offline or experiencing high traffic. Please try again later."

hf_provider = HFProvider()
