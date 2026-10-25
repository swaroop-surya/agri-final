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
      <div className="bg-[#FFFFFF] rounded-lg border border-[#E3E9E3] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#123D2B] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#216847] border border-[#DDEDE1]/30 flex items-center justify-center text-sm font-bold text-white shadow-xs">
              {farmer.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold">{farmer.name}</h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                    farmer.status === 'Optimal'
                      ? 'bg-[#E4F4E8] text-[#216847] border border-[#216847]/30'
                      : farmer.status === 'Irrigating'
                      ? 'bg-[#E7F0FC] text-[#285EA8] border border-[#285EA8]/30'
                      : 'bg-[#FFF3D8] text-[#8A5A00] border border-[#D5A441]/40'
                  }`}
                >
                  {farmer.status}
                </span>
              </div>
              <p className="text-xs text-[#DDEDE1]/80">{farmer.farmName} • {farmer.region}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#DDEDE1]/70 hover:text-white hover:bg-[#0C3021]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs text-[#26372E]">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#F7F8F3] border border-[#E3E9E3] p-3 rounded-md">
              <span className="text-[10px] font-semibold uppercase text-[#64746A] block">Total Land</span>
              <span className="text-lg font-bold text-[#123D2B]">{farmer.totalAcres} Acres</span>
            </div>
            <div className="bg-[#F7F8F3] border border-[#E3E9E3] p-3 rounded-md">
              <span className="text-[10px] font-semibold uppercase text-[#64746A] block">Primary Crop</span>
              <span className="text-lg font-bold text-[#123D2B]">{farmer.primaryCrop}</span>
            </div>
            <div className="bg-[#F7F8F3] border border-[#E3E9E3] p-3 rounded-md">
              <span className="text-[10px] font-semibold uppercase text-[#64746A] block">IoT Uptime</span>
              <span className="text-lg font-bold text-[#216847]">{farmer.sensorUptime}%</span>
            </div>
            <div className="bg-[#F7F8F3] border border-[#E3E9E3] p-3 rounded-md">
              <span className="text-[10px] font-semibold uppercase text-[#64746A] block">Soil Health Index</span>
              <span className="text-lg font-bold text-[#123D2B]">{farmer.soilHealthIndex} / 100</span>
            </div>
          </div>

          {/* Contact & Gateway Coordinates */}
          <div className="bg-[#EFF6F0] p-4 rounded-md border border-[#DDEDE1] space-y-2">
            <h4 className="text-xs font-bold text-[#123D2B] uppercase tracking-wider mb-2">
              Operator & Farm Telemetry Contact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#26372E]">
                <Phone className="w-4 h-4 text-[#216847]" />
                <span>{farmer.contact}</span>
              </div>
              <div className="flex items-center gap-2 text-[#26372E]">
                <Mail className="w-4 h-4 text-[#216847]" />
                <span className="truncate">{farmer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#26372E]">
                <Radio className="w-4 h-4 text-[#216847]" />
                <span>Sync: {farmer.lastSync}</span>
              </div>
            </div>
          </div>

          {/* Managed Plots Snapshot */}
          <div>
            <h4 className="text-xs font-bold text-[#123D2B] uppercase tracking-wider mb-2">
              Active Monitored Plots ({plots.length})
            </h4>
            <div className="border border-[#E3E9E3] rounded-md overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFF6F0] text-[#64746A] text-[11px] font-semibold border-b border-[#E3E9E3]">
                  <tr>
                    <th className="py-2 px-3">Plot Name</th>
                    <th className="py-2 px-3">Crop / Variety</th>
                    <th className="py-2 px-3 text-right">Acres</th>
                    <th className="py-2 px-3 text-center">Root Moisture</th>
                    <th className="py-2 px-3 text-center">Valve Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3E9E3]">
                  {plots.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F7F8F3]">
                      <td className="py-2.5 px-3 font-semibold text-[#123D2B]">{p.name}</td>
                      <td className="py-2.5 px-3 text-[#64746A]">{p.crop}</td>
                      <td className="py-2.5 px-3 text-right font-medium">{p.acres}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block font-semibold px-2 py-0.5 rounded text-[11px] ${
                            p.telemetry.moistureRoot < p.telemetry.optimalMoistureMin
                              ? 'bg-[#FFF3D8] text-[#8A5A00]'
                              : 'bg-[#E4F4E8] text-[#216847]'
                          }`}
                        >
                          {p.telemetry.moistureRoot}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block font-semibold px-2 py-0.5 rounded text-[10px] ${
                            p.valveOpen
                              ? 'bg-[#E7F0FC] text-[#285EA8] animate-pulse font-bold'
                              : 'bg-[#EDF1ED] text-[#64746A]'
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
          <div className="bg-[#EFF6F0] p-4 rounded-md border border-[#DDEDE1]">
            <h4 className="text-xs font-bold text-[#123D2B] uppercase tracking-wider mb-1">
              Dispatch Agronomic Advisory
            </h4>
            <p className="text-[11px] text-[#64746A] mb-2">
              Send an instant operational directive or soil amendment recommendation directly to this farmer’s mobile app.
            </p>
            <form onSubmit={handleSendAdvisory} className="space-y-2">
              <textarea
                value={advisoryMessage}
                onChange={(e) => setAdvisoryMessage(e.target.value)}
                placeholder="e.g., Regional radar indicates heavy precipitation tonight; delay scheduled fertilizer broadcast until Wednesday."
                rows={2}
                className="w-full p-2.5 bg-[#FFFFFF] border border-[#E3E9E3] rounded-md text-xs text-[#26372E] placeholder-[#64746A]/60 focus:outline-none focus:ring-1 focus:ring-[#216847]"
              />
              <div className="flex items-center justify-between">
                {advisorySent ? (
                  <span className="text-xs font-medium text-[#216847] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Advisory dispatched to {farmer.name} via SMS & Portal!
                  </span>
                ) : (
                  <span className="text-[11px] text-[#64746A]">Logged to official regional agricultural record.</span>
                )}
                <button
                  type="submit"
                  disabled={!advisoryMessage.trim()}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#216847] hover:bg-[#18573A] disabled:opacity-50 text-white rounded-md text-xs font-semibold transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Advisory</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#F7F8F3] border-t border-[#E3E9E3] flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-xs font-semibold text-[#123D2B] bg-[#FFFFFF] border border-[#E3E9E3] hover:bg-[#EFF6F0]"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
