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
  User,
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
    <header className="sticky top-0 z-30 bg-[#143823] text-white border-b border-[#1b4332] shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-16 gap-2 sm:gap-4">
          {/* Left: Mobile Menu Toggle + Brand Identity */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={onToggleMobileMenu}
              className="lg:hidden p-1.5 rounded-md text-[#d8f3dc] hover:bg-[#1b4332] focus:outline-none cursor-pointer"
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
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#2d6a4f] group-hover:bg-[#387a5a] flex items-center justify-center text-[#d8f3dc] shadow-inner border border-[#40916c] shrink-0 transition-colors">
                <Sprout className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-[#a7f3d0] transition-colors">
                    AgriVision
                  </span>
                  <span className="hidden sm:inline-block text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded bg-[#2d6a4f]/70 text-[#d8f3dc] border border-[#52b788]/40">
                    v4.2
                  </span>
                </div>
                <p className="text-[10px] text-[#a7c5b2] hidden md:block">Smart Agriculture System</p>
              </div>
            </button>

            {onNavigateToLanding && (
              <button
                type="button"
                onClick={onNavigateToLanding}
                className="hidden xl:flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-[#a7c5b2] hover:text-white bg-[#0f2a1b] hover:bg-[#1b4332] rounded border border-[#2d6a4f]/50 transition-colors cursor-pointer"
                title="Return to Landing Page"
              >
                <span>← Home</span>
              </button>
            )}
          </div>

          {/* Center: Role Switcher & Season selector */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Responsive Role Switcher */}
            <div className="bg-[#0f2a1b] p-0.5 sm:p-1 rounded-lg border border-[#234d35] flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => onRoleChange('admin')}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  role === 'admin'
                    ? 'bg-[#2d6a4f] text-white shadow-xs'
                    : 'text-[#a7c5b2] hover:text-white'
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
                    ? 'bg-[#2d6a4f] text-white shadow-xs'
                    : 'text-[#a7c5b2] hover:text-white'
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
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#1b4332]/70 hover:bg-[#1b4332] text-xs text-[#d8f3dc] border border-[#2d6a4f]/50 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#74c69d]" />
                <span className="max-w-[130px] truncate">{selectedSeason}</span>
                <ChevronDown className="w-3 h-3 text-[#a7c5b2]" />
              </button>

              {showSeasonDropdown && (
                <div className="absolute left-0 mt-1 w-60 bg-white text-gray-800 rounded-md shadow-xl border border-[#e1e6dc] py-1 z-50">
                  <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Agronomic Cycle
                  </div>
                  {seasons.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        onSeasonChange(s);
                        setShowSeasonDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#f0f4ee] cursor-pointer ${
                        selectedSeason === s ? 'font-semibold text-[#143823] bg-[#eaf4ec]' : 'text-gray-700'
                      }`}
                    >
                      <span>{s}</span>
                      {selectedSeason === s && <Check className="w-3.5 h-3.5 text-[#2d6a4f]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden xl:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-[#8ba394] absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search plots, farmers, alerts..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#0f2a1b]/90 border border-[#2d6a4f]/70 rounded-md text-xs text-white placeholder-[#8ba394] focus:outline-none focus:ring-1 focus:ring-[#74c69d] focus:border-[#74c69d]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 text-xs text-[#8ba394] hover:text-white"
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
              className="xl:hidden p-1.5 rounded-md text-[#d8f3dc] hover:bg-[#1b4332] cursor-pointer"
              aria-label="Toggle search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Export Report Action */}
            <button
              onClick={onOpenExportModal}
              title="Export Report"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#2d6a4f] hover:bg-[#387a5a] text-white text-xs font-medium border border-[#40916c] transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#d8f3dc]" />
              <span className="hidden lg:inline">Export Report</span>
            </button>

            {/* Alerts Bell Popover */}
            <div className="relative">
              <button
                onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
                className="relative p-1.5 sm:p-2 rounded-md bg-[#1b4332] hover:bg-[#23533e] text-[#d8f3dc] transition-colors cursor-pointer"
                aria-label="Alerts"
              >
                <Bell className="w-4 h-4" />
                {unacknowledgedAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[9px] font-bold text-white flex items-center justify-center shadow-xs">
                    {unacknowledgedAlerts.length}
                  </span>
                )}
              </button>

              {showAlertsDropdown && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-88 max-w-sm bg-white rounded-lg shadow-xl border border-[#e1e6dc] text-gray-800 z-50 overflow-hidden">
                  <div className="px-3.5 py-2.5 bg-[#f6f7f4] border-b border-[#e1e6dc] flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#143823] uppercase tracking-wider">
                        Active Farm Alerts
                      </h4>
                      <p className="text-[10px] text-gray-500">
                        {unacknowledgedAlerts.length} unread warnings
                      </p>
                    </div>
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                      Live Telemetry
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                    {alerts.slice(0, 4).map((alert) => (
                      <div key={alert.id} className="p-3 hover:bg-[#fafbf9] transition-colors">
                        <div className="flex items-start justify-between gap-1.5">
                          <span
                            className={`text-[9px] font-semibold px-1.5 py-0.2 rounded uppercase ${
                              alert.severity === 'critical'
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : alert.severity === 'warning'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}
                          >
                            {alert.category}
                          </span>
                          <span className="text-[9px] text-gray-400">{alert.timestamp}</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-900 mt-1">{alert.plotName}</p>
                        <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2">{alert.message}</p>
                        {!alert.acknowledged && (
                          <div className="mt-2 flex justify-end">
                            <button
                              onClick={() => onAcknowledgeAlert(alert.id)}
                              className="text-[10px] font-medium text-[#2d6a4f] hover:text-[#1b4332] flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3 h-3" /> Acknowledge
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="px-3 py-2 bg-[#f6f7f4] border-t border-[#e1e6dc] text-center">
                    <button
                      onClick={() => setShowAlertsDropdown(false)}
                      className="text-xs font-semibold text-[#2d6a4f] hover:underline cursor-pointer"
                    >
                      Close Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar & Dropdown Trigger */}
            <div className="relative pl-1 sm:pl-2 border-l border-[#2d6a4f]/60">
              {currentUser ? (
                <button
                  type="button"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#1b4332] transition-colors cursor-pointer group text-left"
                  title="Click to view Account / Login / Register"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2d6a4f] border-2 border-[#52b788] group-hover:border-white flex items-center justify-center text-xs font-bold text-white shadow-xs transition-all ring-2 ring-transparent group-hover:ring-[#52b788]/50">
                    {currentUser.avatarInitials}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-semibold text-white leading-tight flex items-center gap-1">
                      <span>{currentUser.name}</span>
                      <ChevronDown className="w-3 h-3 text-[#a7c5b2]" />
                    </p>
                    <p className="text-[10px] text-[#a7c5b2] leading-tight">
                      {currentUser.title}
                    </p>
                  </div>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenAuthModal('login')}
                    className="px-2.5 py-1 text-xs font-semibold bg-[#2d6a4f] hover:bg-[#387a5a] text-white rounded-md transition-colors flex items-center gap-1"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAuthModal('register')}
                    className="hidden sm:inline-block px-2.5 py-1 text-xs font-semibold bg-white text-[#143823] hover:bg-gray-100 rounded-md transition-colors"
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
              <Search className="w-4 h-4 text-[#8ba394] absolute left-3 top-2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search plots, farmers, alerts..."
                className="w-full pl-9 pr-8 py-1.5 bg-[#0f2a1b] border border-[#2d6a4f] rounded-md text-xs text-white placeholder-[#8ba394] focus:outline-none focus:ring-1 focus:ring-[#74c69d]"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1.5 text-xs text-[#8ba394] hover:text-white"
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
