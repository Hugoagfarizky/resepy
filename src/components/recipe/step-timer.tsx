"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Timer, Volume2 } from "lucide-react";

interface StepTimerProps {
  totalSeconds: number;
  label?: string;
}

export function StepTimer({ totalSeconds, label }: StepTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Play pleasant chime with Web Audio API
  const playAlertSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {
      // Audio might be blocked if no user interaction yet
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            playAlertSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const toggleStartPause = () => {
    if (isFinished) {
      // Reset first if restarting from finished
      setTimeLeft(totalSeconds);
      setIsFinished(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(totalSeconds);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border transition-all ${
        isFinished
          ? "bg-red-50 border-red-300 text-red-700 animate-pulse"
          : isRunning
          ? "bg-amber-50 border-amber-300 text-amber-900 shadow-xs"
          : "bg-neutral-50 border-neutral-200 text-neutral-800"
      }`}
    >
      <div className="flex items-center gap-2">
        <Timer className={`w-4 h-4 ${isRunning ? "text-amber-600 animate-spin" : "text-neutral-500"}`} />
        <span className="text-xs font-semibold text-neutral-600 hidden sm:inline">
          {label || "Timer"}:
        </span>
        <span className="font-mono font-bold text-sm tracking-wider">
          {formattedTime}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={toggleStartPause}
          aria-label={isRunning ? "Jeda timer" : "Mulai timer"}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
            isRunning
              ? "bg-amber-600 hover:bg-amber-700 text-white"
              : isFinished
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-neutral-900 hover:bg-orange-600 text-white"
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-3 h-3" />
              <span>Jeda</span>
            </>
          ) : isFinished ? (
            <>
              <Volume2 className="w-3 h-3" />
              <span>Selesai! Ulangi</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-white" />
              <span>Mulai</span>
            </>
          )}
        </button>

        {(isRunning || timeLeft !== totalSeconds) && (
          <button
            type="button"
            onClick={resetTimer}
            aria-label="Reset timer"
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
