import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import SoundCard from './SoundCard.jsx';
import WaveformCanvas from './WaveformCanvas.jsx';
import AudioWaveform from './AudioWaveform.jsx'
import { MicrophoneRecorder } from './MicRecord.jsx';


const ProjectView = () => {

  const [listOfTracks, setListOfTracks] = useState([]);
  const [listPlayers, setListPlayers] = useState({});

  const [maxTracks, setMax] = useState(1);
  const [underMax, setUnderMax] = useState(true);

  // const [activeSoundCard, setActiveSoundCard] = useState(1);
  // TODO: state or active track tapped

  useEffect(() => {
    console.log('first render!',);

    // Uncomment for multiple tracks
    let trackUrlSources = [
      // 'https://s3-us-west-1.amazonaws.com/leesamples/samples/Rhythmics/60+bpm/Ping+Pong+Ping.mp3',
      // 'https://dl.dropboxusercontent.com/s/w303ydczmgrkfh8/New%20Recording%2075.m4a?dl=0',
      // 'https://tonejs.github.io/audio/berklee/gong_1.mp3',
      // 'https://dl.dropboxusercontent.com/s/1emccgj2kebg72a/Transient.m4a?dl=0',
      // 'https://dl.dropboxusercontent.com/s/c9aome2s0wr4ym7/Cymatics%20-%2021%20Inch%20Ride%20-%20Velocity%204.wav?dl=0',
      // 'https://dl.dropboxusercontent.com/s/3e7cinfd5ib9u5d/one%20two.m4a?dl=0',
      'https://dl.dropboxusercontent.com/s/d539eig06ioc35s/one%20two.webm?dl=0',
    ];

    setListOfTracks(trackUrlSources);
  }, [handleDelete]);

  const listPlayersObj = {};


  function handleUploadAudio(event) {
    const file = event.target.files[0];
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);
    audio.onloadedmetadata = function() {
      const duration = audio.duration;
      if (duration > 30) {
        alert('Audio file must be no longer than 30 seconds.');
        return;
      } else {
        setListOfTracks(prevList => [...prevList, URL.createObjectURL(file)]);
        if (maxTracks <= 3) {
          console.log(maxTracks);
          setMax(maxTracks + 1);
          if (maxTracks >= 2) {
            setUnderMax(false);
          }
        };
      }
    };
  }


  const handleDelete = (index) => {
    const trackList = [...listOfTracks];
    trackList.splice(index, 1);
    setListOfTracks(trackList);
    setUnderMax(true);
    setMax(maxTracks-1);
  };

  useEffect(() => {
  },[underMax])

    useEffect(() => {
    console.log('listOfTracks has been updated!',);
  }, [listOfTracks]);

  const handleAddPlayer = (player, tempoValue) => {
    const key = Object.keys(player);
    player[key]["transpose"] = tempoValue;
    listPlayersObj[key[0]] = player[key];

    setListPlayers(prevState => ({
      ...prevState,
      ...listPlayersObj
    }));
    // console.log('adding player to multiplayer...', listPlayers);
  };

  const handlePlayAll = () => {
    console.log('PLAY ALL');

    Tone.loaded().then(() => {
      // Create a Gain node to use as the output destination
      const output = new Tone.Gain().toDestination();
      // Create a new recorder and connect it to the output node

      Tone.start();
      Tone.Transport.start();

      // Main Multiplayer (combined sound, what we hear)
      for (var key in listPlayers) {
        const playerEach = listPlayers[key];
        playerEach.start(); // Deleting this stops all sound
        playerEach.playbackRate = playerEach["transpose"];
      }
    });
  };

  const handleRecordRender = () => {
    console.log('Render ALL tracks into Song');

    Tone.loaded().then(() => {

      // Create a Gain node to use as the output destination
      const output = new Tone.Gain().toDestination();
      // Create a new recorder and connect it to the output node
      const recorder = new Tone.Recorder();
      Tone.Master.connect(recorder);

      // Start recording
      recorder.start();

      Tone.start();
      Tone.Transport.start();

      // Main Multiplayer (combined sound, what we hear)
      for (var key in listPlayers) {
        const playerEach = listPlayers[key];
        playerEach.start(); // Deleting this stops all sound
        playerEach.playbackRate = playerEach["transpose"];
      }

      setTimeout(async () => {
        // the recorded audio is returned as a blob
        const recording = await recorder.stop();

        // //This is for disconnecting players:
        // for (var key in listPlayers) {
        //   const playerEach = listPlayers[key];
        //   playerEach.disconnect();
        // }

        // download the recording by creating an anchor element and blob url
        const url = URL.createObjectURL(recording);
        const anchor = document.createElement("a");
        anchor.download = "recording.webm";
        anchor.href = url;
        anchor.click();
      }, 4000);
    });
  };

  return (

    <div>
      <h4 className="smalltitle">SoundCrate Audio Test - Project View</h4>
      <button className="outline-button-button" onClick={handlePlayAll}>
        Play All Sounds with FX from Tone.JS
      </button><br /> <br />
      <button className="outline-button-button" onClick={handleRecordRender}>
        Render and download song
      </button>
      <h4 className="smalltitle">
        ## See the Rendered Song by Uploading the downloaded .webm file
      </h4>
      <br />
      {/* {listOfTracks.map((urlTrack, i) => { return <WaveformCanvas trackUrl={urlTrack} index={i} key={i}/> })} */}
      <div>
      {listOfTracks.map((urlTrack, i) => (
        <div>
          <div>
          <AudioWaveform trackUrl={urlTrack} index={i} />
          <button onClick={()=>handleDelete(i)}  >delete track</button>
          </div>
          <div>
          <SoundCard trackUrl={urlTrack} index={i} key={i} handleAddPlayer={handleAddPlayer} setListOfTracks={setListOfTracks} setMax={setMax} maxTracks={maxTracks} setUnderMax={setUnderMax} underMax={underMax} listOfTracks={listOfTracks}/>
          </div>
        </div>
      ))}
      </div>
      <h4 className="smalltitle">
        ## Upload File
      </h4>
      <div>
        <form>
          {underMax && <input type="file" accept="audio/*" onChange={handleUploadAudio} />}
        </form>
        <div>
        <MicrophoneRecorder setListOfTracks={setListOfTracks} listOfTracks={listOfTracks} setMax={setMax} maxTracks={maxTracks} setUnderMax={setUnderMax} underMax={underMax}/>
        </div>
      </div>
    </div>

  );
}

export default ProjectView;

//Richard Notes
{/* {listOfTracks.map((urlTrack, i) => { return <WaveformCanvas trackUrl={urlTrack} index={i} key={i} handleClickActive={handleClickActive} /> })} */ }
{/* <h4>Active Soundcard is... {activeSoundCard} </h4> */ }
{/* I was trying to figure out how to hide the non-active SoundCards... */ }

{/* {listOfTracks.map((urlTrack, i) => { if (i === activeSoundCard - 1) return <SoundCard trackUrl={urlTrack} index={i} key={i} active={i === activeSoundCard} handleAddPlayer={handleAddPlayer} /> })}
{listOfTracks.map((urlTrack, i) => { if (i !== activeSoundCard - 1) return <SoundCard className="hidden" trackUrl={urlTrack} index={i} key={i} active={i === activeSoundCard} handleAddPlayer={handleAddPlayer} /> })} */}
{/*
{listOfTracks.map((urlTrack, i) => { (
  i === activeSoundCard - 1
  ? <SoundCard trackUrl={urlTrack} index={i} key={i} handleAddPlayer={handleAddPlayer} />
  : <SoundCard trackUrl={urlTrack} className="hidden" index={i} key={i} handleAddPlayer={handleAddPlayer} />
  )})}
*/}
// const handleClickActive = (activeCard) => {
//   console.log("HandleClickActive ~ activeCard: ", activeCard)
//   setActiveSoundCard(activeCard);
// }