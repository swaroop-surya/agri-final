import React, { useState } from 'react';
import { Droplets, Clock, X, AlertCircle, CheckCircle2, Gauge } from 'lucide-react';
import { Plot } from '../../types/agriculture';

interface IrrigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  plots: Plot[];
  initialPlotId?: string;
  onConfirmStart: (plotId: string, durationMinutes: number, targetMoisture: number) => void;
}

export const IrrigationModal: React.FC<IrrigationModalProps> = ({
  isOpen,
  onClose,
  plots,
  initialPlotId,
  onConfirmStart,
}) => {
  const [selectedPlotId, setSelectedPlotId] = useState<string>(initialPlotId || plots[0]?.id || '');
  const [duration, setDuration] = useState<number>(45);
  const [targetMoisture, setTargetMoisture] = useState<number>(45);
  const [flowPreset, setFlowPreset] = useState<'Standard Drip (280 L/min)' | 'High Volume Pivot (450 L/min)' | 'Precision Pulse (180 L/min)'>('Standard Drip (280 L/min)');

  if (!isOpen) return null;

  const currentPlot = plots.find((p) => p.id === selectedPlotId) || plots[0];

  const handleStart = () => {
    onConfirmStart(selectedPlotId, duration, targetMoisture);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg border border-[#cbd5c5] shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#143823] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#2d6a4f]">
              <Droplets className="w-5 h-5 text-[#d8f3dc]" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Initiate Precision Irrigation Cycle</h3>
              <p className="text-xs text-[#a7c5b2]">Automated Solenoid Valve Control System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#a7c5b2] hover:text-white hover:bg-[#1b4332]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs text-[#2b3a2f]">
          {/* Plot Selection */}
          <div>
            <label className="block font-semibold uppercase text-[10px] text-[#5f7464] tracking-wider mb-1">
              Select Field / Plot
            </label>
            <select
              value={selectedPlotId}
              onChange={(e) => setSelectedPlotId(e.target.value)}
              className="w-full px-3 py-2 bg-[#f8f9f6] border border-[#d1d8cc] rounded-md text-xs font-medium text-[#143823] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
            >
              {plots.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.crop} ({p.acres} Acres)
                </option>
              ))}
            </select>
          </div>

          {/* Current telemetry check */}
          {currentPlot && (
            <div className="bg-[#f0f4ee] p-3 rounded-md border border-[#d8e0d4] flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-semibold text-[#5f7464]">Current Soil Moisture</div>
                <div className="text-sm font-bold text-[#143823]">
                  {currentPlot.telemetry.moistureRoot}% Root Zone
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase font-semibold text-[#5f7464]">Optimal Range</div>
                <div className="text-xs font-medium text-[#2d6a4f]">
                  {currentPlot.telemetry.optimalMoistureMin}% – {currentPlot.telemetry.optimalMoistureMax}%
                </div>
              </div>
            </div>
          )}

          {/* Duration Selector */}
          <div>
            <label className="block font-semibold uppercase text-[10px] text-[#5f7464] tracking-wider mb-1">
              Irrigation Run Duration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDuration(mins)}
                  className={`py-2 px-2 rounded border text-center font-semibold transition-all ${
                    duration === mins
                      ? 'bg-[#143823] text-white border-[#143823] shadow-xs'
                      : 'bg-[#fafbf9] text-[#2b3a2f] border-[#d8e0d4] hover:bg-[#f0f4ee]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 mx-auto mb-1 opacity-80" />
                  <span>{mins} mins</span>
                </button>
              ))}
            </div>
          </div>

          {/* Target Moisture Cutoff */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold uppercase text-[10px] text-[#5f7464] tracking-wider">
                Automated Cutoff Threshold
              </label>
              <span className="font-bold text-[#2d6a4f]">{targetMoisture}% Moisture</span>
            </div>
            <input
              type="range"
              min="30"
              max="55"
              step="1"
              value={targetMoisture}
              onChange={(e) => setTargetMoisture(Number(e.target.value))}
              className="w-full accent-[#2d6a4f] cursor-pointer"
            />
            <p className="text-[10px] text-[#798e7e] mt-1">
              Smart sensors will automatically close the solenoid valve when root-zone moisture reaches {targetMoisture}%.
            </p>
          </div>

          {/* Flow rate configuration */}
          <div>
            <label className="block font-semibold uppercase text-[10px] text-[#5f7464] tracking-wider mb-1">
              Pump Delivery Preset
            </label>
            <select
              value={flowPreset}
              onChange={(e) => setFlowPreset(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#f8f9f6] border border-[#d1d8cc] rounded-md text-xs font-medium text-[#143823] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
            >
              <option value="Standard Drip (280 L/min)">Standard Drip (280 L/min) - High Efficiency</option>
              <option value="High Volume Pivot (450 L/min)">High Volume Pivot (450 L/min) - Full Field Coverage</option>
              <option value="Precision Pulse (180 L/min)">Precision Pulse (180 L/min) - Seedling / Targeted</option>
            </select>
          </div>

          <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2 text-[11px]">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
            <span>
              Weather telemetry reports 10% precipitation chance. Auto-evapotranspiration compensation is active.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#f6f7f4] border-t border-[#e1e6dc] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#5f7464] hover:text-[#143823] hover:bg-[#e2e6dd]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleStart}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Start Irrigation ({duration} min)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
