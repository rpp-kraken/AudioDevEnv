import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

function WaveformCanvas(props) {

  // const [trackUrlWave, setTrackUrlWave] = useState('');
  const [wavesurferObj, setWavesurferObj] = useState();


  const waveformRef = useRef(null);

  useEffect(() => {
    // const waveform = WaveSurfer.create({
    //   container: waveformRef.current,
    //   waveColor: '#999',
    //   // waveColor: '#333',
    //   progressColor: '#333',
    //   cursorColor: 'navy',
    //   barWidth: 2,
    //   barHeight: 5,
    //   // barHeight: 1,
    // });

    const waveform = WaveSurfer.create({
      // container: '#waveform',
      container: waveformRef.current,
      // scrollParent: true,
      // autoCenter: true,
      cursorColor: 'violet',
      loopSelection: true,
      waveColor: '#211027',
      progressColor: '#69207F',
      responsive: true,
      // plugins: [
      //   TimelinePlugin.create({
      //     container: '#wave-timeline',
      //   }),
      //   RegionsPlugin.create({}),
      // ],
    })
    setWavesurferObj(waveform)

    waveform.load(props.trackUrl);

    return () => {
      waveform.destroy();
    };
  }, []);


  const handlePlayPause = (e) => {
    wavesurferObj.playPause();
    // setPlaying(!playing);
  };

  // const handleActiveClick = (e) => {
  //   const cardNum = props.index + 1;
  //   props.handleClickActive(cardNum);
  //   // setPlaying(!playing);
  // };

  return (

    <div>
      <button onClick={handlePlayPause}>
        Play this waveform from WaveSurfer
      </button>
      {/* <div ref={waveformRef} onClick={handleActiveClick}/> */}
      <div ref={waveformRef} />
    </div>

  );

}

export default WaveformCanvas;
