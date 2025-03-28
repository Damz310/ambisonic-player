// Création du contexte audio
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let ambisonicDecoder;
let audioElement;

async function initAudio() {
    // Création et configuration de l'élément audio
    audioElement = document.createElement('audio');
    audioElement.src = 'https://static.wixstatic.com/mp3/a06a49_146db5a3d4bf4d70acb3cefd25ba8551.wav'; // Remplace par ton fichier audio ambisonique
    audioElement.loop = true;
    audioElement.crossOrigin = 'anonymous';

    let mediaElementSource = audioContext.createMediaElementSource(audioElement);

    // Initialisation du décodeur Omnitone
    ambisonicDecoder = await Omnitone.createFOADecoder(audioContext);
    await ambisonicDecoder.initialize();

    // Connexion du pipeline audio
    mediaElementSource.connect(ambisonicDecoder.input);
    ambisonicDecoder.output.connect(audioContext.destination);

    // Lecture de l'audio
    audioElement.play();
}

// Gestion du bouton de démarrage
document.getElementById('startButton').addEventListener('click', () => {
    audioContext.resume().then(() => {
        initAudio();
    });
});
