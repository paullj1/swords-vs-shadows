var audios = document.getElementsByTagName('audio');

var ambient = document.getElementById('ambient');

var mutebutton = document.getElementById('mutebutton');

function vca()
{
mutebutton.src = (audios[0].muted) ? 'images/mute.png' : 'images/unmute.png';
}

function muteOrUnmute() {
for (i=0;i<audios.length;i++){
  audios[i].muted = !audios[i].muted;}

}

function muteAudio() {
for (i=0;i<audios.length;i++){
  audios[i].muted = true;}

}