# Voice Chat App Usage

## Prerequisites

- Node.js installed
- NestJS CLI installed
- OpenAI API key

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd voice-chat-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

## Running the Application

1. Start the NestJS server:
   ```bash
   npm run start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Click the "Start Voice Chat" button to initiate the voice chat.

## Using the Application

- The application will request access to your microphone.
- Once access is granted, it will start capturing your voice and process it using the OpenAI Realtime API.
- You should see logs in the console indicating voice detection and WebRTC events.
