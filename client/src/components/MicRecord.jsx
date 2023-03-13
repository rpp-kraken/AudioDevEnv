import React, { useState, useRef } from 'react';

export const MicrophoneRecorder = (props) => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted');
      mediaRecorderRef.current = new MediaRecorder(stream);
      const audioChunks = [];
      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorderRef.current.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/' });
        setAudioBlob(audioBlob)
        props.setListOfTracks(prevList => [...prevList, URL.createObjectURL(audioBlob)]);
        // console.log(audioBlob);
        if (props.maxTracks <= 3) {
          // console.log(props.maxTracks);
          props.setMax(props.maxTracks + 1);
          if (props.maxTracks >= 2) {
            props.setUnderMax(false);
          }
        };
      });

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  }

  function stopRecording() {
    mediaRecorderRef.current.stop();
    setRecording(false);
  }


  return (
    <div>
      {props.underMax && <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>}
    </div>
  );
}