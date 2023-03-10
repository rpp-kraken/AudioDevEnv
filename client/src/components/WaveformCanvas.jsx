import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

function WaveformCanvas(props) {

  // const [trackUrlWave, setTrackUrlWave] = useState('');

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

    waveform.load(props.trackUrl);

    return () => {
      waveform.destroy();
    };
  }, []);

  return <div ref={waveformRef} />;
}

export default WaveformCanvas;
