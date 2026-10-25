import React, { useState } from 'react';
import {
  MapPin,
  Users,
  Radio,
  Droplets,
  TrendingUp,
  AlertTriangle,
  Filter,
  CheckCircle2,
  ChevronRight,
  Info,
  Calendar,
} from 'lucide-react';
import { Farmer, Plot, AgroAlert } from '../../types/agriculture';
import { MetricCard } from '../common/MetricCard';
import { TelemetryLineChart } from '../common/TelemetryLineChart';
import {
  REGIONAL_CROPS_STATS,
  REGIONAL_ZONES_SUMMARY,
  SOIL_TELEMETRY_SERIES_24H,
} from '../../data/mockAgricultureData';

interface AdminDashboardProps {
  activeTab: string;
  farmers: Farmer[];
  plots: Plot[];
  alerts: AgroAlert[];
  onAcknowledgeAlert: (alertId: string) => void;
  onSelectFarmer: (farmer: Farmer) => void;
  onOpenIrrigationModal: (plotId?: string) => void;
  searchFilter: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  activeTab,
  farmers,
  plots,
  alerts,
  onAcknowledgeAlert,
  onSelectFarmer,
  onOpenIrrigationModal,
  searchFilter,
}) => {
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedAlertSeverity, setSelectedAlertSeverity] = useState<string>('all');

  // Filtered farmers
  const filteredFarmers = farmers.filter((farmer) => {
    const matchesSearch =
      farmer.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      farmer.farmName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      farmer.region.toLowerCase().includes(searchFilter.toLowerCase()) ||
      farmer.primaryCrop.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesCrop =
      selectedCropFilter === 'all' || farmer.primaryCrop === selectedCropFilter;

    const matchesStatus =
      selectedStatusFilter === 'all' || farmer.status === selectedStatusFilter;

    return matchesSearch && matchesCrop && matchesStatus;
  });

  // Filtered alerts
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.plotName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      alert.farmName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesSeverity =
      selectedAlertSeverity === 'all' || alert.severity === selectedAlertSeverity;

    return matchesSearch && matchesSeverity;
  });

  const totalAcres = farmers.reduce((acc, f) => acc + f.totalAcres, 0);
  const criticalAlerts = alerts.filter((a) => a.severity === 'critical' && !a.acknowledged).length;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-[#e1e6dc] gap-2">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#143823]">
            {activeTab === 'farms'
              ? 'Regional Agricultural Zones & Grid'
              : activeTab === 'farmers'
              ? 'Producer & Cooperative Directory'
              : activeTab === 'telemetry'
              ? 'IoT Sensor Grid & Telemetry Logs'
              : activeTab === 'irrigation'
              ? 'Regional Water Network & Pump Stations'
              : activeTab === 'yield'
              ? 'Harvest Projections & Crop Analytics'
              : activeTab === 'alerts'
              ? 'Environmental Alerts & Safety Log'
              : activeTab === 'settings'
              ? 'System Configurations & Thresholds'
              : 'Enterprise Agricultural Operations Command'}
          </h1>
          <p className="text-xs text-[#526054]">
            Live district telemetry monitoring 14,850 arable acres across 6 regional watersheds.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => onOpenIrrigationModal()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#143823] hover:bg-[#1b4332] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Droplets className="w-3.5 h-3.5 text-[#52b788]" />
            <span>Manage Water Network</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Row - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-3.5">
        <MetricCard
          label="Total Managed Land"
          value={`${totalAcres.toLocaleString()} ac`}
          subValue="42 Monitored Parcels"
          trend={{ value: '+420 ac pace', isPositive: true }}
          icon={<MapPin className="w-4 h-4 text-[#2d6a4f]" />}
          iconBgColor="bg-[#d8f3dc]"
        />
        <MetricCard
          label="Active Farmers"
          value={farmers.length}
          subValue="98.4% Telemetry Active"
          trend={{ value: '100% connected', isPositive: true }}
          icon={<Users className="w-4 h-4 text-[#2d6a4f]" />}
          iconBgColor="bg-[#d8f3dc]"
        />
        <MetricCard
          label="Irrigation Efficiency"
          value="88.4%"
          subValue="182k Gal Saved"
          trend={{ value: '+4.2% vs target', isPositive: true }}
          icon={<Droplets className="w-4 h-4 text-[#2d6a4f]" />}
          iconBgColor="bg-[#d8f3dc]"
        />
        <MetricCard
          label="Projected Harvest"
          value="182,400 T"
          subValue="94.2% Seasonal Pace"
          trend={{ value: '+2.1% pace', isPositive: true }}
          icon={<TrendingUp className="w-4 h-4 text-[#2d6a4f]" />}
          iconBgColor="bg-[#d8f3dc]"
        />
        <MetricCard
          label="Active Incidents"
          value={criticalAlerts > 0 ? `${criticalAlerts} Critical` : '0 Critical'}
          subValue={`${alerts.length} Total Warnings`}
          trend={{
            value: criticalAlerts > 0 ? 'Action required' : 'All nominal',
            isPositive: criticalAlerts === 0,
          }}
          icon={<AlertTriangle className="w-4 h-4 text-amber-700" />}
          iconBgColor="bg-amber-100"
          badge={criticalAlerts > 0 ? 'Alert' : 'Nominal'}
        />
      </div>

      {/* Main Grid: Regional Yield + Reservoir / Water Allocation */}
      {(activeTab === 'overview' || activeTab === 'yield') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Regional Yield Forecast & Crop Distribution */}
          <div className="lg:col-span-2 bg-white border border-[#e1e6dc] rounded-lg p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#f0f2eb] gap-1">
              <div>
                <h2 className="text-sm font-bold text-[#143823] uppercase tracking-wide">
                  Crop Acreage Distribution & Yield Projections
                </h2>
                <p className="text-xs text-[#526054]">
                  Aggregate seasonal distribution across District 4 and affiliated regional basins
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#f4f6f1] text-[#143823] border border-[#e2e6dd] self-start sm:self-auto">
                Season 2026
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {REGIONAL_CROPS_STATS.map((item) => (
                <div key={item.crop} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <span className="font-semibold text-[#143823] flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-xs shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.crop}</span>
                    </span>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 text-[#526054] text-[11px] sm:text-xs">
                      <span>{item.acreage.toLocaleString()} ac ({item.percent}%)</span>
                      <span className="font-medium text-[#143823]">
                        {item.forecastTons.toLocaleString()} T
                      </span>
                      <span
                        className={`font-semibold ${
                          item.pace.startsWith('+') ? 'text-[#2d6a4f]' : 'text-amber-700'
                        }`}
                      >
                        {item.pace}
                      </span>
                    </div>
                  </div>

                  {/* Clean progress track */}
                  <div className="w-full bg-[#f0f2eb] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percent}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-[#f0f2eb] flex flex-wrap items-center justify-between text-xs text-[#526054] gap-2">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                <span>Multispectral satellite NDVI indicates 92% canopy density exceeding 5-year rolling average.</span>
              </span>
              <span className="font-semibold text-[#143823]">Target: 193,500 MT</span>
            </div>
          </div>

          {/* Water Resource & Pump Infrastructure */}
          <div className="bg-white border border-[#e1e6dc] rounded-lg p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#f0f2eb]">
                <div>
                  <h2 className="text-sm font-bold text-[#143823] uppercase tracking-wide">
                    Water Network Telemetry
                  </h2>
                  <p className="text-xs text-[#526054]">Central Reservoir & Pump Stations</p>
                </div>
                <Droplets className="w-4 h-4 text-[#2d6a4f]" />
              </div>

              {/* Reservoir Capacity */}
              <div className="mt-4 p-3.5 bg-[#f6f8f5] rounded-md border border-[#e2e6dd] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#143823]">Reservoir Level</span>
                  <span className="font-bold text-[#2d6a4f]">78% Full</span>
                </div>
                <div className="w-full bg-[#e2e6dd] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#2d6a4f] h-full rounded-full" style={{ width: '78%' }} />
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#526054]">
                  <span>3.28M / 4.20M Gallons</span>
                  <span>14 Days Reserve</span>
                </div>
              </div>

              {/* Pump Stations List */}
              <div className="mt-4 space-y-2 text-xs">
                <span className="text-[10px] uppercase font-bold text-[#5f7464] tracking-wider block">
                  Regional Pump Stations
                </span>
                {[
                  { name: 'Station #1 (Valley Main)', status: 'Active (340 L/m)', ok: true },
                  { name: 'Station #2 (East Ridge)', status: 'Active (280 L/m)', ok: true },
                  { name: 'Station #3 (Basin Lift)', status: 'Standby / Scheduled', ok: true },
                  { name: 'Station #4 (Cotton Sector)', status: 'Pressure Alert (-28 PSI)', ok: false },
                ].map((pump, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-md bg-[#fafbf9] border border-[#f0f2eb]"
                  >
                    <span className="font-medium text-[#143823] truncate max-w-[150px] sm:max-w-none">{pump.name}</span>
                    <span
                      className={`text-[9px] font-semibold px-2 py-0.5 rounded shrink-0 ${
                        pump.ok
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800 animate-pulse'
                      }`}
                    >
                      {pump.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#f0f2eb]">
              <button
                onClick={() => onOpenIrrigationModal()}
                className="w-full py-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>Adjust Water Allocation Policy</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regional Zone Soil Telemetry Heatmap Cards */}
      {(activeTab === 'overview' || activeTab === 'farms' || activeTab === 'telemetry') && (
        <div className="bg-white border border-[#e1e6dc] rounded-lg p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#f0f2eb] gap-2">
            <div>
              <h2 className="text-sm font-bold text-[#143823] uppercase tracking-wide">
                Regional Soil Telemetry & Sensor Matrix
              </h2>
              <p className="text-xs text-[#526054]">
                Continuous LoRa sensor telemetry aggregated across four geographical zones
              </p>
            </div>
            <div className="text-xs text-[#526054] flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2d6a4f]" /> Optimal
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Needs Irrigation
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
            {REGIONAL_ZONES_SUMMARY.map((zone) => (
              <div
                key={zone.id}
                className="bg-[#fcfdfa] border border-[#e2e6dd] rounded-lg p-3.5 hover:border-[#2d6a4f] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#143823] group-hover:text-[#2d6a4f] transition-colors truncate">
                    {zone.name}
                  </span>
                  <span
                    className={`text-[9px] font-semibold px-2 py-0.5 rounded shrink-0 ${
                      zone.status === 'Optimal'
                        ? 'bg-[#d8f3dc] text-[#143823]'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {zone.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#5f7464] uppercase block">Avg Moisture</span>
                    <span className="text-base font-bold text-[#143823]">{zone.avgMoisture}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5f7464] uppercase block">Soil pH</span>
                    <span className="text-base font-bold text-[#143823]">{zone.phAvg}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5f7464] uppercase block">Area</span>
                    <span className="font-semibold text-gray-700">{zone.acreage} ac</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5f7464] uppercase block">Nodes Active</span>
                    <span className="font-semibold text-[#2d6a4f]">{zone.sensorsOnline}</span>
                  </div>
                </div>

                {/* Progress representation */}
                <div className="mt-3">
                  <div className="w-full bg-[#e2e6dd] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        zone.status === 'Optimal' ? 'bg-[#2d6a4f]' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(100, zone.avgMoisture)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Telemetry Chart Component Preview */}
      {(activeTab === 'overview' || activeTab === 'telemetry') && (
        <TelemetryLineChart data={SOIL_TELEMETRY_SERIES_24H} />
      )}

      {/* Farmer & Producer Directory Table */}
      {(activeTab === 'overview' || activeTab === 'farmers') && (
        <div className="bg-white border border-[#e1e6dc] rounded-lg shadow-xs overflow-hidden">
          <div className="p-3.5 sm:p-4 bg-[#fbfbfa] border-b border-[#e1e6dc] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#143823] uppercase tracking-wide">
                Producer & Cooperative Registry ({filteredFarmers.length})
              </h2>
              <p className="text-xs text-[#526054]">
                Real-time operational status, soil health indices, and connectivity for registered farms
              </p>
            </div>

            {/* Table Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-[#526054]">
                <Filter className="w-3.5 h-3.5 text-[#2d6a4f]" />
                <span className="hidden sm:inline">Filter:</span>
              </div>

              <select
                value={selectedCropFilter}
                onChange={(e) => setSelectedCropFilter(e.target.value)}
                className="px-2 py-1 text-xs bg-white border border-[#d1d8cc] rounded-md text-[#143823] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
              >
                <option value="all">All Crops</option>
                <option value="Corn / Maize">Corn / Maize</option>
                <option value="Soybeans">Soybeans</option>
                <option value="Winter Wheat">Winter Wheat</option>
                <option value="Cotton">Cotton</option>
                <option value="Alfalfa">Alfalfa</option>
                <option value="Tomatoes">Tomatoes</option>
              </select>

              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-2 py-1 text-xs bg-white border border-[#d1d8cc] rounded-md text-[#143823] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
              >
                <option value="all">All Statuses</option>
                <option value="Optimal">Optimal</option>
                <option value="Needs Attention">Needs Attention</option>
                <option value="Irrigating">Irrigating</option>
                <option value="Alert Critical">Alert Critical</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs min-w-[700px]">
              <thead className="bg-[#f4f6f1] text-[#5f7464] text-[11px] font-semibold border-b border-[#e1e6dc] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3.5">Operator / Farm</th>
                  <th className="py-2.5 px-3.5">Region District</th>
                  <th className="py-2.5 px-3.5">Primary Crop</th>
                  <th className="py-2.5 px-3.5 text-right">Acreage</th>
                  <th className="py-2.5 px-3.5 text-center">Status</th>
                  <th className="py-2.5 px-3.5 text-center">Soil Index</th>
                  <th className="py-2.5 px-3.5 text-center">IoT Uptime</th>
                  <th className="py-2.5 px-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f2eb]">
                {filteredFarmers.map((farmer) => (
                  <tr
                    key={farmer.id}
                    className="hover:bg-[#f9faf7] transition-colors cursor-pointer"
                    onClick={() => onSelectFarmer(farmer)}
                  >
                    <td className="py-2.5 px-3.5">
                      <div className="font-semibold text-[#143823]">{farmer.name}</div>
                      <div className="text-[11px] text-[#526054]">{farmer.farmName}</div>
                    </td>
                    <td className="py-2.5 px-3.5 text-gray-600">{farmer.region}</td>
                    <td className="py-2.5 px-3.5">
                      <span className="font-medium text-[#143823]">{farmer.primaryCrop}</span>
                      <span className="text-[10px] text-gray-500 block">
                        {farmer.activePlotsCount} Active Plots
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-medium text-gray-800">
                      {farmer.totalAcres.toLocaleString()} ac
                    </td>
                    <td className="py-2.5 px-3.5 text-center">
                      <span
                        className={`inline-block font-semibold px-2 py-0.5 rounded text-[10px] ${
                          farmer.status === 'Optimal'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : farmer.status === 'Irrigating'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : farmer.status === 'Alert Critical'
                            ? 'bg-red-100 text-red-800 border border-red-300 animate-pulse'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {farmer.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5 text-center">
                      <span className="font-bold text-[#143823]">{farmer.soilHealthIndex}</span>
                      <span className="text-[10px] text-gray-400"> / 100</span>
                    </td>
                    <td className="py-2.5 px-3.5 text-center">
                      <span className="font-medium text-[#2d6a4f]">{farmer.sensorUptime}%</span>
                    </td>
                    <td className="py-2.5 px-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onSelectFarmer(farmer)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#2d6a4f] hover:text-white hover:bg-[#2d6a4f] rounded border border-[#2d6a4f]/40 transition-colors"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Environmental & Equipment Alerts Table */}
      {(activeTab === 'overview' || activeTab === 'alerts') && (
        <div className="bg-white border border-[#e1e6dc] rounded-lg shadow-xs overflow-hidden">
          <div className="p-3.5 sm:p-4 bg-[#fbfbfa] border-b border-[#e1e6dc] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#143823] uppercase tracking-wide">
                Agronomic Alerts & Incident Audit ({filteredAlerts.length})
              </h2>
              <p className="text-xs text-[#526054]">
                Automated threshold breaches: soil moisture, nutrient deficits, equipment pressures
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-[#526054]">Severity:</span>
              <div className="flex items-center bg-[#f0f2eb] p-0.5 rounded-md border border-[#e2e6dd]">
                {(['all', 'critical', 'warning', 'info', 'optimal'] as const).map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSelectedAlertSeverity(sev)}
                    className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-medium rounded capitalize transition-colors ${
                      selectedAlertSeverity === sev
                        ? 'bg-white text-[#143823] shadow-xs'
                        : 'text-[#526054] hover:text-[#143823]'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="divide-y divide-[#f0f2eb]">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#fafbf9] transition-colors ${
                  !alert.acknowledged && alert.severity === 'critical' ? 'bg-red-50/40' : ''
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider ${
                        alert.severity === 'critical'
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : alert.severity === 'warning'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : alert.severity === 'optimal'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}
                    >
                      {alert.category}
                    </span>
                    <span className="text-xs font-bold text-[#143823]">{alert.plotName}</span>
                    <span className="text-xs text-[#526054]">({alert.farmName})</span>
                    <span className="text-[10px] text-gray-400">• {alert.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-700">{alert.message}</p>
                  <p className="text-[11px] text-[#2d6a4f] font-medium">
                    Recommended: {alert.recommendedAction}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {alert.acknowledged ? (
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Acknowledged
                    </span>
                  ) : (
                    <button
                      onClick={() => onAcknowledgeAlert(alert.id)}
                      className="px-3 py-1 rounded bg-[#143823] hover:bg-[#1b4332] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#52b788]" />
                      <span>Acknowledge</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
