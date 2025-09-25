import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const presets = {
  "Box": [4, 4, 4, 4],
  "4-7-8": [4, 7, 8, 0],
  "Coherent": [5, 0, 5, 0],
  "Resonant": [6, 0, 6, 0]
};

const themes = {
  "Blue": {
    body: "bg-gradient-to-br from-blue-400 to-green-200",
    content: "bg-gradient-to-br from-blue-50 to-white",
    card: "bg-blue-50",
    outerCircle: "bg-gradient-radial from-blue-100 to-blue-50",
    innerCircle: "bg-gradient-radial from-blue-200 to-blue-300",
    button: "bg-blue-600 hover:bg-blue-700",
    patternButton: "bg-blue-50 border-blue-600",
    patternButtonActive: "bg-blue-600 text-white"
  },
  "Green": {
    body: "bg-gradient-to-br from-green-400 to-yellow-200", 
    content: "bg-gradient-to-br from-green-50 to-green-25",
    card: "bg-green-50",
    outerCircle: "bg-gradient-radial from-green-100 to-green-50",
    innerCircle: "bg-gradient-radial from-green-200 to-green-300",
    button: "bg-green-600 hover:bg-green-700",
    patternButton: "bg-green-50 border-green-600", 
    patternButtonActive: "bg-green-600 text-white"
  },
  "Purple": {
    body: "bg-gradient-to-br from-purple-400 to-pink-300",
    content: "bg-gradient-to-br from-purple-50 to-purple-25", 
    card: "bg-purple-50",
    outerCircle: "bg-gradient-radial from-purple-100 to-purple-50",
    innerCircle: "bg-gradient-radial from-purple-200 to-purple-300",
    button: "bg-purple-600 hover:bg-purple-700",
    patternButton: "bg-purple-50 border-purple-600",
    patternButtonActive: "bg-purple-600 text-white"
  }
};

interface BreathingExerciseProps {
  onThemeChange: (theme: keyof typeof themes) => void;
  currentTheme: keyof typeof themes;
}

export function BreathingExercise({ onThemeChange, currentTheme }: BreathingExerciseProps) {
  const [pattern, setPattern] = useState([4, 4, 4, 4]);
  const [phase, setPhase] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [totalCycles, setTotalCycles] = useState(5);
  const [activePreset, setActivePreset] = useState("Box");
  const [customInputs, setCustomInputs] = useState({ inhale: 4, hold1: 4, exhale: 4, hold2: 4 });
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const phaseLabels = ["Inhale", "Hold", "Exhale", "Hold"];

  const phaseDuration = pattern[phase] || 0;
  const timeLeft = Math.max(0, Math.ceil(phaseDuration - elapsed));

  const getCircleScale = () => {
    let scale = 1;
    if (phase === 0) { // Inhale
      scale = 1 + 0.3 * (elapsed / phaseDuration);
    } else if (phase === 2) { // Exhale
      scale = 1.3 - 0.5 * (elapsed / phaseDuration);
    } else {
      scale = (phase === 1) ? 1.3 : 0.8;
    }
    return scale;
  };

  const start = () => {
    if (!running) {
      setRunning(true);
    }
  };

  const pause = () => {
    setRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const reset = () => {
    pause();
    setPhase(0);
    setElapsed(0);
    setCycles(0);
  };

  const setPreset = (presetName: keyof typeof presets) => {
    setActivePreset(presetName);
    const newPattern = presets[presetName];
    setPattern(newPattern);
    setCustomInputs({
      inhale: newPattern[0],
      hold1: newPattern[1], 
      exhale: newPattern[2],
      hold2: newPattern[3]
    });
    reset();
  };

  const updateCustomPattern = () => {
    const newPattern = [customInputs.inhale, customInputs.hold1, customInputs.exhale, customInputs.hold2];
    setPattern(newPattern);
    
    // Check if matches a preset
    const matchingPreset = Object.entries(presets).find(([_, preset]) => 
      JSON.stringify(preset) === JSON.stringify(newPattern)
    );
    
    setActivePreset(matchingPreset ? matchingPreset[0] : "Custom");
    reset();
  };

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setElapsed(prev => {
          const newElapsed = prev + 0.08;
          if (newElapsed >= phaseDuration) {
            setPhase(currentPhase => {
              const nextPhase = (currentPhase + 1) % 4;
              if (nextPhase === 0) {
                setCycles(prevCycles => {
                  const newCycles = prevCycles + 1;
                  if (totalCycles > 0 && newCycles >= totalCycles) {
                    setRunning(false);
                    return newCycles;
                  }
                  return newCycles;
                });
              }
              return nextPhase;
            });
            return 0;
          }
          return newElapsed;
        });
      }, 80);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [running, phaseDuration, totalCycles]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (running) pause();
        else start();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [running]);

  const currentPhaseLabel = cycles > 0 && !running && totalCycles > 0 && cycles >= totalCycles ? "Finished" : phaseLabels[phase];

  return (
    <div className="flex gap-6 flex-wrap justify-center p-0 max-w-full mx-0">
      {/* Guided Pacer */}
      <div className={`${themes[currentTheme].card} rounded-2xl shadow-lg p-5 flex-1 min-w-80 max-w-2xl`}>
        <h2>Guided Pacer</h2>

        <div className="flex justify-center items-center my-5 mb-10">
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Outer circle (lighter color, subtle animation) */}
            <div 
              className={`absolute w-80 h-80 rounded-full shadow-inner`}
              style={{ 
                background: currentTheme === 'Blue' ? 'radial-gradient(circle, rgba(219, 234, 254, 0.8) 0%, rgba(147, 197, 253, 0.6) 100%)' :
                           currentTheme === 'Green' ? 'radial-gradient(circle, rgba(220, 252, 231, 0.8) 0%, rgba(167, 243, 208, 0.6) 100%)' :
                           'radial-gradient(circle, rgba(243, 232, 255, 0.8) 0%, rgba(196, 181, 253, 0.6) 100%)'
              }}
            >
              {/* Inner circle (darker color, main animation) */}
              <div 
                className={`absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center shadow-lg transition-transform duration-400 ease-out`}
                style={{ 
                  transform: `scale(${getCircleScale()})`,
                  background: currentTheme === 'Blue' ? 'radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(30, 64, 175, 1) 100%)' :
                             currentTheme === 'Green' ? 'radial-gradient(circle, rgba(34, 197, 94, 0.9) 0%, rgba(21, 128, 61, 1) 100%)' :
                             'radial-gradient(circle, rgba(147, 51, 234, 0.9) 0%, rgba(91, 33, 182, 1) 100%)'
                }}
              >
                <div className="text-center text-white">
                  <div className="text-xl mb-1.5">{currentPhaseLabel}</div>
                  <div className="text-3xl">{timeLeft}s</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center my-5 flex-wrap">
          <div>
            <label className="text-xs block mb-1 text-slate-600">Inhale (s)</label>
            <input 
              type="number" 
              value={customInputs.inhale}
              onChange={(e) => setCustomInputs(prev => ({ ...prev, inhale: Math.max(0, +e.target.value) }))}
              onBlur={updateCustomPattern}
              className="w-20 p-1.5 border border-slate-300 rounded text-center text-sm bg-slate-50"
              min="0"
            />
          </div>
          <div>
            <label className="text-xs block mb-1 text-slate-600">Hold (s)</label>
            <input 
              type="number" 
              value={customInputs.hold1}
              onChange={(e) => setCustomInputs(prev => ({ ...prev, hold1: Math.max(0, +e.target.value) }))}
              onBlur={updateCustomPattern}
              className="w-20 p-1.5 border border-slate-300 rounded text-center text-sm bg-slate-50"
              min="0"
            />
          </div>
          <div>
            <label className="text-xs block mb-1 text-slate-600">Exhale (s)</label>
            <input 
              type="number" 
              value={customInputs.exhale}
              onChange={(e) => setCustomInputs(prev => ({ ...prev, exhale: Math.max(0, +e.target.value) }))}
              onBlur={updateCustomPattern}
              className="w-20 p-1.5 border border-slate-300 rounded text-center text-sm bg-slate-50"
              min="0"
            />
          </div>
          <div>
            <label className="text-xs block mb-1 text-slate-600">Hold (s)</label>
            <input 
              type="number" 
              value={customInputs.hold2}
              onChange={(e) => setCustomInputs(prev => ({ ...prev, hold2: Math.max(0, +e.target.value) }))}
              onBlur={updateCustomPattern}
              className="w-20 p-1.5 border border-slate-300 rounded text-center text-sm bg-slate-50"
              min="0"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-center flex-wrap mb-5">
          {Object.entries(presets).map(([name, preset]) => (
            <button
              key={name}
              onClick={() => setPreset(name as keyof typeof presets)}
              className={`border-2 rounded-2xl py-1.5 px-3.5 text-sm cursor-pointer transition-colors ${
                activePreset === name 
                  ? themes[currentTheme].patternButtonActive
                  : `${themes[currentTheme].patternButton} hover:bg-blue-100`
              }`}
            >
              {name} ({preset.join('-')})
            </button>
          ))}
          <button
            onClick={() => setActivePreset("Custom")}
            className={`border-2 rounded-2xl py-1.5 px-3.5 text-sm cursor-pointer transition-colors ${
              activePreset === "Custom" 
                ? themes[currentTheme].patternButtonActive
                : `${themes[currentTheme].patternButton} hover:bg-blue-100`
            }`}
          >
            Custom
          </button>
        </div>

        <div className="flex gap-4 justify-center my-5 flex-wrap">
          <div>
            <label className="text-xs block mb-1 text-slate-600">Cycles</label>
            <input 
              type="number" 
              value={totalCycles}
              onChange={(e) => setTotalCycles(Math.max(0, +e.target.value))}
              className="w-20 p-1.5 border border-slate-300 rounded text-center text-sm bg-slate-50"
              min="0"
            />
          </div>
          <div>
            <label className="text-xs block mb-1 text-slate-600">Theme</label>
            <select 
              value={currentTheme}
              onChange={(e) => onThemeChange(e.target.value as keyof typeof themes)}
              className="w-20 p-1.5 border border-slate-300 rounded text-center text-sm bg-slate-50"
            >
              {Object.keys(themes).map(theme => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2.5 justify-center mb-2.5">
          <button 
            onClick={start}
            className={`${themes[currentTheme].button} border-none text-white rounded-lg py-2 px-4 text-sm cursor-pointer transition-colors flex items-center gap-2`}
          >
            <Play className="w-4 h-4" />
            Start
          </button>
          <button 
            onClick={pause}
            className={`${themes[currentTheme].button} border-none text-white rounded-lg py-2 px-4 text-sm cursor-pointer transition-colors flex items-center gap-2`}
          >
            <Pause className="w-4 h-4" />
            Pause
          </button>
          <button 
            onClick={reset}
            className={`${themes[currentTheme].button} border-none text-white rounded-lg py-2 px-4 text-sm cursor-pointer transition-colors flex items-center gap-2`}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <div className="flex justify-center gap-5 mt-1.5 flex-wrap">
          <p className="m-0 text-sm">
            Cycles: {cycles} / {totalCycles === 0 ? '∞' : totalCycles}
          </p>
          <p className="m-0 text-sm">Press Space to Start/Pause</p>
          <p className="m-0 text-xs text-slate-400">0 = Infinite cycles</p>
        </div>
      </div>

      {/* Techniques & Tips */}
      <div className={`${themes[currentTheme].card} rounded-2xl shadow-lg p-5 flex-1 min-w-80 max-w-2xl`}>
        <h2>Techniques & Tips</h2>

        <div className="border border-slate-200 rounded-xl p-3.5 mb-3.5 bg-slate-50">
          <h3 className="m-0 mb-1.5">Box Breathing (4-4-4-4)</h3>
          <p className="m-0 text-sm text-slate-600 leading-relaxed">
            Inhale for 4, hold for 4, exhale for 4, hold for 4.
            Balanced and steady. Excellent for stress regulation,
            focus, and calming nerves before exams, interviews, or presentations.
          </p>
        </div>

        <div className="border border-slate-200 rounded-xl p-3.5 mb-3.5 bg-slate-50">
          <h3 className="m-0 mb-1.5">4-7-8 Breathing</h3>
          <p className="m-0 text-sm text-slate-600 leading-relaxed">
            Inhale 4, hold 7, exhale 8.
            The long exhale activates the parasympathetic nervous system,
            lowering heart rate and preparing the body for deep rest.
            Best before sleep or during anxiety.
          </p>
        </div>

        <div className="border border-slate-200 rounded-xl p-3.5 mb-3.5 bg-slate-50">
          <h3 className="m-0 mb-1.5">Coherent Breathing (5-5)</h3>
          <p className="m-0 text-sm text-slate-600 leading-relaxed">
            Inhale 5, exhale 5.
            Creates a smooth rhythm that balances oxygen and carbon dioxide levels.
            Often used in meditation to build emotional resilience and reduce stress.
            Try for 5–10 minutes daily.
          </p>
        </div>

        <div className="border border-slate-200 rounded-xl p-3.5 mb-3.5 bg-slate-50">
          <h3 className="m-0 mb-1.5">Resonant Breathing (6-6)</h3>
          <p className="m-0 text-sm text-slate-600 leading-relaxed">
            Inhale 6, exhale 6.
            Studies show this rhythm can synchronize heart rate and breathing
            (heart rate variability training), supporting emotional stability.
            Ideal for long-term stress management.
          </p>
        </div>

        <div className="border border-slate-200 rounded-xl p-3.5 mb-3.5 bg-slate-50">
          <h3 className="m-0 mb-1.5">Alternate Nostril Breathing (Nadi Shodhana)</h3>
          <p className="m-0 text-sm text-slate-600 leading-relaxed">
            Breathe in through one nostril, out through the other, alternating sides.
            Traditionally used in yoga to balance energy channels and calm the mind.
            Helps reduce anxiety and improve focus.
          </p>
        </div>
      </div>
    </div>
  );
}