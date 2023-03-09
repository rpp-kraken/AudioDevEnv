import React, { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

function WaveformCanvas() {
  const waveformRef = useRef(null);

  useEffect(() => {
    const waveform = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#999',
      // waveColor: '#333',
      progressColor: '#333',
      cursorColor: 'navy',
      barWidth: 2,
      barHeight: 5,
      // barHeight: 1,
    });

    waveform.load('https://dl.dropboxusercontent.com/s/3e7cinfd5ib9u5d/one%20two.m4a?dl=0');
    // waveform.load('https://dl.dropboxusercontent.com/s/1emccgj2kebg72a/Transient.m4a?dl=0');
    // waveform.load('https://dl.dropboxusercontent.com/s/c9aome2s0wr4ym7/Cymatics%20-%2021%20Inch%20Ride%20-%20Velocity%204.wav?dl=0');
    // waveform.load('https://s3-us-west-1.amazonaws.com/leesamples/samples/Rhythmics/60+bpm/Ping+Pong+Ping.mp3');

    return () => {
      waveform.destroy();
    };
  }, []);

  return <div ref={waveformRef} />;
}

export default WaveformCanvas;
