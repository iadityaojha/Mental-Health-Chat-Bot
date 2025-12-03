from gpt4all import GPT4All
import os

class LocalProvider:
    def __init__(self):
        # This will download the model (approx 4GB) to the cache folder on first run
        # Using a smaller, faster model for laptops: 'orca-mini-3b-gguf2-q4_0.gguf' (~2GB)
        # or 'mistral-7b-instruct-v0.1.Q4_0.gguf' (~4GB) - better quality
        self.model_name = "orca-mini-3b-gguf2-q4_0.gguf" 
        print(f"Initializing Local LLM: {self.model_name} (This may take time on first run)...")
        try:
            self.model = GPT4All(self.model_name)
            print("Local LLM loaded successfully.")
        except Exception as e:
            print(f"Failed to load local LLM: {e}")
            self.model = None
        
    def generate_response(self, prompt: str, system_prompt: str = "") -> str:
        if not self.model:
            return "Error: Local model failed to load."

        full_prompt = f"### System:\n{system_prompt}\n\n### User:\n{prompt}\n\n### Assistant:\n"
        
        try:
            # Generate response
            output = self.model.generate(full_prompt, max_tokens=200, temp=0.7)
            return output.strip()
        except Exception as e:
            print(f"Local Generation Error: {e}")
            return "I'm having trouble thinking right now."

local_provider = LocalProvider()
