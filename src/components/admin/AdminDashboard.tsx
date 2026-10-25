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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-[#E3E9E3] gap-2">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#123D2B]">
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
          <p className="text-xs text-[#64746A]">
            Live district telemetry monitoring 14,850 arable acres across 6 regional watersheds.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => onOpenIrrigationModal()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#216847] hover:bg-[#18573A] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Droplets className="w-3.5 h-3.5 text-[#DDEDE1]" />
            <span>Manage Water Network</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Row - Responsive Grid with warm ivory & sage tokens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-3.5">
        <MetricCard
          label="Total Managed Land"
          value={`${totalAcres.toLocaleString()} ac`}
          subValue="42 Monitored Parcels"
          trend={{ value: '+420 ac pace', isPositive: true }}
          icon={<MapPin className="w-4 h-4 text-[#216847]" />}
          iconBgColor="bg-[#EFF6F0]"
        />
        <MetricCard
          label="Active Farmers"
          value={farmers.length}
          subValue="98.4% Telemetry Active"
          trend={{ value: '100% connected', isPositive: true }}
          icon={<Users className="w-4 h-4 text-[#216847]" />}
          iconBgColor="bg-[#EFF6F0]"
        />
        <MetricCard
          label="Irrigation Efficiency"
          value="88.4%"
          subValue="182k Gal Saved"
          trend={{ value: '+4.2% vs target', isPositive: true }}
          icon={<Droplets className="w-4 h-4 text-[#285EA8]" />}
          iconBgColor="bg-[#E7F0FC]"
        />
        <MetricCard
          label="Projected Harvest"
          value="182,400 T"
          subValue="94.2% Seasonal Pace"
          trend={{ value: '+2.1% pace', isPositive: true }}
          icon={<TrendingUp className="w-4 h-4 text-[#216847]" />}
          iconBgColor="bg-[#EFF6F0]"
        />
        <MetricCard
          label="Active Incidents"
          value={criticalAlerts > 0 ? `${criticalAlerts} Critical` : '0 Critical'}
          subValue={`${alerts.length} Total Warnings`}
          trend={{
            value: criticalAlerts > 0 ? 'Action required' : 'All nominal',
            isPositive: criticalAlerts === 0,
          }}
          icon={<AlertTriangle className="w-4 h-4 text-[#8A5A00]" />}
          iconBgColor="bg-[#FFF3D8]"
          badge={criticalAlerts > 0 ? 'Alert' : 'Nominal'}
        />
      </div>

      {/* Main Grid: Regional Yield + Reservoir / Water Allocation */}
      {(activeTab === 'overview' || activeTab === 'yield') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Regional Yield Forecast & Crop Distribution */}
          <div className="lg:col-span-2 bg-white border border-[#E3E9E3] rounded-lg p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EFF6F0] gap-1">
              <div>
                <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wide">
                  Crop Acreage Distribution & Yield Projections
                </h2>
                <p className="text-xs text-[#64746A]">
                  Aggregate seasonal distribution across District 4 and affiliated regional basins
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EFF6F0] text-[#123D2B] border border-[#E3E9E3] self-start sm:self-auto">
                Season 2026
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {REGIONAL_CROPS_STATS.map((item) => (
                <div key={item.crop} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <span className="font-semibold text-[#123D2B] flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-xs shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.crop}</span>
                    </span>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 text-[#64746A] text-[11px] sm:text-xs">
                      <span>{item.acreage.toLocaleString()} ac ({item.percent}%)</span>
                      <span className="font-semibold text-[#123D2B]">
                        {item.forecastTons.toLocaleString()} T
                      </span>
                      <span
                        className={`font-semibold ${
                          item.pace.startsWith('+') ? 'text-[#216847]' : 'text-[#8A5A00]'
                        }`}
                      >
                        {item.pace}
                      </span>
                    </div>
                  </div>

                  {/* Clean progress track */}
                  <div className="w-full bg-[#EFF6F0] h-2 rounded-full overflow-hidden">
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

            <div className="mt-5 pt-3 border-t border-[#EFF6F0] flex flex-wrap items-center justify-between text-xs text-[#64746A] gap-2">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#216847] shrink-0" />
                <span>Multispectral satellite NDVI indicates 92% canopy density exceeding 5-year rolling average.</span>
              </span>
              <span className="font-semibold text-[#123D2B]">Target: 193,500 MT</span>
            </div>
          </div>

          {/* Water Resource & Pump Infrastructure */}
          <div className="bg-white border border-[#E3E9E3] rounded-lg p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#EFF6F0]">
                <div>
                  <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wide">
                    Water Network Telemetry
                  </h2>
                  <p className="text-xs text-[#64746A]">Central Reservoir & Pump Stations</p>
                </div>
                <Droplets className="w-4 h-4 text-[#285EA8]" />
              </div>

              {/* Reservoir Capacity */}
              <div className="mt-4 p-3.5 bg-[#F7F8F3] rounded-md border border-[#E3E9E3] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#123D2B]">Reservoir Level</span>
                  <span className="font-bold text-[#285EA8]">78% Full</span>
                </div>
                <div className="w-full bg-[#E3E9E3] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#285EA8] h-full rounded-full" style={{ width: '78%' }} />
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#64746A]">
                  <span>3.28M / 4.20M Gallons</span>
                  <span>14 Days Reserve</span>
                </div>
              </div>

              {/* Pump Stations List */}
              <div className="mt-4 space-y-2 text-xs">
                <span className="text-[10px] uppercase font-bold text-[#64746A] tracking-wider block">
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
                    className="flex items-center justify-between p-2 rounded-md bg-[#F7F8F3] border border-[#EFF6F0]"
                  >
                    <span className="font-medium text-[#123D2B] truncate max-w-[150px] sm:max-w-none">{pump.name}</span>
                    <span
                      className={`text-[9px] font-semibold px-2 py-0.5 rounded shrink-0 ${
                        pump.ok
                          ? 'bg-[#E4F4E8] text-[#216847]'
                          : 'bg-[#FCE8E6] text-[#B42318] animate-pulse'
                      }`}
                    >
                      {pump.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EFF6F0]">
              <button
                onClick={() => onOpenIrrigationModal()}
                className="w-full py-2 bg-[#216847] hover:bg-[#18573A] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Droplets className="w-3.5 h-3.5 text-[#DDEDE1]" />
                <span>Adjust Water Allocation Policy</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regional Zone Soil Telemetry Heatmap Cards */}
      {(activeTab === 'overview' || activeTab === 'farms' || activeTab === 'telemetry') && (
        <div className="bg-white border border-[#E3E9E3] rounded-lg p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EFF6F0] gap-2">
            <div>
              <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wide">
                Regional Soil Telemetry & Sensor Matrix
              </h2>
              <p className="text-xs text-[#64746A]">
                Continuous LoRa sensor telemetry aggregated across four geographical zones
              </p>
            </div>
            <div className="text-xs text-[#64746A] flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#216847]" /> Optimal
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#D5A441]" /> Needs Water
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
            {REGIONAL_ZONES_SUMMARY.map((zone) => (
              <div
                key={zone.id}
                className="bg-[#F7F8F3] border border-[#E3E9E3] rounded-lg p-3.5 hover:border-[#216847] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#123D2B] group-hover:text-[#216847] transition-colors truncate">
                    {zone.name}
                  </span>
                  <span
                    className={`text-[9px] font-semibold px-2 py-0.5 rounded shrink-0 ${
                      zone.status === 'Optimal'
                        ? 'bg-[#E4F4E8] text-[#216847]'
                        : 'bg-[#FFF3D8] text-[#8A5A00]'
                    }`}
                  >
                    {zone.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#64746A] uppercase block">Avg Moisture</span>
                    <span className="text-base font-bold text-[#123D2B]">{zone.avgMoisture}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64746A] uppercase block">Soil pH</span>
                    <span className="text-base font-bold text-[#123D2B]">{zone.phAvg}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64746A] uppercase block">Area</span>
                    <span className="font-semibold text-[#26372E]">{zone.acreage} ac</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64746A] uppercase block">Nodes Active</span>
                    <span className="font-semibold text-[#216847]">{zone.sensorsOnline}</span>
                  </div>
                </div>

                {/* Progress representation */}
                <div className="mt-3">
                  <div className="w-full bg-[#E3E9E3] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        zone.status === 'Optimal' ? 'bg-[#216847]' : 'bg-[#D5A441]'
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
        <div className="bg-white border border-[#E3E9E3] rounded-lg shadow-xs overflow-hidden">
          <div className="p-3.5 sm:p-4 bg-[#F7F8F3] border-b border-[#E3E9E3] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wide">
                Producer & Cooperative Registry ({filteredFarmers.length})
              </h2>
              <p className="text-xs text-[#64746A]">
                Real-time operational status, soil health indices, and connectivity for registered farms
              </p>
            </div>

            {/* Table Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-[#64746A]">
                <Filter className="w-3.5 h-3.5 text-[#216847]" />
                <span className="hidden sm:inline">Filter:</span>
              </div>

              <select
                value={selectedCropFilter}
                onChange={(e) => setSelectedCropFilter(e.target.value)}
                className="px-2 py-1 text-xs bg-white border border-[#CBD5CD] rounded-md text-[#123D2B] focus:outline-none focus:ring-1 focus:ring-[#216847]"
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
                className="px-2 py-1 text-xs bg-white border border-[#CBD5CD] rounded-md text-[#123D2B] focus:outline-none focus:ring-1 focus:ring-[#216847]"
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
              <thead className="bg-[#EFF6F0] text-[#64746A] text-[11px] font-semibold border-b border-[#E3E9E3] uppercase tracking-wider">
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
              <tbody className="divide-y divide-[#EFF6F0]">
                {filteredFarmers.map((farmer) => (
                  <tr
                    key={farmer.id}
                    className="hover:bg-[#F7F8F3] transition-colors cursor-pointer"
                    onClick={() => onSelectFarmer(farmer)}
                  >
                    <td className="py-2.5 px-3.5">
                      <div className="font-semibold text-[#123D2B]">{farmer.name}</div>
                      <div className="text-[11px] text-[#64746A]">{farmer.farmName}</div>
                    </td>
                    <td className="py-2.5 px-3.5 text-[#26372E]">{farmer.region}</td>
                    <td className="py-2.5 px-3.5">
                      <span className="font-medium text-[#123D2B]">{farmer.primaryCrop}</span>
                      <span className="text-[10px] text-[#64746A] block">
                        {farmer.activePlotsCount} Active Plots
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-medium text-[#26372E]">
                      {farmer.totalAcres.toLocaleString()} ac
                    </td>
                    <td className="py-2.5 px-3.5 text-center">
                      <span
                        className={`inline-block font-semibold px-2 py-0.5 rounded text-[10px] ${
                          farmer.status === 'Optimal'
                            ? 'bg-[#E4F4E8] text-[#216847] border border-[#DDEDE1]'
                            : farmer.status === 'Irrigating'
                            ? 'bg-[#E7F0FC] text-[#285EA8] border border-[#BFD7F8]'
                            : farmer.status === 'Alert Critical'
                            ? 'bg-[#FCE8E6] text-[#B42318] border border-[#F5C2BF] animate-pulse'
                            : 'bg-[#FFF3D8] text-[#8A5A00] border border-[#FADF9E]'
                        }`}
                      >
                        {farmer.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5 text-center">
                      <span className="font-bold text-[#123D2B]">{farmer.soilHealthIndex}</span>
                      <span className="text-[10px] text-[#64746A]"> / 100</span>
                    </td>
                    <td className="py-2.5 px-3.5 text-center">
                      <span className="font-medium text-[#216847]">{farmer.sensorUptime}%</span>
                    </td>
                    <td className="py-2.5 px-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onSelectFarmer(farmer)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#216847] hover:text-white hover:bg-[#216847] rounded border border-[#216847]/40 transition-colors cursor-pointer"
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
        <div className="bg-white border border-[#E3E9E3] rounded-lg shadow-xs overflow-hidden">
          <div className="p-3.5 sm:p-4 bg-[#F7F8F3] border-b border-[#E3E9E3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#123D2B] uppercase tracking-wide">
                Agronomic Alerts & Incident Audit ({filteredAlerts.length})
              </h2>
              <p className="text-xs text-[#64746A]">
                Automated threshold breaches: soil moisture, nutrient deficits, equipment pressures
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-[#64746A]">Severity:</span>
              <div className="flex items-center bg-[#EFF6F0] p-0.5 rounded-md border border-[#E3E9E3]">
                {(['all', 'critical', 'warning', 'info', 'optimal'] as const).map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSelectedAlertSeverity(sev)}
                    className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold rounded capitalize transition-colors cursor-pointer ${
                      selectedAlertSeverity === sev
                        ? 'bg-white text-[#123D2B] shadow-xs'
                        : 'text-[#64746A] hover:text-[#123D2B]'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="divide-y divide-[#EFF6F0]">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F8F3] transition-colors ${
                  !alert.acknowledged && alert.severity === 'critical' ? 'bg-[#FCE8E6]/40' : ''
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider ${
                        alert.severity === 'critical'
                          ? 'bg-[#FCE8E6] text-[#B42318] border border-[#F5C2BF]'
                          : alert.severity === 'warning'
                          ? 'bg-[#FFF3D8] text-[#8A5A00] border border-[#FADF9E]'
                          : alert.severity === 'optimal'
                          ? 'bg-[#E4F4E8] text-[#216847] border border-[#DDEDE1]'
                          : 'bg-[#E7F0FC] text-[#285EA8] border border-[#BFD7F8]'
                      }`}
                    >
                      {alert.category}
                    </span>
                    <span className="text-xs font-bold text-[#123D2B]">{alert.plotName}</span>
                    <span className="text-xs text-[#64746A]">({alert.farmName})</span>
                    <span className="text-[10px] text-[#64746A]">• {alert.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#26372E]">{alert.message}</p>
                  <p className="text-[11px] text-[#216847] font-semibold">
                    Recommended: {alert.recommendedAction}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {alert.acknowledged ? (
                    <span className="text-xs text-[#64746A] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#216847]" /> Acknowledged
                    </span>
                  ) : (
                    <button
                      onClick={() => onAcknowledgeAlert(alert.id)}
                      className="px-3 py-1 rounded bg-[#216847] hover:bg-[#18573A] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DDEDE1]" />
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
