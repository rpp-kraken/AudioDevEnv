import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import SoundCard from './SoundCard.jsx';

const ProjectView = () => {

  const [listOfTracks, setListOfTracks] = useState([]);
  // const [listPlayers, setListPlayers] = useState([]);

  // TODO: state or active track tapped

  useEffect(() => {
    console.log('first render!');

    // Uncomment for more than one track
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
    // setListPlayers([...listPlayers, player]);
    const key = Object.keys(player);
    console.log("🚀 ~ file: ProjectView.jsx:34 ~ handleAddPlayer ~ key:", key[0])
    player[key]["transpose"] = tempoValue;
    listPlayers[key[0]] = player[key];
    // listPlayers.push(player);
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

      // const master = new Tone.Gain().toMaster();
      // players.forEach((player) => {
      //   player.connect(master);
      //   player.start();
      // });

      // listPlayers.forEach((playerEach) => {
      //   playerEach.connect(master);
      //   playerEach.start();
      // });

      // listPlayers.forEach((playerEach) => {
      //   playerEach.start();
      // });
      // player.playbackRate = tempoValue;
      // player2.playbackRate = 2;
      // player.start();
      // player2.start();
    });


  };


  return (

    <div>
      <h4 className="smalltitle">SoundCrate Audio Test - Project View</h4>
      <button className="outline-button-button" onClick={handlePlayAll}>
        Play All Sounds
      </button>
      {listOfTracks.map((urlTrack, i) => { return <SoundCard trackUrl={urlTrack} index={i} key={i} handleAddPlayer={handleAddPlayer} /> })}
    </div>

  );
}

export default ProjectView;
