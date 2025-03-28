// Création du contexte audio
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let ambisonicDecoder;
let audioElement;

async function initAudio() {
    // Création et configuration de l'élément audio
    audioElement = document.createElement('audio');
    audioElement.src = 'Test exp ambiv1.wav'; // Remplace par ton fichier audio ambisonique
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
