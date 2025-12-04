# MindMate - Student Mental Health Chatbot

MindMate is a privacy-first, AI-powered mental health chatbot designed for students. It features a premium, **ChatGPT-style interface** and runs completely locally for maximum privacy using **Ollama**.

## 🌟 Features

*   **Premium UI**: A clean, modern interface inspired by ChatGPT with a calming white theme.
*   **Local AI Privacy**: Uses **Ollama (Mistral)** to run the LLM locally on your machine. No data leaves your device.
*   **Safety First**: Real-time safety filters detect high-risk language and provide immediate SOS resources.
*   **Geo-Aware Helplines**: Finds nearby mental health resources based on your location.
*   **FAQ Section**: A curated list of common questions and helpful answers for stress, anxiety, and study tips.
*   **Mood & Exercises**: (Coming Soon) Track your daily mood and access calming breathing exercises.
*   **Responsive Design**: Fully functional on desktop and mobile devices.

## 🛠️ Tech Stack

*   **Frontend**: React, Vite, TailwindCSS
*   **Backend**: FastAPI, Python 3.9+
*   **AI Engine**: Ollama (running `mistral:latest`)
*   **Database**: In-memory (Mock) / Firebase (Optional)

---

## 🚀 Installation & Setup

Follow these steps to get MindMate running on your local machine.

### 1. Install Prerequisites
*   **Node.js** (v16 or higher)
*   **Python** (v3.9 or higher)
*   **Ollama**: Download and install from [ollama.com](https://ollama.com/).

### 2. Setup AI Model (Ollama)
Once Ollama is installed, open your terminal and run:
```bash
ollama pull mistral
```
Keep the Ollama app running in the background.

### 3. Backend Setup
1.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2.  Create a virtual environment:
    ```bash
    python -m venv venv
    # Windows:
    venv\Scripts\activate
    # Mac/Linux:
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the server:
    ```bash
    python -m uvicorn app:app --reload --host 0.0.0.0
    ```
    *The backend will start at `http://localhost:8000`.*

### 4. Frontend Setup
1.  Open a new terminal and navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev -- --host
    ```
    *The frontend will start at `http://localhost:5173`.*

---

## 📱 How to Use on Any Device (Local Network)

You can access MindMate on your phone or tablet if they are connected to the same Wi-Fi network as your computer.

1.  **Find your Computer's IP Address**:
    *   **Windows**: Open Command Prompt and type `ipconfig`. Look for "IPv4 Address" (e.g., `192.168.1.5`).
    *   **Mac/Linux**: Open Terminal and type `ifconfig` or `ip a`.

2.  **Start Servers with Host Flag**:
    *   Ensure backend is running with `--host 0.0.0.0`.
    *   Ensure frontend is running with `--host`.

3.  **Access on Mobile**:
    *   Open the browser on your phone.
    *   Type your computer's IP address followed by the frontend port:
        `http://192.168.1.5:5173` (Replace with your actual IP).

**Note**: Since the backend is also running locally, the frontend needs to know where to find it. If you experience connection issues on mobile, you may need to update the `VITE_API_URL` in `frontend/.env` to point to your computer's IP (e.g., `http://192.168.1.5:8000/api`) instead of `localhost`.

---

## ⚠️ Disclaimer
**MindMate is an AI chatbot, not a doctor.** It cannot diagnose or treat mental health conditions. If you or someone you know is in immediate danger, please call your local emergency services or a suicide prevention hotline immediately.