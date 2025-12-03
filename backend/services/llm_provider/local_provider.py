import requests
import json

class LocalProvider:
    def __init__(self):
        self.api_url = "http://localhost:11434/api/generate"
        # You can change this to 'llama3', 'gemma', etc.
        self.model_name = "mistral:latest" 
        print(f"Initializing Ollama Provider with model: {self.model_name}")
        
    def generate_response(self, prompt: str, system_prompt: str = "") -> str:
        full_prompt = f"System: {system_prompt}\nUser: {prompt}\nAssistant:"
        
        payload = {
            "model": self.model_name,
            "prompt": full_prompt,
            "stream": False,
            "options": {
                "temperature": 0.7,
                "num_predict": 200
            }
        }

        try:
            # Increased timeout to 120s because loading the model into RAM takes time
            response = requests.post(self.api_url, json=payload, timeout=120)
            response.raise_for_status()
            result = response.json()
            return result.get("response", "").strip()
        except requests.exceptions.ConnectionError:
            return "Error: Could not connect to Ollama. Is it running? (Run 'ollama serve' or open the app)"
        except Exception as e:
            print(f"Ollama Error: {e}")
            return "I'm having trouble thinking right now."

local_provider = LocalProvider()
