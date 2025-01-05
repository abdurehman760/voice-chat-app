let isSpeaking = false;
let speechTimeout;
let isWebRTCInitialized = false;
let audioChunks = [];

async function initWebRTC() {
  if (isWebRTCInitialized) return;
  isWebRTCInitialized = true;

  document.getElementById('spinner').style.display = 'block'; // Show spinner

  const selectedVoice = document.getElementById('voiceSelect').value;

  try {
    const response = await fetch('/session');
    const data = await response.json();
    console.log('Session response:', data);
    const EPHEMERAL_KEY = data.client_secret.value;

    console.log('EPHEMERAL_KEY:', EPHEMERAL_KEY);

    const pc = new RTCPeerConnection();
    const audioEl = document.createElement('audio');
    audioEl.autoplay = true;
    document.getElementById('audioContainer').appendChild(audioEl);
    pc.ontrack = e => {
      audioEl.srcObject = e.streams[0];
      document.getElementById('aiContainer').classList.add('speaking');
      e.streams[0].getTracks().forEach(track => {
        track.onended = () => {
          document.getElementById('aiContainer').classList.remove('speaking');
        };
      });
    };

    const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
    pc.addTrack(ms.getTracks()[0]);

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(ms);
    const processor = audioContext.createScriptProcessor(1024, 1, 1);

    source.connect(processor);
    processor.connect(audioContext.destination);

    processor.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0);
      let sum = 0.0;
      for (let i = 0; i < input.length; ++i) {
        sum += input[i] * input[i];
      }
      const rms = Math.sqrt(sum / input.length);
      if (rms > 0.1) { // Adjust threshold as needed
        if (!isSpeaking) {
          console.log('User started speaking');
          isSpeaking = true;
          clearTimeout(speechTimeout);
          audioChunks = [];
          document.getElementById('userContainer').classList.add('speaking');
        }
        audioChunks.push(...input);
      } else {
        if (isSpeaking) {
          clearTimeout(speechTimeout);
          speechTimeout = setTimeout(() => {
            console.log('User stopped speaking');
            isSpeaking = false;
            document.getElementById('userContainer').classList.remove('speaking');
            // Handle voice detection logic here
            processUserSpeech(audioChunks);
          }, 1000); // Wait for 1 second of silence before processing
        }
      }
    };

    const dc = pc.createDataChannel('oai-events');
    dc.addEventListener('message', (e) => {
      console.log(e);
      document.getElementById('aiContainer').classList.add('speaking');
      setTimeout(() => {
        document.getElementById('aiContainer').classList.remove('speaking');
      }, 1000); // Adjust duration as needed
      // Handle server responses here
    });

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    const baseUrl = 'https://api.openai.com/v1/realtime';
    const model = 'gpt-4o-realtime-preview-2024-12-17';
    const sdpResponse = await fetch(`${baseUrl}?model=${model}&voice=${selectedVoice}`, {
      method: 'POST',
      body: offer.sdp,
      headers: {
        Authorization: `Bearer ${EPHEMERAL_KEY}`,
        'Content-Type': 'application/sdp',
      },
    });

    if (!sdpResponse.ok) {
      throw new Error('Failed to fetch SDP response');
    }

    const answer = {
      type: 'answer',
      sdp: await sdpResponse.text(),
    };
    await pc.setRemoteDescription(answer);

    // Handle server-sent events for audio
    pc.addEventListener('track', (event) => {
      const [remoteStream] = event.streams;
      remoteStream.getTracks().forEach(track => {
        if (track.kind === 'audio') {
          track.addEventListener('ended', () => {
            console.log('Remote audio track ended');
          });
        }
      });
    });

  } catch (error) {
    console.error('Error during WebRTC initialization:', error);
    isWebRTCInitialized = false;
  } finally {
    document.getElementById('spinner').style.display = 'none'; // Hide spinner
  }
}

function processUserSpeech(audioChunks) {
  // Implement the logic to process the user's speech after they have stopped speaking
  console.log('Processing user speech...', audioChunks);
  // Send the audioChunks to the server or handle them as needed
}

document.getElementById('startButton').addEventListener('click', () => {
  initWebRTC();
});
