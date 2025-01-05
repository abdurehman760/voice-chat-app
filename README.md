# Voice Chat App

## Overview

The Voice Chat App is a web application that allows users to engage in real-time voice conversations with an AI. The app uses WebRTC for peer-to-peer audio communication and integrates with OpenAI's real-time models to provide AI responses.

## Features

- Real-time voice chat with AI
- Multiple voice options for AI responses
- Visual indicators for speaking status
- Modern and playful UI with animated elements

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: NestJS
- **Real-time Communication**: WebRTC
- **AI Integration**: OpenAI API

## How to Use

1. Open the app in your web browser.
2. Select a voice for the AI from the dropdown menu.
3. Click the "Start Voice Chat" button to initiate the conversation.
4. Speak into your microphone to interact with the AI.
5. Visual indicators will show when you or the AI is speaking.

## Setup and Installation

### Prerequisites

- Node.js
- npm

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/voice-chat-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd voice-chat-app
   ```
3. Install the necessary dependencies:
   ```bash
   npm install
   ```
4. Start the frontend server:
   ```bash
   npm start
   ```
5. Open your web browser and navigate to `http://localhost:3000`.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the NestJS server:
   ```bash
   npm run start
   ```
4. The backend server will run on `http://localhost:3001`.

## Project Structure

```
voice-chat-app/
├── backend/                # NestJS backend
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── ...
│   ├── test/
│   ├── nest-cli.json
│   ├── package.json
│   └── ...
├── public/                 # Frontend files
│   ├── index.html
│   ├── webrtc.js
│   └── ...
├── src/                    # Frontend source files
├── package.json
└── ...
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
