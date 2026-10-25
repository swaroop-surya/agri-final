import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  Users,
  Radio,
  Droplets,
  TrendingUp,
  AlertTriangle,
  Settings,
  ScanLine,
  CloudSun,
  ClipboardList,
  Wheat,
  Layers,
  X,
} from 'lucide-react';
import { UserRole } from '../../types/agriculture';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  unreadAlertCount: number;
  activeIrrigationCount: number;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  activeTab,
  onTabChange,
  unreadAlertCount,
  activeIrrigationCount,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const adminNav: NavGroup[] = [
    {
      group: 'Core Operations',
      items: [
        { id: 'overview', label: 'Operations Overview', icon: LayoutDashboard },
        { id: 'farms', label: 'Regional Zones & Map', icon: MapPin },
        { id: 'farmers', label: 'Farmer Registry', icon: Users, badge: '6 Active' },
        { id: 'telemetry', label: 'Sensor Grid & IoT', icon: Radio },
      ],
    },
    {
      group: 'Resource Management',
      items: [
        {
          id: 'irrigation',
          label: 'Water & Pump Stations',
          icon: Droplets,
          badge: activeIrrigationCount > 0 ? `${activeIrrigationCount} Running` : undefined,
          badgeColor: 'bg-[#E4F4E8] text-[#216847]',
        },
        { id: 'yield', label: 'Yield Forecast & Crops', icon: TrendingUp },
      ],
    },
    {
      group: 'System & Governance',
      items: [
        {
          id: 'alerts',
          label: 'Field Alerts & Logs',
          icon: AlertTriangle,
          badge: unreadAlertCount > 0 ? `${unreadAlertCount}` : undefined,
          badgeColor: 'bg-[#FFF3D8] text-[#8A5A00] font-bold',
        },
        { id: 'settings', label: 'Thresholds & Policies', icon: Settings },
      ],
    },
  ];

  const farmerNav: NavGroup[] = [
    {
      group: 'Precision Farm Hub',
      items: [
        { id: 'field-overview', label: 'Plot Overview', icon: LayoutDashboard },
        { id: 'telemetry', label: 'Soil Telemetry (3-Depth)', icon: Layers },
        {
          id: 'irrigation',
          label: 'Smart Irrigation Control',
          icon: Droplets,
          badge: activeIrrigationCount > 0 ? 'Pumping' : undefined,
          badgeColor: 'bg-[#DDEDE1] text-[#123D2B]',
        },
      ],
    },
    {
      group: 'Crop Diagnostics & Climate',
      items: [
        { id: 'diagnostics', label: 'Crop Health Scanner', icon: ScanLine, badge: 'AI Scan' },
        { id: 'weather', label: 'Weather & ET0 Station', icon: CloudSun },
      ],
    },
    {
      group: 'Field Management',
      items: [
        { id: 'tasks', label: 'Agronomic Tasks', icon: ClipboardList, badge: '3 Pending' },
        { id: 'harvest', label: 'Harvest Log & Grain Silo', icon: Wheat },
      ],
    },
  ];

  const navGroups = role === 'admin' ? adminNav : farmerNav;

  const handleItemClick = (id: string) => {
    onTabChange(id);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between overflow-y-auto bg-[#123D2B] text-white">
      <div className="p-3.5 space-y-5">
        {/* Mobile close header */}
        <div className="flex items-center justify-between lg:hidden pb-2 border-b border-[#216847]/40">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Navigation Menu
          </span>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-[#DDEDE1] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role identifier badge in sidebar */}
        <div className="px-3 py-2 rounded-md bg-[#0C3021] border border-[#216847]/60">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#DDEDE1]/70">
            Active Perspective
          </div>
          <div className="text-xs font-semibold text-white flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#52b788]" />
            {role === 'admin' ? 'Regional Administrator' : 'Precision Farmer Operator'}
          </div>
        </div>

        {/* Navigation list */}
        <div className="space-y-4">
          {navGroups.map((group) => (
            <div key={group.group}>
              <div className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#DDEDE1]/60">
                {group.group}
              </div>
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#216847] text-white shadow-xs font-semibold'
                          : 'text-[#DDEDE1] hover:bg-[#18573A]/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? 'text-[#DDEDE1]' : 'text-[#DDEDE1]/70'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-sm font-semibold ${
                            isActive
                              ? 'bg-[#123D2B] text-[#DDEDE1]'
                              : item.badgeColor || 'bg-[#DDEDE1] text-[#123D2B]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar bottom telemetry health */}
      <div className="p-3.5 border-t border-[#216847]/40 bg-[#0C3021]">
        <div className="flex items-center justify-between text-[11px] text-[#DDEDE1] font-medium mb-1.5">
          <span className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#52b788]" />
            LoRa Base Station
          </span>
          <span className="text-[#52b788] font-semibold">Online</span>
        </div>
        <div className="w-full bg-[#18573A] h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#52b788] h-full rounded-full" style={{ width: '98%' }} />
        </div>
        <div className="flex justify-between items-center text-[10px] text-[#DDEDE1]/70 mt-1.5">
          <span>Uptime: 99.8%</span>
          <span>Sync: 4s ago</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#123D2B] border-r border-[#0C3021] shrink-0 flex-col justify-between select-none min-h-[calc(100vh-4rem)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer sheet */}
          <div className="relative w-72 max-w-[85vw] bg-[#123D2B] h-full shadow-2xl z-10 flex flex-col">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
