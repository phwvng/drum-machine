import React, {useState, useEffect} from 'react';
import './App.scss';

const audioClips = [
  {
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  { 
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function App() {

  const [display, setDisplay] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  const handleKeyPress = (e) => {
    const sound = audioClips.find((clip) => clip.keyTrigger === e.key.toUpperCase());
    if (sound) {
      const soundElement = document.getElementById(sound.keyTrigger);
      soundElement.currentTime = 0;
      soundElement.play();
      setDisplay(sound.id);
    }
  }

  return (
    <div className="App">
       <div className='container' id="drum-machine">
       <h1>fCC Drum Machine</h1>
        <div id="display">
          {display}
          </div>
          <div className="drum-pads">
            {audioClips.map((clip) => (
              <DrumPad label={clip.keyTrigger} id={clip.id} src={clip.url} />
            ))}
          </div>
        </div>
    </div>
  );
}

function DrumPad(props) {
  const playSound = () => {
    const sound = document.getElementById(props.label);
    sound.currentTime = 0;
    sound.play();
    document.getElementById('display').innerText = props.id;
  }

  return (
    <div className="drum-pad" onClick={playSound} id={props.id}>
      {props.label}
      <audio className="clip" id={props.label} src={props.src}></audio>
    </div>
  );
}

export default App;
