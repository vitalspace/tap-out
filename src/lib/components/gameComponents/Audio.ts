import { get } from "svelte/store";
import { audioStatus } from "../../../stores/stores";
// Verificar si estamos en el navegador
const browser = typeof window !== "undefined";

let audio: HTMLAudioElement | null = null;
let volume = 0.1;

// Inicializar el audio solo si estamos en el navegador
if (browser) {
  audio = new Audio("/popping_bubble_sound.mp3");
  audio.onerror = () => {
    console.error("Error al cargar o reproducir el archivo de audio.");
  };
}

const playSound = () => {
  if (browser && audio) {
    audio.volume = volume;
    audio.play();
    audio.currentTime = 0;

    // setTimeout(() => {
    //   audio.pause();
    // }, 1000);
  }
};

const pauseSound = () => {
  if (browser && audio) {
    audio.pause();
  }
};

const stopSound = () => {
  if (browser && audio) {
    audio.pause();
    audio.currentTime = 0;
  }
};

class AudioManager {
  audio: HTMLAudioElement | null;
  volume: number;

  constructor(src: string) {
    if (!browser) return;
    this.audio = new Audio(src);
    this.volume = 0.1;
  }

  play() {
    if (this.audio && browser && get(audioStatus)) {
      this.audio.volume = this.volume;
      this.audio.play();
      this.audio.currentTime = 0;
    }
  }
}

export { playSound, pauseSound, stopSound, AudioManager };
