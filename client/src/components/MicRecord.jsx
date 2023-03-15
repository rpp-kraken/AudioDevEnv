import React, { useState, useRef } from 'react';
import getBlobDuration from 'get-blob-duration';

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
        getBlobDuration(audioBlob).then(function(duration) {
          console.log(duration + ' seconds', duration < 30);
          if (duration < 30000){
            props.setListOfTracks(prevList => [...prevList, URL.createObjectURL(audioBlob)]);
            console.log(props.maxTracks)
            props.setMax(props.maxTracks + 1);
            console.log(props.maxTracks)
          if (props.maxTracks >= 2) {
            props.setUnderMax(false);
            console.log(props.setUnderMax)
          };
          } else {
            alert(`${duration} 'tck is too long'`);
          }
        });
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