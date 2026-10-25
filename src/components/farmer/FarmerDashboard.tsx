import React, { useState } from 'react';
import {
  Layers,
  Droplets,
  CloudSun,
  ScanLine,
  ClipboardList,
  Wheat,
  Clock,
  CheckCircle2,
  ChevronDown,
  Plus,
  Wind,
  CloudRain,
  Info,
  Check,
} from 'lucide-react';
import {
  Plot,
  FieldTask,
  HarvestRecord,
  CropDiagnosticSample,
} from '../../types/agriculture';
import { TelemetryLineChart } from '../common/TelemetryLineChart';
import {
  WEATHER_FORECAST,
  INITIAL_HARVEST_LOGS,
  CROP_DIAGNOSTIC_SAMPLES,
  SOIL_TELEMETRY_SERIES_24H,
} from '../../data/mockAgricultureData';

interface FarmerDashboardProps {
  activeTab: string;
  plots: Plot[];
  onTogglePlotValve: (plotId: string) => void;
  onOpenIrrigationModal: (plotId: string) => void;
  onOpenNewTaskModal: () => void;
  tasks: FieldTask[];
  onToggleTaskComplete: (taskId: string) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  activeTab,
  plots,
  onTogglePlotValve,
  onOpenIrrigationModal,
  onOpenNewTaskModal,
  tasks,
  onToggleTaskComplete,
}) => {
  const [selectedPlotId, setSelectedPlotId] = useState<string>(plots[0]?.id || 'plot-14');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<CropDiagnosticSample>(
    CROP_DIAGNOSTIC_SAMPLES[0]
  );
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [harvestLogs, setHarvestLogs] = useState<HarvestRecord[]>(INITIAL_HARVEST_LOGS);
  const [newHarvestYield, setNewHarvestYield] = useState<string>('');
  const [newHarvestMoisture, setNewHarvestMoisture] = useState<string>('');
  const [showAddHarvestSuccess, setShowAddHarvestSuccess] = useState<boolean>(false);

  const activePlot = plots.find((p) => p.id === selectedPlotId) || plots[0];

  const handleSimulateScan = (sample: CropDiagnosticSample) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedDiagnostic(sample);
      setIsScanning(false);
    }, 450);
  };

  const handleRecordHarvest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHarvestYield || !newHarvestMoisture) return;

    const newRecord: HarvestRecord = {
      id: `hrv-${Date.now()}`,
      plotName: activePlot.name,
      crop: activePlot.crop,
      harvestDate: new Date().toISOString().split('T')[0],
      yieldBushelsPerAcre: parseFloat(newHarvestYield),
      totalTons: parseFloat(newHarvestYield) * (activePlot.acres * 0.025),
      grainMoisturePercent: parseFloat(newHarvestMoisture),
      destinationSilo: 'Grain Bin #2 (South Elevator)',
      qualityGrade: 'Grade 1 (Premium)',
    };

    setHarvestLogs([newRecord, ...harvestLogs]);
    setNewHarvestYield('');
    setNewHarvestMoisture('');
    setShowAddHarvestSuccess(true);
    setTimeout(() => setShowAddHarvestSuccess(false), 2500);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Plot Selector & Agronomic Metadata Bar */}
      <div className="bg-white border border-[#E3E9E3] rounded-lg p-3.5 sm:p-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          {/* Active Field Selection */}
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-md bg-[#123D2B] text-[#DDEDE1] shrink-0">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-[#64746A] tracking-wider">
                  Active Field / Parcel
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#216847]" />
                <span className="text-[10px] text-[#216847] font-semibold">Live Telemetry</span>
              </div>

              {/* Custom styled select box */}
              <div className="relative mt-1 inline-block max-w-full">
                <select
                  value={selectedPlotId}
                  onChange={(e) => setSelectedPlotId(e.target.value)}
                  className="w-full text-sm sm:text-base font-bold text-[#123D2B] bg-[#F7F8F3] border border-[#CBD5CD] rounded-md pl-2.5 pr-8 py-1 cursor-pointer appearance-none focus:outline-none focus:ring-1 focus:ring-[#216847]"
                >
                  {plots.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.crop} — {p.acres} ac)
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#64746A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Metadata chips for active plot - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#26372E]">
            <div className="px-2.5 py-1.5 rounded-md bg-[#EFF6F0] border border-[#E3E9E3]">
              <span className="text-[9px] text-[#64746A] block uppercase font-medium">Variety</span>
              <span className="font-semibold text-[#123D2B] truncate block">{activePlot.variety}</span>
            </div>
            <div className="px-2.5 py-1.5 rounded-md bg-[#EFF6F0] border border-[#E3E9E3]">
              <span className="text-[9px] text-[#64746A] block uppercase font-medium">Growth Stage</span>
              <span className="font-semibold text-[#123D2B] truncate block">{activePlot.growthStage}</span>
            </div>
            <div className="px-2.5 py-1.5 rounded-md bg-[#EFF6F0] border border-[#E3E9E3]">
              <span className="text-[9px] text-[#64746A] block uppercase font-medium">NDVI Health</span>
              <span className="font-bold text-[#216847] block">{activePlot.ndviHealthScore} / 1.0</span>
            </div>
            <div className="px-2.5 py-1.5 rounded-md bg-[#EFF6F0] border border-[#E3E9E3]">
              <span className="text-[9px] text-[#64746A] block uppercase font-medium">Watershed Zone</span>
              <span className="font-semibold text-[#26372E] truncate block">{activePlot.zone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Row: Soil Telemetry Command + Smart Irrigation Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Soil Telemetry Station (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E3E9E3] rounded-lg p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EFF6F0] gap-1">
            <div>
              <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wide">
                Soil Profile Telemetry (3-Depth Monitoring)
              </h2>
              <p className="text-xs text-[#64746A]">
                Continuous capacitively-coupled frequency domain reflectometry (FDR)
              </p>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E4F4E8] text-[#216847] border border-[#DDEDE1] self-start sm:self-auto">
              Updated {activePlot.telemetry.lastUpdated}
            </span>
          </div>

          {/* 3-Depth Moisture Bars with exact percentages */}
          <div className="space-y-3.5">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#123D2B]">Topsoil Layer (0 - 10cm)</span>
                <span className="font-bold text-[#123D2B]">{activePlot.telemetry.moistureTop}% Moisture</span>
              </div>
              <div className="w-full bg-[#EFF6F0] h-2.5 rounded-full overflow-hidden relative">
                <div
                  className="bg-[#123D2B] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, activePlot.telemetry.moistureTop))}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#64746A]">
                <span>Wilting: 15%</span>
                <span className="text-[#216847] font-semibold">Optimal: 30% - 50%</span>
                <span>Saturation: 65%</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#123D2B]">Active Root Zone (10 - 30cm)</span>
                <span className="font-bold text-[#216847]">{activePlot.telemetry.moistureRoot}% Moisture</span>
              </div>
              <div className="w-full bg-[#EFF6F0] h-3 rounded-full overflow-hidden relative">
                <div
                  className="bg-[#216847] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, activePlot.telemetry.moistureRoot))}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#64746A]">
                <span>Threshold: 28%</span>
                <span className="text-[#216847] font-semibold">Active Uptake Window</span>
                <span>Saturation: 58%</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#123D2B]">Deep Subsoil (30 - 60cm)</span>
                <span className="font-bold text-[#123D2B]">{activePlot.telemetry.moistureDeep}% Moisture</span>
              </div>
              <div className="w-full bg-[#EFF6F0] h-2.5 rounded-full overflow-hidden relative">
                <div
                  className="bg-[#18573A] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, activePlot.telemetry.moistureDeep))}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#64746A]">
                <span>Subsoil Hydration: Stable</span>
                <span>Hydraulic Gradient: Balanced</span>
              </div>
            </div>
          </div>

          {/* Soil Chemistry Grid (NPK, pH, Temp, EC) */}
          <div className="pt-2 border-t border-[#EFF6F0] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
            <div className="bg-[#F7F8F3] border border-[#E3E9E3] p-2 rounded-md">
              <span className="text-[9px] font-semibold uppercase text-[#64746A] block">Nitrogen (N)</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm sm:text-base font-bold text-[#123D2B]">{activePlot.telemetry.nitrogen}</span>
                <span className="text-[9px] text-[#64746A]">ppm</span>
              </div>
              <span className="text-[9px] text-[#216847] font-semibold">Adequate</span>
            </div>

            <div className="bg-[#F7F8F3] border border-[#E3E9E3] p-2 rounded-md">
              <span className="text-[9px] font-semibold uppercase text-[#64746A] block">Phosphorus</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm sm:text-base font-bold text-[#123D2B]">{activePlot.telemetry.phosphorus}</span>
                <span className="text-[9px] text-[#64746A]">ppm</span>
              </div>
              <span className="text-[9px] text-[#216847] font-semibold">Optimal</span>
            </div>

            <div className="bg-[#F7F8F3] border border-[#E3E9E3] p-2 rounded-md">
              <span className="text-[9px] font-semibold uppercase text-[#64746A] block">Potassium</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm sm:text-base font-bold text-[#123D2B]">{activePlot.telemetry.potassium}</span>
                <span className="text-[9px] text-[#64746A]">ppm</span>
              </div>
              <span className="text-[9px] text-[#216847] font-semibold">High</span>
            </div>

            <div className="bg-[#F7F8F3] border border-[#E3E9E3] p-2 rounded-md">
              <span className="text-[9px] font-semibold uppercase text-[#64746A] block">Soil pH</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm sm:text-base font-bold text-[#123D2B]">{activePlot.telemetry.ph}</span>
              </div>
              <span className="text-[9px] text-[#64746A] font-medium">Slightly Acidic</span>
            </div>

            <div className="bg-[#F7F8F3] border border-[#E3E9E3] p-2 rounded-md">
              <span className="text-[9px] font-semibold uppercase text-[#64746A] block">Soil Temp</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm sm:text-base font-bold text-[#123D2B]">{activePlot.telemetry.temperatureC}°</span>
                <span className="text-[9px] text-[#64746A]">C</span>
              </div>
              <span className="text-[9px] text-[#216847] font-semibold">Active</span>
            </div>

            <div className="bg-[#F7F8F3] border border-[#E3E9E3] p-2 rounded-md">
              <span className="text-[9px] font-semibold uppercase text-[#64746A] block">Conductivity</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm sm:text-base font-bold text-[#123D2B]">
                  {activePlot.telemetry.electricalConductivity}
                </span>
                <span className="text-[9px] text-[#64746A]">dS/m</span>
              </div>
              <span className="text-[9px] text-[#64746A] font-medium">Normal</span>
            </div>
          </div>
        </div>

        {/* Smart Irrigation Controller (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E3E9E3] rounded-lg p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFF6F0]">
              <div>
                <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wide">
                  Smart Irrigation Controller
                </h2>
                <p className="text-xs text-[#64746A]">Solenoid valve telemetry & flow delivery</p>
              </div>
              <Droplets className="w-4 h-4 text-[#285EA8]" />
            </div>

            {/* Valve Status Banner */}
            <div
              className={`p-3.5 sm:p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                activePlot.valveOpen
                  ? 'bg-[#E4F4E8] border-[#DDEDE1] text-[#123D2B]'
                  : 'bg-[#F7F8F3] border-[#E3E9E3] text-[#26372E]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
                    activePlot.valveOpen
                      ? 'bg-[#216847] text-white animate-pulse'
                      : 'bg-[#EDF1ED] text-[#64746A]'
                  }`}
                >
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#123D2B]">
                    {activePlot.valveOpen ? 'Valve OPEN (Irrigating)' : 'Valve CLOSED (Standby)'}
                  </div>
                  <div className="text-[11px] text-[#64746A]">
                    {activePlot.valveOpen
                      ? `Flowing at ${activePlot.flowRateLpm || 320} L/min`
                      : 'Next automated cycle: 2h 15m'}
                  </div>
                </div>
              </div>

              {/* Instant Manual Valve Toggle Button */}
              <button
                type="button"
                onClick={() => onTogglePlotValve(activePlot.id)}
                className={`w-full sm:w-auto px-3.5 py-1.5 rounded-md text-xs font-semibold shadow-xs transition-colors text-center cursor-pointer ${
                  activePlot.valveOpen
                    ? 'bg-[#B42318] hover:bg-[#8A5A00] text-white'
                    : 'bg-[#216847] hover:bg-[#18573A] text-white'
                }`}
              >
                {activePlot.valveOpen ? 'Shut Valve' : 'Open Valve'}
              </button>
            </div>

            {/* Water metrics summary */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-[#F7F8F3] p-3 rounded-md border border-[#E3E9E3]">
                <span className="text-[10px] uppercase font-bold text-[#64746A] block">Delivered Today</span>
                <span className="text-sm sm:text-base font-bold text-[#123D2B]">
                  {activePlot.waterUsedTodayLiters.toLocaleString()} L
                </span>
                <span className="text-[10px] text-[#64746A] block">Drip manifold delivery</span>
              </div>
              <div className="bg-[#F7F8F3] p-3 rounded-md border border-[#E3E9E3]">
                <span className="text-[10px] uppercase font-bold text-[#64746A] block">Smart Efficiency</span>
                <span className="text-sm sm:text-base font-bold text-[#216847]">+22% Saved</span>
                <span className="text-[10px] text-[#64746A] block">ET0 cutoff engaged</span>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 bg-[#EFF6F0] rounded-md border border-[#DDEDE1] text-[11px] text-[#26372E] flex items-start gap-2">
              <Info className="w-4 h-4 text-[#216847] shrink-0 mt-0.5" />
              <span>
                Automated shutoff trigger is engaged at <strong>{activePlot.telemetry.optimalMoistureMax}%</strong>{' '}
                root moisture to prevent nutrient leaching.
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EFF6F0]">
            <button
              onClick={() => onOpenIrrigationModal(activePlot.id)}
              className="w-full py-2 bg-[#216847] hover:bg-[#18573A] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-[#DDEDE1]" />
              <span>Schedule Precision Irrigation Cycle</span>
            </button>
          </div>
        </div>
      </div>

      {/* 24h Moisture Chart */}
      <TelemetryLineChart
        data={SOIL_TELEMETRY_SERIES_24H}
        title={`${activePlot.name} — Moisture & Thermal Profile`}
        subtitle="Live automated readings logged by in-ground LoRa sensor node S-104"
        minOptimal={activePlot.telemetry.optimalMoistureMin}
        maxOptimal={activePlot.telemetry.optimalMoistureMax}
      />

      {/* 7-Day Agricultural Weather & Evapotranspiration Station */}
      <div className="bg-white border border-[#E3E9E3] rounded-lg p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EFF6F0] gap-1">
          <div>
            <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wide">
              7-Day Agricultural Micro-Climate & Evapotranspiration (ET0)
            </h2>
            <p className="text-xs text-[#64746A]">
              High-resolution field weather station telemetry used for crop water deficit modeling
            </p>
          </div>
          <span className="text-xs font-semibold text-[#216847] flex items-center gap-1.5 self-start sm:self-auto">
            <CloudSun className="w-4 h-4" /> Station #WS-04 Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5">
          {WEATHER_FORECAST.map((w, index) => (
            <div
              key={w.day}
              className={`p-2.5 sm:p-3 rounded-lg border text-xs text-center transition-all ${
                index === 0
                  ? 'bg-[#EFF6F0] border-[#216847] ring-1 ring-[#216847]/30'
                  : 'bg-[#F7F8F3] border-[#E3E9E3] hover:bg-[#EFF6F0]'
              }`}
            >
              <div className="font-bold text-[#123D2B] text-xs">{w.day}</div>
              <div className="text-[10px] text-[#64746A] mb-1.5">{w.date}</div>

              <div className="my-1.5 flex justify-center">
                {w.condition === 'Sunny' ? (
                  <CloudSun className="w-5 h-5 sm:w-6 sm:h-6 text-[#D5A441]" />
                ) : w.condition === 'Rain' || w.condition === 'Scattered Showers' ? (
                  <CloudRain className="w-5 h-5 sm:w-6 sm:h-6 text-[#285EA8]" />
                ) : (
                  <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-[#216847]" />
                )}
              </div>

              <div className="text-xs sm:text-sm font-bold text-[#123D2B]">
                {w.highC}° <span className="text-[11px] font-normal text-[#64746A]">/ {w.lowC}°</span>
              </div>

              <div className="mt-2 pt-2 border-t border-[#E3E9E3] space-y-1 text-[10px] text-left">
                <div className="flex justify-between">
                  <span className="text-[#64746A]">Rain Prob:</span>
                  <span className={`font-semibold ${w.precipChance > 50 ? 'text-[#285EA8]' : 'text-[#26372E]'}`}>
                    {w.precipChance}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64746A]">Precip:</span>
                  <span className="font-semibold text-[#26372E]">{w.rainfallMm} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64746A]">ET0:</span>
                  <span className="font-bold text-[#216847]">{w.et0Mm} mm/d</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row: Crop Health Diagnostic Studio + Agronomic Field Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Crop Diagnostic Studio (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E3E9E3] rounded-lg p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EFF6F0]">
            <div>
              <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wide">
                Foliar Canopy Health & Pest Diagnostics
              </h2>
              <p className="text-xs text-[#64746A]">
                Multispectral leaf vision model with agronomic treatment guidance
              </p>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#EFF6F0] text-[#123D2B] border border-[#E3E9E3]">
              Canopy AI v2.4
            </span>
          </div>

          {/* Leaf Sample Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-[#64746A] shrink-0">
              Sample Leaves:
            </span>
            {CROP_DIAGNOSTIC_SAMPLES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSimulateScan(sample)}
                className={`px-2.5 py-1 text-xs rounded border shrink-0 transition-colors cursor-pointer ${
                  selectedDiagnostic.id === sample.id
                    ? 'bg-[#216847] text-white border-[#216847] font-semibold shadow-xs'
                    : 'bg-[#F7F8F3] text-[#26372E] border-[#CBD5CD] hover:bg-[#EFF6F0]'
                }`}
              >
                {sample.diagnosis.split('(')[0].trim()}
              </button>
            ))}
          </div>

          {/* Diagnostic Display Area */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-[#F7F8F3] p-3.5 sm:p-4 rounded-lg border border-[#E3E9E3]">
            <div className="sm:col-span-5 relative rounded-md overflow-hidden border border-[#CBD5CD] h-44 sm:h-auto min-h-[160px] bg-black">
              <img
                src={selectedDiagnostic.imageUrl}
                alt={selectedDiagnostic.diagnosis}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-white text-[9px] font-semibold">
                Multispectral Visual
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#216847] text-white text-[9px] font-bold">
                {selectedDiagnostic.confidence}% Match
              </div>
            </div>

            <div className="sm:col-span-7 space-y-2 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#123D2B]">{selectedDiagnostic.diagnosis}</h3>
                  <p className="text-[10px] text-[#64746A]">{selectedDiagnostic.crop} • Canopy Analysis</p>
                </div>
                <span
                  className={`text-[9px] font-semibold px-2 py-0.5 rounded uppercase shrink-0 ${
                    selectedDiagnostic.severity === 'None (Healthy)'
                      ? 'bg-[#E4F4E8] text-[#216847] border border-[#DDEDE1]'
                      : selectedDiagnostic.severity === 'Mild'
                      ? 'bg-[#FFF3D8] text-[#8A5A00] border border-[#FADF9E]'
                      : 'bg-[#FCE8E6] text-[#B42318] border border-[#F5C2BF]'
                  }`}
                >
                  {selectedDiagnostic.severity}
                </span>
              </div>

              <div>
                <span className="text-[9px] font-bold uppercase text-[#64746A] block">
                  Identified Symptoms:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-[#26372E] mt-0.5">
                  {selectedDiagnostic.symptoms.map((sym, i) => (
                    <li key={i}>{sym}</li>
                  ))}
                </ul>
              </div>

              <div className="p-2 sm:p-2.5 bg-white rounded border border-[#E3E9E3] space-y-0.5">
                <span className="text-[9px] font-bold uppercase text-[#216847] block">
                  Agronomic Protocol:
                </span>
                <p className="text-[11px] text-[#26372E] leading-relaxed">
                  {selectedDiagnostic.treatment}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agronomic Field Tasks Planner (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E3E9E3] rounded-lg p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFF6F0]">
              <div>
                <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wide">
                  Agronomic Field Directives
                </h2>
                <p className="text-xs text-[#64746A]">Work orders, fertilization passes, scouting</p>
              </div>
              <button
                onClick={onOpenNewTaskModal}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#216847] hover:bg-[#18573A] text-white text-xs font-semibold transition-colors shrink-0 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Task</span>
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleTaskComplete(task.id)}
                  className={`p-2.5 sm:p-3 rounded-md border cursor-pointer transition-all ${
                    task.completed
                      ? 'bg-[#F7F8F3] border-[#E3E9E3] opacity-60'
                      : 'bg-white border-[#E3E9E3] hover:border-[#216847]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggleTaskComplete(task.id)}
                      className="mt-0.5 accent-[#216847] cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`font-semibold text-xs truncate ${
                            task.completed ? 'line-through text-[#64746A]' : 'text-[#123D2B]'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase shrink-0 ${
                            task.priority === 'High'
                              ? 'bg-[#FFF3D8] text-[#8A5A00]'
                              : 'bg-[#EFF6F0] text-[#216847]'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#64746A] mt-1 truncate">
                        <span>{task.plotName}</span>
                        <span>•</span>
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#EFF6F0] text-xs text-[#64746A] flex justify-between items-center">
            <span>{tasks.filter((t) => t.completed).length} of {tasks.length} Completed</span>
            <span className="font-semibold text-[#216847]">Season Log Synced</span>
          </div>
        </div>
      </div>

      {/* Harvest Log & Grain Moisture Silo Entry */}
      <div className="bg-white border border-[#E3E9E3] rounded-lg p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EFF6F0] gap-1">
          <div>
            <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wide">
              Harvest Batches & Grain Silo Moisture Ledger
            </h2>
            <p className="text-xs text-[#64746A]">
              Recorded crop yield batches, combine scale weights, and bin moisture verification
            </p>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EFF6F0] text-[#123D2B] border border-[#E3E9E3] self-start sm:self-auto">
            Grain Inventory
          </span>
        </div>

        {/* Quick Harvest Record Form */}
        <form
          onSubmit={handleRecordHarvest}
          className="bg-[#F7F8F3] p-3 sm:p-3.5 rounded-md border border-[#E3E9E3] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs items-end"
        >
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#64746A] mb-1">
              Field / Plot
            </label>
            <input
              type="text"
              readOnly
              value={activePlot.name}
              className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5CD] rounded text-[#26372E] font-medium truncate"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-[#64746A] mb-1">
              Yield (bu/ac)
            </label>
            <input
              type="number"
              step="0.1"
              required
              placeholder="e.g. 184.2"
              value={newHarvestYield}
              onChange={(e) => setNewHarvestYield(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5CD] rounded font-medium focus:ring-1 focus:ring-[#216847]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-[#64746A] mb-1">
              Grain Moisture %
            </label>
            <input
              type="number"
              step="0.1"
              required
              placeholder="e.g. 14.5"
              value={newHarvestMoisture}
              onChange={(e) => setNewHarvestMoisture(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5CD] rounded font-medium focus:ring-1 focus:ring-[#216847]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="w-full py-1.5 bg-[#216847] hover:bg-[#18573A] text-white font-semibold rounded shadow-xs transition-colors cursor-pointer"
            >
              Record Batch
            </button>
          </div>

          {showAddHarvestSuccess && (
            <div className="sm:col-span-4 text-[#216847] font-semibold flex items-center gap-1 text-xs">
              <CheckCircle2 className="w-4 h-4" /> Batch recorded to inventory!
            </div>
          )}
        </form>

        {/* Harvest Table */}
        <div className="overflow-x-auto border border-[#E3E9E3] rounded-md">
          <table className="w-full text-left text-xs border-collapse min-w-[650px]">
            <thead className="bg-[#EFF6F0] text-[#64746A] text-[11px] font-semibold border-b border-[#E3E9E3] uppercase">
              <tr>
                <th className="py-2.5 px-3.5">Field</th>
                <th className="py-2.5 px-3.5">Crop</th>
                <th className="py-2.5 px-3.5">Harvest Date</th>
                <th className="py-2.5 px-3.5 text-right">Yield (bu/ac)</th>
                <th className="py-2.5 px-3.5 text-right">Total Weight</th>
                <th className="py-2.5 px-3.5 text-center">Grain Moisture</th>
                <th className="py-2.5 px-3.5">Storage Silo Destination</th>
                <th className="py-2.5 px-3.5 text-center">Quality Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFF6F0]">
              {harvestLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F7F8F3]">
                  <td className="py-2.5 px-3.5 font-semibold text-[#123D2B]">{log.plotName}</td>
                  <td className="py-2.5 px-3.5 text-[#26372E]">{log.crop}</td>
                  <td className="py-2.5 px-3.5 text-[#64746A]">{log.harvestDate}</td>
                  <td className="py-2.5 px-3.5 text-right font-bold text-[#123D2B]">
                    {log.yieldBushelsPerAcre}
                  </td>
                  <td className="py-2.5 px-3.5 text-right font-medium text-[#26372E]">
                    {log.totalTons.toFixed(1)} Tons
                  </td>
                  <td className="py-2.5 px-3.5 text-center">
                    <span
                      className={`inline-block font-semibold px-2 py-0.5 rounded text-[10px] ${
                        log.grainMoisturePercent <= 14.5
                          ? 'bg-[#E4F4E8] text-[#216847] border border-[#DDEDE1]'
                          : 'bg-[#FFF3D8] text-[#8A5A00] border border-[#FADF9E]'
                      }`}
                    >
                      {log.grainMoisturePercent}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3.5 text-[#64746A]">{log.destinationSilo}</td>
                  <td className="py-2.5 px-3.5 text-center">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#EFF6F0] text-[#26372E] border border-[#E3E9E3]">
                      {log.qualityGrade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
