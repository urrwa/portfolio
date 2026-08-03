/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioContextProps {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playScratch: () => void;
  playKnock: () => void;
  playType: () => void;
  playWhoosh: () => void;
  playDoorOpen: () => void;
}

const AudioEngineContext = createContext<AudioContextProps | undefined>(undefined);

export function AudioEngineProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false); // Default unmuted so ambient music starts automatically
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playClick = () => {
    if (isMuted) return;
    initAudio();
    const ctx = audioCtxRef.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  const playScratch = () => {
    if (isMuted) return;
    initAudio();
    const ctx = audioCtxRef.current!;
    const bufferSize = ctx.sampleRate * 0.15; // 150ms scratch
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(3, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.16);
  };

  const playKnock = () => {
    if (isMuted) return;
    initAudio();
    const ctx = audioCtxRef.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  };

  const playType = () => {
    if (isMuted) return;
    initAudio();
    const ctx = audioCtxRef.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  };

  const playWhoosh = () => {
    if (isMuted) return;
    initAudio();
    const ctx = audioCtxRef.current!;
    const bufferSize = ctx.sampleRate * 0.4; // 400ms whoosh
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.2);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.42);
  };

  const playDoorOpen = () => {
    if (isMuted) return;
    initAudio();
    const ctx = audioCtxRef.current!;

    // Creaky low wood vibration
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(130, ctx.currentTime + 0.8);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.85);

    // High wood friction squeak
    const squeak = ctx.createOscillator();
    const squeakGain = ctx.createGain();

    squeak.type = 'sine';
    squeak.frequency.setValueAtTime(1100, ctx.currentTime);
    squeak.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.6);

    squeakGain.gain.setValueAtTime(0.002, ctx.currentTime);
    squeakGain.gain.linearRampToValueAtTime(0.007, ctx.currentTime + 0.15);
    squeakGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    squeak.connect(squeakGain);
    squeakGain.connect(ctx.destination);

    squeak.start();
    squeak.stop(ctx.currentTime + 0.65);
  };

  // Initialize background music for "End of Beginning" by Djo
  useEffect(() => {
    const audio = new Audio();
    audio.src = 'https://ia601503.us.archive.org/30/items/djo-end-of-beginning/Djo%20-%20End%20of%20Beginning.mp3';
    audio.loop = true; // Seamless looping
    audio.volume = 0; // Start at 0 for gentle fade-in
    audio.preload = 'auto';
    bgMusicRef.current = audio;

    const targetVolume = 0.5; // Default volume set to 50%
    let fadeInterval: any = null;

    const fadeIn = () => {
      if (!bgMusicRef.current) return;
      let currentVol = 0;
      const durationMs = 1500; // 1.5 second gentle fade-in
      const stepMs = 50;
      const stepIncrement = targetVolume / (durationMs / stepMs);

      clearInterval(fadeInterval);
      fadeInterval = setInterval(() => {
        if (!bgMusicRef.current) {
          clearInterval(fadeInterval);
          return;
        }
        currentVol = Math.min(targetVolume, currentVol + stepIncrement);
        bgMusicRef.current.volume = currentVol;
        if (currentVol >= targetVolume) {
          clearInterval(fadeInterval);
        }
      }, stepMs);
    };

    // Attempt automatic playback on load
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          fadeIn();
        })
        .catch(() => {
          // Handle browser autoplay restrictions: play & fade-in on first user interaction
          const handleUserInteraction = () => {
            if (bgMusicRef.current && !isMuted) {
              bgMusicRef.current.play().then(() => fadeIn()).catch(() => {});
            }
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('keydown', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
          };
          window.addEventListener('click', handleUserInteraction, { once: true });
          window.addEventListener('keydown', handleUserInteraction, { once: true });
          window.addEventListener('touchstart', handleUserInteraction, { once: true });
        });
    }

    return () => {
      clearInterval(fadeInterval);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Sync play / pause status with isMuted state without restarting track position
  useEffect(() => {
    if (!bgMusicRef.current) return;
    if (isMuted) {
      bgMusicRef.current.pause();
    } else {
      bgMusicRef.current.play().catch(() => {});
      if (bgMusicRef.current.volume === 0) {
        bgMusicRef.current.volume = 0.5;
      }
    }
  }, [isMuted]);

  const toggleMute = () => {
    initAudio();
    setIsMuted((prev) => !prev);
  };

  return (
    <AudioEngineContext.Provider value={{ isMuted, toggleMute, playClick, playScratch, playKnock, playType, playWhoosh, playDoorOpen }}>
      {children}
      {/* Floating sound & background music control widget */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-2 rounded-full border border-neutral-300 bg-white/95 text-neutral-800 shadow-lg backdrop-blur-md transition-all select-none sketch-element">
        <button
          id="sound-toggle-btn"
          onClick={toggleMute}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-none interactive-obj"
          aria-label="Toggle sound ambience"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-neutral-400" />
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider font-bold">Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-wider font-bold">50% Ambient</span>
            </>
          )}
        </button>
      </div>
    </AudioEngineContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioEngineContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioEngineProvider');
  }
  return context;
}
