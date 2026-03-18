import { useState, useEffect, useRef, useCallback } from "react";
import "./PomodoroPage.css";

const MODES = [
  { key: "focus", label: "Focus", minutes: 25 },
  { key: "short", label: "Short Break", minutes: 5 },
  { key: "long", label: "Long Break", minutes: 15 },
];

export default function PomodoroPage() {
  const [modeIndex, setModeIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(MODES[0].minutes * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  const totalSeconds = MODES[modeIndex].minutes * 60;
  const progress = (secondsLeft / totalSeconds) * 100;
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  const playBeep = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.2);
    } catch (err) {
      console.error("Audio playback failed:", err);
    }
  }, []);

  const reset = useCallback(
    (idx = modeIndex) => {
      clearInterval(intervalRef.current);
      setRunning(false);
      setSecondsLeft(MODES[idx].minutes * 60);
    },
    [modeIndex],
  );

  const switchMode = (idx) => {
    setModeIndex(idx);
    reset(idx);
    setSecondsLeft(MODES[idx].minutes * 60);
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            playBeep();
            if (modeIndex === 0) setSessions((prev) => prev + 1);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, modeIndex, playBeep]);

  // Circumference for SVG circle
  const R = 88;
  const circ = 2 * Math.PI * R;
  const dash = (progress / 100) * circ;

  return (
    <div className="pomodoro-page">
      {/* Mode Tabs */}
      <div className="pomo-tabs">
        {MODES.map((m, i) => (
          <button
            key={m.key}
            className={`pomo-tab ${modeIndex === i ? "active" : ""}`}
            onClick={() => switchMode(i)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Timer Ring */}
      <div className="pomo-ring-wrap">
        <svg className="pomo-ring" viewBox="0 0 200 200">
          {/* Track */}
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            className="pomo-ring-track"
            strokeWidth="6"
          />
          {/* Progress */}
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            className="pomo-ring-progress"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            transform="rotate(-90 100 100)"
            style={{ transition: "stroke-dasharray 0.8s ease" }}
          />
        </svg>

        <div className="pomo-time-display">
          <span className="pomo-digits">
            {mins}:{secs}
          </span>
          <span className="pomo-mode-label">{MODES[modeIndex].label}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="pomo-controls">
        <button className="pomo-btn-secondary" onClick={() => reset()}>
          ↺
        </button>
        <button
          className={`pomo-btn-primary ${running ? "running" : ""}`}
          onClick={() => setRunning((r) => !r)}
        >
          {running ? "Pause" : secondsLeft === 0 ? "Restart" : "Start"}
        </button>
        <button
          className="pomo-btn-secondary"
          onClick={() => switchMode((modeIndex + 1) % MODES.length)}
        >
          ⏭
        </button>
      </div>

      {/* Session dots */}
      <div className="pomo-sessions">
        <span className="pomo-sessions-label">Sessions today</span>
        <div className="pomo-dots">
          {Array.from({ length: Math.max(sessions, 4) }).map((_, i) => (
            <span
              key={i}
              className={`pomo-dot ${i < sessions ? "filled" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
