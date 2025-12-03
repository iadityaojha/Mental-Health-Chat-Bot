import requests

def test_ollama():
    url = "http://localhost:11434/api/tags"
    print(f"Testing connection to Ollama at {url}...")
    
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            print("SUCCESS: Ollama is running!")
            models = response.json().get('models', [])
            print("Available models:")
            for m in models:
                print(f" - {m['name']}")
        else:
            print(f"ERROR: Ollama returned status code {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("ERROR: Could not connect to Ollama. Make sure the Ollama app is running.")
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    test_ollama()
