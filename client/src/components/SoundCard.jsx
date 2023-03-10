import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import WaveformCanvas from './WaveformCanvas.jsx';

const SoundCard = (props) => {

  const [sliderVolumeValue, setSliderVolume] = useState(1);
  const [sliderPitchValue, setSliderValue] = useState(0);
  const [tempoValue, setTempoValue] = useState(1);
  const [mute1prev, setMute1prev] = useState(0);
  const [isMuted1, setIsMuted1] = useState(false);

  useEffect(() => {
    console.log(`${props.trackUrl} CARD RENDER`);

  });

  const handleChangeVolume = (event) => {
    event.preventDefault();
    setSliderVolume(event.target.value);
  };

  const handleChangePitch = (event) => {
    event.preventDefault();
    setSliderValue(event.target.value);
  };

  const handleChangeTempo = (event) => {
    event.preventDefault();
    setTempoValue(event.target.value);
  };

  const muteSound = () => {
    setIsMuted1(!isMuted1);

    if (isMuted1) {

      console.log('unmuting Track');
      setSliderVolume(mute1prev);

    } else {

      setMute1prev(sliderVolumeValue);
      console.log('Muting Track');

      setSliderVolume(0);
    }
  }

  // FX Needed for BMR
  let effectPitch = new Tone.PitchShift(sliderPitchValue).toDestination();
  let gainNode = new Tone.Gain(sliderVolumeValue).connect(effectPitch);

  // Random FX
  // let effectDelay = new Tone.FeedbackDelay(0.5, 0.5).connect(effectPitch);
  // effect4 = new Tone.Freeverb().toDestination();
  // effect2 = new Tone.Tremolo(4, 0.6).connect(effect3);
  // effect1 = new Tone.FedbackDelay(0.5, 0.5).connect(effect2);

  //

  const player1 = new Tone.Player(props.trackUrl).connect(gainNode);

  const playSounds = () => {
    console.log('CLICKED');

    Tone.loaded().then(() => {
      Tone.start();
      Tone.Transport.start();
      player1.playbackRate = tempoValue;
      // player2.playbackRate = 2;
      player1.start();
      // player2.start();
    });
  }

  return (
    <div>
      <button className="outline-button-button" onClick={playSounds}>
        Play Sound
      </button>
      <button className="outline-button-button" onClick={muteSound}>
        {isMuted1 ? 'Unmute Sound 1' : 'Mute'}
      </button>
      <WaveformCanvas trackUrl={props.trackUrl}/>
      <div>
        <p>Volume Slider value: {sliderVolumeValue}</p>
        <input
          type="range"
          min="0"
          max="3"
          step="0.25"
          value={sliderVolumeValue}
          onChange={handleChangeVolume}
          disabled={isMuted1}
        />
      </div>
      <div>
        <p>Pitch Slider value: {sliderPitchValue}</p>
        <input
          type="range"
          min="-24"
          max="24"
          value={sliderPitchValue}
          onChange={handleChangePitch}
        />
      </div>
      <div>
        <p>Tempo Slider value: {tempoValue}</p>
        <input
          type="range"
          min="0.2"
          max="4"
          step="0.2"
          value={tempoValue}
          onChange={handleChangeTempo}
        />
      </div>
      <br/>
      <br/>
    </div>
  )

}

export default SoundCard;