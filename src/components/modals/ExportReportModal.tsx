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
      <div className="bg-[#FFFFFF] rounded-lg border border-[#E3E9E3] shadow-2xl max-w-xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#123D2B] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#216847]">
              <FileSpreadsheet className="w-5 h-5 text-[#DDEDE1]" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Export Agricultural Telemetry & Operations Report</h3>
              <p className="text-xs text-[#DDEDE1]/80">{season}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#DDEDE1]/70 hover:text-white hover:bg-[#0C3021]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-[#26372E]">
          <div>
            <label className="block font-semibold uppercase text-[10px] text-[#64746A] tracking-wider mb-2">
              Select Output Specification
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-3 rounded-md border text-left flex items-start gap-2.5 transition-all ${
                  format === 'csv'
                    ? 'border-[#216847] bg-[#EFF6F0] ring-1 ring-[#216847]'
                    : 'border-[#E3E9E3] bg-[#FFFFFF] hover:bg-[#F7F8F3]'
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 text-[#216847] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#123D2B]">CSV Data Spreadsheet</div>
                  <div className="text-[11px] text-[#64746A] mt-0.5">
                    Full raw telemetry metrics, soil index, and farmer records for Excel / R / Python analysis.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('summary')}
                className={`p-3 rounded-md border text-left flex items-start gap-2.5 transition-all ${
                  format === 'summary'
                    ? 'border-[#216847] bg-[#EFF6F0] ring-1 ring-[#216847]'
                    : 'border-[#E3E9E3] bg-[#FFFFFF] hover:bg-[#F7F8F3]'
                }`}
              >
                <FileText className="w-5 h-5 text-[#216847] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#123D2B]">Executive Briefing (PDF)</div>
                  <div className="text-[11px] text-[#64746A] mt-0.5">
                    Agronomic overview with regional water usage, yield pace, and alert audit history.
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Metrics preview */}
          <div className="bg-[#EFF6F0] border border-[#DDEDE1] p-3.5 rounded-md space-y-2">
            <div className="font-semibold text-[#123D2B] text-xs">Report Scope Summary:</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#FFFFFF] p-2 rounded border border-[#E3E9E3]">
                <div className="text-[10px] text-[#64746A]">Farmers Included</div>
                <div className="text-sm font-bold text-[#123D2B]">{farmers.length} Operators</div>
              </div>
              <div className="bg-[#FFFFFF] p-2 rounded border border-[#E3E9E3]">
                <div className="text-[10px] text-[#64746A]">Monitored Plots</div>
                <div className="text-sm font-bold text-[#123D2B]">{plots.length} Active Fields</div>
              </div>
              <div className="bg-[#FFFFFF] p-2 rounded border border-[#E3E9E3]">
                <div className="text-[10px] text-[#64746A]">Incident Logs</div>
                <div className="text-sm font-bold text-[#123D2B]">{alerts.length} Incidents</div>
              </div>
            </div>
          </div>

          {downloadSuccess && (
            <div className="p-3 bg-[#E4F4E8] border border-[#216847]/30 text-[#216847] rounded-md flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#216847]" />
              <span className="font-medium">File successfully generated and downloaded to your device!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#F7F8F3] border-t border-[#E3E9E3] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#64746A] hover:text-[#123D2B] hover:bg-[#EFF6F0]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#216847] hover:bg-[#18573A] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Generate & Download File</span>
          </button>
        </div>
      </div>
    </div>
  );
};
