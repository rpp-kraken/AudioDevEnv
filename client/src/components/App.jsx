import React, { useState, useEffect } from 'react';
import SoundCard from './SoundCard.jsx'


const App = () => {

  const [listOfTracks, setListOfTracks] = useState([]);

  // TODO: state or active track tapped

  useEffect(() => {

    // Uncomment for more than one track
    let trackUrlSources = [
      // 'https://s3-us-west-1.amazonaws.com/leesamples/samples/Rhythmics/60+bpm/Ping+Pong+Ping.mp3',
      // 'https://dl.dropboxusercontent.com/s/w303ydczmgrkfh8/New%20Recording%2075.m4a?dl=0',
      // 'https://tonejs.github.io/audio/berklee/gong_1.mp3',
      // 'https://dl.dropboxusercontent.com/s/1emccgj2kebg72a/Transient.m4a?dl=0',
      'https://dl.dropboxusercontent.com/s/c9aome2s0wr4ym7/Cymatics%20-%2021%20Inch%20Ride%20-%20Velocity%204.wav?dl=0',
      'https://dl.dropboxusercontent.com/s/3e7cinfd5ib9u5d/one%20two.m4a?dl=0'
    ];

    setListOfTracks(trackUrlSources);

  }, []);


  return (

    <div>
      <h4 className="smalltitle">SoundCrate Audio Test - Project View</h4>
      {listOfTracks.map((urlTrack, i) => { return <SoundCard trackUrl={urlTrack} key={i}/>})}
    </div>

  );
}

export default App;
