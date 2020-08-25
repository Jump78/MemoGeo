import song from '../../assets/sonnerieMemogeo.mp3';

const AUDIO_PLAYER_NODE_ID = 'audioPlayer';

let audioPlayer = document.getElementById(AUDIO_PLAYER_NODE_ID);
if(!audioPlayer) {
  audioPlayer = new Audio();
  audioPlayer.src = song;
  audioPlayer.loop = true;
  audioPlayer.id = AUDIO_PLAYER_NODE_ID;
    
  document.body.appendChild(audioPlayer);
}

export function play() {
  audioPlayer.play();
}

export default {
  play,
};