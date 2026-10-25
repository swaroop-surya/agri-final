import React, { useState } from 'react';
import {
  Sprout,
  ShieldCheck,
  Tractor,
  Bell,
  Search,
  Calendar,
  Check,
  ChevronDown,
  FileSpreadsheet,
  Menu,
  X,
  LogIn,
} from 'lucide-react';
import { UserRole, AgroAlert, AuthUser } from '../../types/agriculture';
import { UserProfileMenu } from '../auth/UserProfileMenu';

interface HeaderProps {
  role: UserRole;
  onRoleChange: (newRole: UserRole) => void;
  alerts: AgroAlert[];
  onAcknowledgeAlert: (alertId: string) => void;
  onOpenExportModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
  onToggleMobileMenu: () => void;
  mobileMenuOpen: boolean;
  currentUser: AuthUser | null;
  onOpenAuthModal: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  onNavigateToLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  onRoleChange,
  alerts,
  onAcknowledgeAlert,
  onOpenExportModal,
  searchQuery,
  onSearchChange,
  selectedSeason,
  onSeasonChange,
  onToggleMobileMenu,
  mobileMenuOpen,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onNavigateToLanding,
}) => {
  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged);

  const seasons = [
    '2026 Spring / Summer Cycle',
    '2025-26 Winter Grain Season',
    '2025 Summer / Fall Harvest',
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#123D2B] text-white border-b border-[#0C3021] shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-16 gap-2 sm:gap-4">
          {/* Left: Mobile Menu Toggle + Brand Identity */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={onToggleMobileMenu}
              className="lg:hidden p-1.5 rounded-md text-[#DDEDE1] hover:bg-[#0C3021] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={onNavigateToLanding}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
              title="Return to AgriVision Landing Page"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#216847] group-hover:bg-[#18573A] flex items-center justify-center text-[#DDEDE1] shadow-inner border border-[#216847] shrink-0 transition-colors">
                <Sprout className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-[#DDEDE1] transition-colors">
                    AgriVision
                  </span>
                  <span className="hidden sm:inline-block text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#216847] text-[#DDEDE1] border border-[#DDEDE1]/30">
                    v4.2
                  </span>
                </div>
                <p className="text-[10px] text-[#DDEDE1]/80 hidden md:block">Smart Agriculture System</p>
              </div>
            </button>

            {onNavigateToLanding && (
              <button
                type="button"
                onClick={onNavigateToLanding}
                className="hidden xl:flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#DDEDE1] hover:text-white bg-[#0C3021] hover:bg-[#18573A] rounded border border-[#216847]/50 transition-colors cursor-pointer"
                title="Return to Landing Page"
              >
                <span>← Home</span>
              </button>
            )}
          </div>

          {/* Center: Role Switcher & Season selector */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Responsive Role Switcher */}
            <div className="bg-[#0C3021] p-0.5 sm:p-1 rounded-lg border border-[#216847]/50 flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => onRoleChange('admin')}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  role === 'admin'
                    ? 'bg-[#216847] text-white shadow-xs'
                    : 'text-[#DDEDE1] hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline sm:inline">Admin</span>
              </button>

              <button
                type="button"
                onClick={() => onRoleChange('farmer')}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  role === 'farmer'
                    ? 'bg-[#216847] text-white shadow-xs'
                    : 'text-[#DDEDE1] hover:text-white'
                }`}
              >
                <Tractor className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline sm:inline">Farmer</span>
              </button>
            </div>

            {/* Season Selector (Desktop & Tablet) */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#18573A]/60 hover:bg-[#18573A] text-xs text-[#DDEDE1] border border-[#216847]/60 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#DDEDE1]" />
                <span className="max-w-[130px] truncate">{selectedSeason}</span>
                <ChevronDown className="w-3 h-3 text-[#DDEDE1]/70" />
              </button>

              {showSeasonDropdown && (
                <div className="absolute left-0 mt-1 w-60 bg-white text-[#26372E] rounded-md shadow-xl border border-[#E3E9E3] py-1 z-50">
                  <div className="px-3 py-1 text-[10px] font-bold text-[#64746A] uppercase tracking-wider">
                    Agronomic Cycle
                  </div>
                  {seasons.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        onSeasonChange(s);
                        setShowSeasonDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#EFF6F0] cursor-pointer ${
                        selectedSeason === s ? 'font-semibold text-[#123D2B] bg-[#E4F4E8]' : 'text-[#26372E]'
                      }`}
                    >
                      <span>{s}</span>
                      {selectedSeason === s && <Check className="w-3.5 h-3.5 text-[#216847]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden xl:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-[#DDEDE1]/60 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search plots, farmers, alerts..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#0C3021] border border-[#216847]/70 rounded-md text-xs text-white placeholder-[#DDEDE1]/60 focus:outline-none focus:ring-1 focus:ring-[#DDEDE1] focus:border-[#DDEDE1]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 text-xs text-[#DDEDE1]/70 hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Mobile search toggle button */}
            <button
              onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
              className="xl:hidden p-1.5 rounded-md text-[#DDEDE1] hover:bg-[#0C3021] cursor-pointer"
              aria-label="Toggle search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Export Report Action */}
            <button
              onClick={onOpenExportModal}
              title="Export Report"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#216847] hover:bg-[#18573A] text-white text-xs font-semibold border border-[#216847] transition-colors cursor-pointer shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#DDEDE1]" />
              <span className="hidden lg:inline">Export Report</span>
            </button>

            {/* Alerts Bell Popover */}
            <div className="relative">
              <button
                onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
                className="relative p-1.5 sm:p-2 rounded-md bg-[#0C3021] hover:bg-[#18573A] text-[#DDEDE1] transition-colors cursor-pointer border border-[#216847]/40"
                aria-label="Alerts"
              >
                <Bell className="w-4 h-4" />
                {unacknowledgedAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D5A441] text-[9px] font-bold text-[#123D2B] flex items-center justify-center shadow-xs">
                    {unacknowledgedAlerts.length}
                  </span>
                )}
              </button>

              {showAlertsDropdown && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-88 max-w-sm bg-white rounded-lg shadow-xl border border-[#E3E9E3] text-[#26372E] z-50 overflow-hidden">
                  <div className="px-3.5 py-2.5 bg-[#F7F8F3] border-b border-[#E3E9E3] flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#123D2B] uppercase tracking-wider">
                        Active Farm Alerts
                      </h4>
                      <p className="text-[10px] text-[#64746A]">
                        {unacknowledgedAlerts.length} unread warnings
                      </p>
                    </div>
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[#FFF3D8] text-[#8A5A00] border border-[#FADF9E]">
                      Live Telemetry
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-[#EFF6F0]">
                    {alerts.slice(0, 4).map((alert) => (
                      <div key={alert.id} className="p-3 hover:bg-[#F7F8F3] transition-colors">
                        <div className="flex items-start justify-between gap-1.5">
                          <span
                            className={`text-[9px] font-semibold px-1.5 py-0.2 rounded uppercase ${
                              alert.severity === 'critical'
                                ? 'bg-[#FCE8E6] text-[#B42318] border border-[#F5C2BF]'
                                : alert.severity === 'warning'
                                ? 'bg-[#FFF3D8] text-[#8A5A00] border border-[#FADF9E]'
                                : alert.severity === 'info'
                                ? 'bg-[#E7F0FC] text-[#285EA8] border border-[#BFD7F8]'
                                : 'bg-[#E4F4E8] text-[#216847] border border-[#DDEDE1]'
                            }`}
                          >
                            {alert.category}
                          </span>
                          <span className="text-[9px] text-[#64746A]">{alert.timestamp}</span>
                        </div>
                        <p className="text-xs font-semibold text-[#123D2B] mt-1">{alert.plotName}</p>
                        <p className="text-[11px] text-[#26372E] mt-0.5 line-clamp-2">{alert.message}</p>
                        {!alert.acknowledged && (
                          <div className="mt-2 flex justify-end">
                            <button
                              onClick={() => onAcknowledgeAlert(alert.id)}
                              className="text-[10px] font-semibold text-[#216847] hover:text-[#18573A] flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3 h-3" /> Acknowledge
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="px-3 py-2 bg-[#F7F8F3] border-t border-[#E3E9E3] text-center">
                    <button
                      onClick={() => setShowAlertsDropdown(false)}
                      className="text-xs font-semibold text-[#216847] hover:underline cursor-pointer"
                    >
                      Close Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar & Dropdown Trigger */}
            <div className="relative pl-1 sm:pl-2 border-l border-[#216847]/60">
              {currentUser ? (
                <button
                  type="button"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#0C3021] transition-colors cursor-pointer group text-left"
                  title="Click to view Account / Login / Register"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#216847] border-2 border-[#DDEDE1] group-hover:border-white flex items-center justify-center text-xs font-bold text-white shadow-xs transition-all ring-2 ring-transparent group-hover:ring-[#DDEDE1]/50">
                    {currentUser.avatarInitials}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-semibold text-white leading-tight flex items-center gap-1">
                      <span>{currentUser.name}</span>
                      <ChevronDown className="w-3 h-3 text-[#DDEDE1]/70" />
                    </p>
                    <p className="text-[10px] text-[#DDEDE1]/80 leading-tight">
                      {currentUser.title}
                    </p>
                  </div>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenAuthModal('login')}
                    className="px-2.5 py-1 text-xs font-semibold bg-[#216847] hover:bg-[#18573A] text-white rounded-md transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAuthModal('register')}
                    className="hidden sm:inline-block px-2.5 py-1 text-xs font-semibold bg-white text-[#123D2B] hover:bg-[#EFF6F0] rounded-md transition-colors cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              )}

              {/* User Profile Dropdown */}
              {currentUser && (
                <UserProfileMenu
                  isOpen={showProfileMenu}
                  onClose={() => setShowProfileMenu(false)}
                  currentUser={currentUser}
                  onOpenAuthModal={onOpenAuthModal}
                  onRoleSwitch={onRoleChange}
                  onLogout={onLogout}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Dropdown row */}
        {mobileSearchVisible && (
          <div className="xl:hidden pb-3 pt-1">
            <div className="relative">
              <Search className="w-4 h-4 text-[#DDEDE1]/60 absolute left-3 top-2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search plots, farmers, alerts..."
                className="w-full pl-9 pr-8 py-1.5 bg-[#0C3021] border border-[#216847] rounded-md text-xs text-white placeholder-[#DDEDE1]/60 focus:outline-none focus:ring-1 focus:ring-[#DDEDE1]"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1.5 text-xs text-[#DDEDE1]/70 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
