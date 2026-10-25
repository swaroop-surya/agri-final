import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, FileText, CheckCircle2 } from 'lucide-react';
import { Farmer, Plot, AgroAlert } from '../../types/agriculture';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmers: Farmer[];
  plots: Plot[];
  alerts: AgroAlert[];
  season: string;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  farmers,
  plots,
  alerts,
  season,
}) => {
  const [format, setFormat] = useState<'csv' | 'summary'>('csv');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadCsv = () => {
    // Generate CSV content
    const headers = ['Farmer Name', 'Farm Name', 'Region', 'Crop', 'Total Acres', 'Status', 'Root Moisture %', 'Soil Health Index', 'Last Sync'];
    const rows = farmers.map((f) => [
      `"${f.name}"`,
      `"${f.farmName}"`,
      `"${f.region}"`,
      `"${f.primaryCrop}"`,
      f.totalAcres,
      `"${f.status}"`,
      f.status === 'Optimal' ? 41 : 33,
      f.soilHealthIndex,
      `"${f.lastSync}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `AgriVision_Report_${season.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg border border-[#cbd5c5] shadow-2xl max-w-xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#143823] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#2d6a4f]">
              <FileSpreadsheet className="w-5 h-5 text-[#d8f3dc]" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Export Agricultural Telemetry & Operations Report</h3>
              <p className="text-xs text-[#a7c5b2]">{season}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#a7c5b2] hover:text-white hover:bg-[#1b4332]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-[#2b3a2f]">
          <div>
            <label className="block font-semibold uppercase text-[10px] text-[#5f7464] tracking-wider mb-2">
              Select Output Specification
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-3 rounded-md border text-left flex items-start gap-2.5 transition-all ${
                  format === 'csv'
                    ? 'border-[#2d6a4f] bg-[#f0f7f2] ring-1 ring-[#2d6a4f]'
                    : 'border-[#d8e0d4] bg-white hover:bg-[#fbfbfa]'
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">CSV Data Spreadsheet</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Full raw telemetry metrics, soil index, and farmer records for Excel / R / Python analysis.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('summary')}
                className={`p-3 rounded-md border text-left flex items-start gap-2.5 transition-all ${
                  format === 'summary'
                    ? 'border-[#2d6a4f] bg-[#f0f7f2] ring-1 ring-[#2d6a4f]'
                    : 'border-[#d8e0d4] bg-white hover:bg-[#fbfbfa]'
                }`}
              >
                <FileText className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">Executive Briefing (PDF)</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Agronomic overview with regional water usage, yield pace, and alert audit history.
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Metrics preview */}
          <div className="bg-[#f6f7f4] border border-[#e1e6dc] p-3.5 rounded-md space-y-2">
            <div className="font-semibold text-[#143823] text-xs">Report Scope Summary:</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 rounded border border-[#e2e6dd]">
                <div className="text-[10px] text-gray-500">Farmers Included</div>
                <div className="text-sm font-bold text-[#143823]">{farmers.length} Operators</div>
              </div>
              <div className="bg-white p-2 rounded border border-[#e2e6dd]">
                <div className="text-[10px] text-gray-500">Monitored Plots</div>
                <div className="text-sm font-bold text-[#143823]">{plots.length} Active Fields</div>
              </div>
              <div className="bg-white p-2 rounded border border-[#e2e6dd]">
                <div className="text-[10px] text-gray-500">Incident Logs</div>
                <div className="text-sm font-bold text-[#143823]">{alerts.length} Incidents</div>
              </div>
            </div>
          </div>

          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-medium">File successfully generated and downloaded to your device!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#f6f7f4] border-t border-[#e1e6dc] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#5f7464] hover:text-[#143823]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Generate & Download File</span>
          </button>
        </div>
      </div>
    </div>
  );
};
