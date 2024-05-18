import React, { useState, useRef, useEffect } from "react";
import { SkipNext, SkipPrevious } from "@mui/icons-material"; // Импорт иконок
import "./App.css";

function App() {
  const [audioSrc, setAudioSrc] = useState('');
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [isSinging, setIsSinging] = useState(false)
  const [musicList, setMusicList] = useState([])
  const [showMusicList, setShowMusicList] = useState(false)
  const audioRef = useRef(null);

  const handleUploadAudio = (event) => {
    const file = event.target.files[0];
    if (file) {
      const audioURL = URL.createObjectURL(file);
      const newMusic ={title:file.name, src: audioURL}
      setAudioSrc(audioURL);
      setCurrentTitle(file.name);
      setMusicList([...musicList, newMusic])
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsSinging(true)
      } else {
        audioRef.current.play();
        setIsSinging(false)
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const skipTime = (amount) => {
    if (audioRef.current) {
      audioRef.current.currentTime += amount;
    }
  };


  const addMusic = () => {
        setShowMusicList(true)
    }
      
    const playMusic = (index) => {
      const selectedMusic = musicList[index]
      setAudioSrc(selectedMusic.src)
      setCurrentTitle(selectedMusic.title)
      audioRef.current.load()
      handlePlayPause()
    }
  

  return (
    <div className="App">
       {isPlaying && <div className="background-animation"></div>}
      <div className="nav">Music Player by Talant</div>
      <div className="nameMusic">
        <h2>{currentTitle}</h2>
        <input
          accept="audio/*"
          onChange={handleUploadAudio}
          type="file"
          placeholder="Add audio music"
         
        />
      </div>

      <div className="main">
        <div className="audio">
         
          {audioSrc && (
            <audio
              className="custom-audio"
              ref={audioRef}
              src={audioSrc}
              onTimeUpdate={handleTimeUpdate}
              controls
            />
          )}
        </div>
        <button className="pp" onClick={handlePlayPause} type="button">
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="controls">
            <div className="left">
              <button type="button" onClick={() => skipTime(-10)}>
                <SkipPrevious />
              </button>
            </div>
            <div className="right">
              <button type="button" onClick={() => skipTime(10)}>
                <SkipNext />
              </button>
            </div>
          </div>
          <button onClick={addMusic} className="addmusic" 
           type="button">AddMusic</button>
      </div>
      
      {showMusicList && (
        <div className="listTrek">
        <ul>
             {musicList.map((music, index) => (
            <div className="list" >  <li key={index} onClick={() => playMusic(index)} >{music.title}</li></div>
             )) }
        </ul>
      </div>
      )}
    </div>
  );
}

export default App;
