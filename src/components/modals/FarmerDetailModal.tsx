import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Sprout,
  Activity,
  Send,
  CheckCircle2,
  AlertTriangle,
  Radio,
} from 'lucide-react';
import { Farmer, Plot } from '../../types/agriculture';

interface FarmerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmer: Farmer | null;
  plots: Plot[];
}

export const FarmerDetailModal: React.FC<FarmerDetailModalProps> = ({
  isOpen,
  onClose,
  farmer,
  plots,
}) => {
  const [advisoryMessage, setAdvisoryMessage] = useState('');
  const [advisorySent, setAdvisorySent] = useState(false);

  if (!isOpen || !farmer) return null;

  const handleSendAdvisory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisoryMessage.trim()) return;
    setAdvisorySent(true);
    setTimeout(() => {
      setAdvisorySent(false);
      setAdvisoryMessage('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg border border-[#cbd5c5] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#143823] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2d6a4f] border border-[#52b788] flex items-center justify-center text-sm font-bold text-white shadow-xs">
              {farmer.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold">{farmer.name}</h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                    farmer.status === 'Optimal'
                      ? 'bg-emerald-800 text-emerald-200 border border-emerald-600'
                      : farmer.status === 'Irrigating'
                      ? 'bg-blue-900 text-blue-200 border border-blue-700'
                      : 'bg-amber-800 text-amber-200 border border-amber-600'
                  }`}
                >
                  {farmer.status}
                </span>
              </div>
              <p className="text-xs text-[#a7c5b2]">{farmer.farmName} • {farmer.region}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#a7c5b2] hover:text-white hover:bg-[#1b4332]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs text-[#2b3a2f]">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#f6f7f4] border border-[#e1e6dc] p-3 rounded-md">
              <span className="text-[10px] font-semibold uppercase text-[#5f7464] block">Total Land</span>
              <span className="text-lg font-bold text-[#143823]">{farmer.totalAcres} Acres</span>
            </div>
            <div className="bg-[#f6f7f4] border border-[#e1e6dc] p-3 rounded-md">
              <span className="text-[10px] font-semibold uppercase text-[#5f7464] block">Primary Crop</span>
              <span className="text-lg font-bold text-[#143823]">{farmer.primaryCrop}</span>
            </div>
            <div className="bg-[#f6f7f4] border border-[#e1e6dc] p-3 rounded-md">
              <span className="text-[10px] font-semibold uppercase text-[#5f7464] block">IoT Uptime</span>
              <span className="text-lg font-bold text-[#2d6a4f]">{farmer.sensorUptime}%</span>
            </div>
            <div className="bg-[#f6f7f4] border border-[#e1e6dc] p-3 rounded-md">
              <span className="text-[10px] font-semibold uppercase text-[#5f7464] block">Soil Health Index</span>
              <span className="text-lg font-bold text-[#143823]">{farmer.soilHealthIndex} / 100</span>
            </div>
          </div>

          {/* Contact & Gateway Coordinates */}
          <div className="bg-[#fbfbfa] p-4 rounded-md border border-[#e2e6dd] space-y-2">
            <h4 className="text-xs font-bold text-[#143823] uppercase tracking-wider mb-2">
              Operator & Farm Telemetry Contact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-[#2d6a4f]" />
                <span>{farmer.contact}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-[#2d6a4f]" />
                <span className="truncate">{farmer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Radio className="w-4 h-4 text-[#2d6a4f]" />
                <span>Sync: {farmer.lastSync}</span>
              </div>
            </div>
          </div>

          {/* Managed Plots Snapshot */}
          <div>
            <h4 className="text-xs font-bold text-[#143823] uppercase tracking-wider mb-2">
              Active Monitored Plots ({plots.length})
            </h4>
            <div className="border border-[#e1e6dc] rounded-md overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f4f6f1] text-[#5f7464] text-[11px] font-semibold border-b border-[#e1e6dc]">
                  <tr>
                    <th className="py-2 px-3">Plot Name</th>
                    <th className="py-2 px-3">Crop / Variety</th>
                    <th className="py-2 px-3 text-right">Acres</th>
                    <th className="py-2 px-3 text-center">Root Moisture</th>
                    <th className="py-2 px-3 text-center">Valve Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f2eb]">
                  {plots.map((p) => (
                    <tr key={p.id} className="hover:bg-[#fafbf9]">
                      <td className="py-2.5 px-3 font-semibold text-[#143823]">{p.name}</td>
                      <td className="py-2.5 px-3 text-gray-600">{p.crop}</td>
                      <td className="py-2.5 px-3 text-right font-medium">{p.acres}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block font-semibold px-2 py-0.5 rounded text-[11px] ${
                            p.telemetry.moistureRoot < p.telemetry.optimalMoistureMin
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {p.telemetry.moistureRoot}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block font-semibold px-2 py-0.5 rounded text-[10px] ${
                            p.valveOpen
                              ? 'bg-blue-100 text-blue-800 animate-pulse'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {p.valveOpen ? 'Irrigating' : 'Standby'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Send Agronomic Advisory */}
          <div className="bg-[#f4f6f1] p-4 rounded-md border border-[#e2e6dd]">
            <h4 className="text-xs font-bold text-[#143823] uppercase tracking-wider mb-1">
              Dispatch Agronomic Advisory
            </h4>
            <p className="text-[11px] text-gray-600 mb-2">
              Send an instant operational directive or soil amendment recommendation directly to this farmer’s mobile app.
            </p>
            <form onSubmit={handleSendAdvisory} className="space-y-2">
              <textarea
                value={advisoryMessage}
                onChange={(e) => setAdvisoryMessage(e.target.value)}
                placeholder="e.g., Regional radar indicates heavy precipitation tonight; delay scheduled fertilizer broadcast until Wednesday."
                rows={2}
                className="w-full p-2.5 bg-white border border-[#d1d8cc] rounded-md text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
              />
              <div className="flex items-center justify-between">
                {advisorySent ? (
                  <span className="text-xs font-medium text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Advisory dispatched to {farmer.name} via SMS & Portal!
                  </span>
                ) : (
                  <span className="text-[11px] text-gray-500">Logged to official regional agricultural record.</span>
                )}
                <button
                  type="submit"
                  disabled={!advisoryMessage.trim()}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#143823] hover:bg-[#1b4332] disabled:opacity-50 text-white rounded-md text-xs font-semibold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Advisory</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#f6f7f4] border-t border-[#e1e6dc] flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-xs font-semibold text-[#143823] bg-white border border-[#d1d8cc] hover:bg-[#f0f2eb]"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
