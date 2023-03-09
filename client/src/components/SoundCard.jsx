import React, {useState, useEffect} from 'react';
import * as Tone from 'tone';
import WaveformCanvas from './WaveformCanvas.jsx';

const SoundCard = (props) => {
  // Here's my state to sumbit
  const [sliderVolumeValue, setSliderVolume] = useState(1);
  const [sliderPitchValue, setSliderValue] = useState(0);
  const [tempoValue, setTempoValue] = useState(1);
  const [mute1prev, setMute1prev] = useState(0);
  const [isMuted1, setIsMuted1] = useState(false);

  useEffect(() => {
    console.log('First render');

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

  const tracks = [
    // 'https://s3-us-west-1.amazonaws.com/leesamples/samples/Rhythmics/60+bpm/Ping+Pong+Ping.mp3',
    // 'https://dl.dropboxusercontent.com/s/w303ydczmgrkfh8/New%20Recording%2075.m4a?dl=0',
    // 'https://tonejs.github.io/audio/berklee/gong_1.mp3',
    // 'https://dl.dropboxusercontent.com/s/1emccgj2kebg72a/Transient.m4a?dl=0',
    // 'https://dl.dropboxusercontent.com/s/c9aome2s0wr4ym7/Cymatics%20-%2021%20Inch%20Ride%20-%20Velocity%204.wav?dl=0',
    // 'https://dl.dropboxusercontent.com/s/49diz1puss6u3rz/DJ%20RADIK%20-%20Nina%20sin%20educaci%C3%B3n.mp3',
    'https://dl.dropboxusercontent.com/s/3e7cinfd5ib9u5d/one%20two.m4a?dl=0'
  ];

  let effectPitch = new Tone.PitchShift(sliderPitchValue).toDestination();
  let gainNode = new Tone.Gain(sliderVolumeValue).connect(effectPitch);

  // let effectDelay = new Tone.FeedbackDelay(0.5, 0.5).connect(effectPitch);
    // effect4 = new Tone.Freeverb().toDestination();
    // effect2 = new Tone.Tremolo(4, 0.6).connect(effect3);
    // effect1 = new Tone.FedbackDelay(0.5, 0.5).connect(effect2);

  const player1 = new Tone.Player(tracks[0]).connect(gainNode);

  const playSounds = () => {

    console.log('CLICKED');

  // 3 TRACKS !

//     const tracks = [
//       // 'https://s3-us-west-1.amazonaws.com/leesamples/samples/Rhythmics/60+bpm/Ping+Pong+Ping.mp3',
//       // 'https://dl.dropboxusercontent.com/s/w303ydczmgrkfh8/New%20Recording%2075.m4a?dl=0',
//       'https://tonejs.github.io/audio/berklee/gong_1.mp3',
//       // 'https://dl.dropboxusercontent.com/s/1emccgj2kebg72a/Transient.m4a?dl=0',
//       // 'https://dl.dropboxusercontent.com/s/c9aome2s0wr4ym7/Cymatics%20-%2021%20Inch%20Ride%20-%20Velocity%204.wav?dl=0',
//       // 'https://dl.dropboxusercontent.com/s/49diz1puss6u3rz/DJ%20RADIK%20-%20Nina%20sin%20educaci%C3%B3n.mp3',

//     ];

//     let effectPitch = new Tone.PitchShift(sliderPitchValue).toDestination();
//     // let effectDelay = new Tone.FeedbackDelay(0.5, 0.5).connect(effectPitch);


//       // effect4 = new Tone.Freeverb().toDestination();
//       // effect2 = new Tone.Tremolo(4, 0.6).connect(effect3);
//       // effect1 = new Tone.FedbackDelay(0.5, 0.5).connect(effect2);

// const player1 = new Tone.Player(tracks[0]).connect(effectPitch);

// const player1 = new Tone.Player(tracks[0]).toDestination();
// const player2 = new Tone.Player(tracks[1]).toDestination();
// const player3 = new Tone.Player(tracks[2]).toDestination();


Tone.loaded().then(() => {
  Tone.start();
  Tone.Transport.start();
  player1.playbackRate = tempoValue;
  // player2.playbackRate = 2;
  // player3.playbackRate = 2;
  player1.start();
  // player2.start();
  // player3.start();
});

// const volume1 = new Tone.Volume().toDestination();
// const volume2 = new Tone.Volume().toDestination();
// const volume3 = new Tone.Volume().toDestination();

// player1.connect(volume1);
// player2.connect(volume2);
// player3.connect(volume3);

// player1.autostart = true;
// player2.autostart = true;
// player3.autostart = true;



    // Good to know, I can reset input after event
    // SubmitHabit('');

  }


  return (
    <div>
      <h4 className="smalltitle">SoundCrate Audio Test - Project View</h4>
      {/* <input value={HabitToAdd} onChange={onChange} onKeyPress={(e) => e.key === 'Enter' && submit()}/> */}
      <button className="outline-button-button" onClick={playSounds}>
        Play Sound
      </button>
      <button className="outline-button-button" onClick={muteSound}>
        {isMuted1 ? 'Unmute Sound 1' : 'Mute Sound 1'}
      </button>
      <WaveformCanvas/>
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
        <p>(Faster = higher pitch and vice versa. Can be re-adjusted with Pitch Slider.)</p>
      </div>
    </div>
  )

}

export default SoundCard;