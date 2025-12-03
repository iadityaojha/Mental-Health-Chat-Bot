import os
import sys

# Add current directory to path so we can import services
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from services.safety.safety_filter import safety_filter
from services.llm_provider.hf_provider import hf_provider

def main():
    print("--- Mental Health Chatbot CLI Tester ---")
    print("Type 'quit' to exit.")
    print("----------------------------------------")

    # Mock system prompt
    SYSTEM_PROMPT = "You are a supportive mental health assistant."

    while True:
        user_input = input("\nYou: ")
        if user_input.lower() in ['quit', 'exit']:
            break

        # 1. Safety Check
        safety_result = safety_filter.check_safety(user_input)
        if not safety_result["is_safe"]:
            print(f"\nBot (SAFETY ALERT): I'm concerned. Please contact a helpline.")
            print(f"Actions: {safety_result['actions']}")
            continue

        # 2. LLM Response
        print("\nBot is thinking...", end="", flush=True)
        try:
            response = hf_provider.generate_response(user_input, system_prompt=SYSTEM_PROMPT)
            print(f"\rBot: {response}   ")
        except Exception as e:
            print(f"\rBot Error: {e}")

if __name__ == "__main__":
    main()
