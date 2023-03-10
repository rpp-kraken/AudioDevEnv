import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import SoundCard from './SoundCard.jsx';
import WaveformCanvas from './WaveformCanvas.jsx';
import AudioWaveform from './AudioWaveform.jsx'


const ProjectView = () => {

  const [listOfTracks, setListOfTracks] = useState([]);
  // const [activeSoundCard, setActiveSoundCard] = useState(1);

  // TODO: state or active track tapped

  useEffect(() => {
    console.log('first render!',);

    // Uncomment for multiple tracks
    let trackUrlSources = [
      // 'https://s3-us-west-1.amazonaws.com/leesamples/samples/Rhythmics/60+bpm/Ping+Pong+Ping.mp3',
      // 'https://dl.dropboxusercontent.com/s/w303ydczmgrkfh8/New%20Recording%2075.m4a?dl=0',
      // 'https://tonejs.github.io/audio/berklee/gong_1.mp3',
      'https://dl.dropboxusercontent.com/s/1emccgj2kebg72a/Transient.m4a?dl=0',
      'https://dl.dropboxusercontent.com/s/c9aome2s0wr4ym7/Cymatics%20-%2021%20Inch%20Ride%20-%20Velocity%204.wav?dl=0',
      'https://dl.dropboxusercontent.com/s/3e7cinfd5ib9u5d/one%20two.m4a?dl=0'
    ];

    setListOfTracks(trackUrlSources);
  }, []);

  const listPlayers = {};

  const handleAddPlayer = (player, tempoValue) => {
    const key = Object.keys(player);
    player[key]["transpose"] = tempoValue;
    listPlayers[key[0]] = player[key];
    console.log('adding player to multiplayer...', listPlayers);
  };

  const handlePlayAll = () => {
    console.log('PLAY ALL');

    Tone.loaded().then(() => {
      Tone.start();
      Tone.Transport.start();
      for (var key in listPlayers) {
        const playerEach = listPlayers[key];
        playerEach.start();
        playerEach.playbackRate = playerEach["transpose"];
      }

    });
  };


  return (

    <div>
      <h4 className="smalltitle">SoundCrate Audio Test - Project View</h4>
      <button className="outline-button-button" onClick={handlePlayAll}>
        Play All Sounds with FX from Tone.JS
      </button><br />
      <br />
      {/* {listOfTracks.map((urlTrack, i) => { return <WaveformCanvas trackUrl={urlTrack} index={i} key={i}/> })} */}
      {listOfTracks.map((urlTrack, i) => { return <AudioWaveform trackUrl={urlTrack} index={i} key={i}/> })}
      <div className="sidescroller">
        {listOfTracks.map((urlTrack, i) => { return <SoundCard trackUrl={urlTrack} index={i} key={i} handleAddPlayer={handleAddPlayer} /> })}
      </div>
    </div>

);
}

export default ProjectView;

//Richard Notes
{/* {listOfTracks.map((urlTrack, i) => { return <WaveformCanvas trackUrl={urlTrack} index={i} key={i} handleClickActive={handleClickActive} /> })} */}
{/* <h4>Active Soundcard is... {activeSoundCard} </h4> */}
{/* I was trying to figure out how to hide the non-active SoundCards... */}

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