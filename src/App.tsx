/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole, Farmer, Plot, AgroAlert, FieldTask, AuthUser } from './types/agriculture';
import {
  INITIAL_PLOTS,
  INITIAL_FARMERS,
  INITIAL_ALERTS,
  INITIAL_TASKS,
} from './data/mockAgricultureData';
import { LandingPage } from './components/landing/LandingPage';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { IrrigationModal } from './components/modals/IrrigationModal';
import { FarmerDetailModal } from './components/modals/FarmerDetailModal';
import { ExportReportModal } from './components/modals/ExportReportModal';
import { NewTaskModal } from './components/modals/NewTaskModal';
import { AuthModal } from './components/auth/AuthModal';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  LayoutDashboard,
  Users,
  Droplets,
  AlertTriangle,
  Layers,
  CloudSun,
} from 'lucide-react';

export default function App() {
  // Navigation mode: 'landing' (public marketing & demo page) vs 'dashboard' (authenticated console)
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');

  const [role, setRole] = useState<UserRole>('admin');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [plots, setPlots] = useState<Plot[]>(INITIAL_PLOTS);
  const [farmers, setFarmers] = useState<Farmer[]>(INITIAL_FARMERS);
  const [alerts, setAlerts] = useState<AgroAlert[]>(INITIAL_ALERTS);
  const [tasks, setTasks] = useState<FieldTask[]>(INITIAL_TASKS);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: 'user-admin',
    name: 'Eleanor Vance',
    email: 'e.vance@agrivision.gov',
    role: 'admin',
    title: 'Operations Director',
    region: 'District 4 - West Valley',
    avatarInitials: 'EV',
  });
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Search and Season Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<string>('2026 Spring / Summer Cycle');

  // Mobile menu open state
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Modals state
  const [irrigationModalOpen, setIrrigationModalOpen] = useState<boolean>(false);
  const [irrigationTargetPlotId, setIrrigationTargetPlotId] = useState<string>('');
  const [selectedFarmerForDetail, setSelectedFarmerForDetail] = useState<Farmer | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warn' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'warn' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Switch default tab when switching role
  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setMobileMenuOpen(false);

    // If using standard default accounts, sync profile avatar/info
    if (currentUser?.id === 'user-admin' || currentUser?.id === 'user-farmer') {
      if (newRole === 'admin') {
        setCurrentUser({
          id: 'user-admin',
          name: 'Eleanor Vance',
          email: 'e.vance@agrivision.gov',
          role: 'admin',
          title: 'Operations Director',
          region: 'District 4 - West Valley',
          avatarInitials: 'EV',
        });
      } else {
        setCurrentUser({
          id: 'user-farmer',
          name: 'Marcus Henderson',
          email: 'm.henderson@crestfarms.org',
          role: 'farmer',
          title: 'Henderson Crest Farm',
          farmName: 'Henderson Crest Farm',
          region: 'District 4 - West Valley',
          primaryCrop: 'Corn / Maize',
          avatarInitials: 'MH',
        });
      }
    } else if (currentUser) {
      setCurrentUser({
        ...currentUser,
        role: newRole,
      });
    }

    if (newRole === 'admin') {
      setActiveTab('overview');
      showToast('Switched to Regional Administrator Command View', 'info');
    } else {
      setActiveTab('field-overview');
      showToast('Switched to Precision Farmer Operator View', 'info');
    }
  };

  // Auth Handlers
  const handleOpenAuthModal = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleQuickDemoLogin = (demoRole: UserRole) => {
    if (demoRole === 'admin') {
      const adminUser: AuthUser = {
        id: 'user-admin',
        name: 'Eleanor Vance',
        email: 'e.vance@agrivision.gov',
        role: 'admin',
        title: 'Operations Director',
        region: 'District 4 - West Valley',
        avatarInitials: 'EV',
      };
      setCurrentUser(adminUser);
      setRole('admin');
      setActiveTab('overview');
      setViewMode('dashboard');
      showToast('Welcome, Eleanor Vance! Administrator Console ready.', 'success');
    } else {
      const farmerUser: AuthUser = {
        id: 'user-farmer',
        name: 'Marcus Henderson',
        email: 'm.henderson@crestfarms.org',
        role: 'farmer',
        title: 'Henderson Crest Farm',
        farmName: 'Henderson Crest Farm',
        region: 'District 4 - West Valley',
        primaryCrop: 'Corn / Maize',
        avatarInitials: 'MH',
      };
      setCurrentUser(farmerUser);
      setRole('farmer');
      setActiveTab('field-overview');
      setViewMode('dashboard');
      showToast('Welcome, Marcus Henderson! Connected to Henderson Crest Farm Telemetry.', 'success');
    }
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setRole(user.role);
    if (user.role === 'admin') {
      setActiveTab('overview');
    } else {
      setActiveTab('field-overview');
    }

    // Direct user to the interactive dashboard
    setViewMode('dashboard');

    // If user registered a new farm, append to the farmer registry so it appears in the table!
    if (user.role === 'farmer' && user.farmName) {
      const existingFarmer = farmers.find((f) => f.email === user.email);
      if (!existingFarmer) {
        const newFarmerRecord: Farmer = {
          id: `farm-${Date.now()}`,
          name: user.name,
          farmName: user.farmName,
          region: user.region || 'District 4 - West Valley',
          contact: '+1 (555) 800-4321',
          email: user.email,
          totalAcres: 320,
          primaryCrop: (user.primaryCrop as any) || 'Corn / Maize',
          status: 'Optimal',
          activePlotsCount: 3,
          sensorUptime: 99.5,
          soilHealthIndex: 91,
          lastSync: 'Just now',
        };
        setFarmers((prev) => [newFarmerRecord, ...prev]);
      }
    }

    showToast(`Welcome, ${user.name}! Authenticated as ${user.role === 'admin' ? 'Administrator' : 'Farmer'}.`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setViewMode('landing');
    showToast('Signed out of AgriVision console.', 'info');
  };

  // Toggle plot valve directly
  const handleTogglePlotValve = (plotId: string) => {
    setPlots((prev) =>
      prev.map((p) => {
        if (p.id === plotId) {
          const nextState = !p.valveOpen;
          showToast(
            nextState
              ? `Solenoid Valve OPENED on ${p.name}. Drip line flowing at 320 L/min.`
              : `Solenoid Valve CLOSED on ${p.name}.`,
            nextState ? 'success' : 'info'
          );
          return {
            ...p,
            valveOpen: nextState,
            irrigationStatus: nextState ? 'Active' : 'Idle',
            flowRateLpm: nextState ? 320 : 0,
            telemetry: {
              ...p.telemetry,
              moistureRoot: nextState ? Math.min(55, p.telemetry.moistureRoot + 2) : p.telemetry.moistureRoot,
              lastUpdated: 'Just now',
            },
          };
        }
        return p;
      })
    );
  };

  // Confirm and start irrigation from modal
  const handleConfirmStartIrrigation = (plotId: string, durationMinutes: number, targetMoisture: number) => {
    setPlots((prev) =>
      prev.map((p) => {
        if (p.id === plotId) {
          return {
            ...p,
            valveOpen: true,
            irrigationStatus: 'Active',
            flowRateLpm: 340,
            waterUsedTodayLiters: p.waterUsedTodayLiters + durationMinutes * 180,
            telemetry: {
              ...p.telemetry,
              moistureRoot: Math.min(52, p.telemetry.moistureRoot + 3),
              lastUpdated: 'Just now',
            },
          };
        }
        return p;
      })
    );
    const targetPlot = plots.find((p) => p.id === plotId);
    showToast(
      `Irrigation scheduled on ${targetPlot?.name || 'Plot'} for ${durationMinutes} mins (Auto-cutoff at ${targetMoisture}%).`,
      'success'
    );
  };

  // Acknowledge alert
  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
    showToast('Agronomic alert verified and logged into permanent record.', 'info');
  };

  // Add task
  const handleAddTask = (task: FieldTask) => {
    setTasks((prev) => [task, ...prev]);
    showToast(`Task "${task.title}" assigned to ${task.assignee}.`, 'success');
  };

  // Toggle task complete
  const handleToggleTaskComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const activeIrrigationCount = plots.filter((p) => p.valveOpen).length;
  const unacknowledgedAlertsCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="min-h-screen bg-[#F7F8F3] text-[#26372E] flex flex-col antialiased">
      {viewMode === 'landing' ? (
        /* Public Landing Page with Home, About, Features, Services, Login, Get Started */
        <LandingPage
          onOpenAuthModal={handleOpenAuthModal}
          onQuickDemoLogin={handleQuickDemoLogin}
          currentUser={currentUser}
          onGoToDashboard={() => setViewMode('dashboard')}
        />
      ) : (
        /* Authenticated Dual-Tier Agriculture Management Dashboard */
        <div className="flex-1 flex flex-col pb-16 lg:pb-0">
          {/* Top Navigation & Status Bar */}
          <Header
            role={role}
            onRoleChange={handleRoleChange}
            alerts={alerts}
            onAcknowledgeAlert={handleAcknowledgeAlert}
            onOpenExportModal={() => setExportModalOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSeason={selectedSeason}
            onSeasonChange={setSelectedSeason}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            mobileMenuOpen={mobileMenuOpen}
            currentUser={currentUser}
            onOpenAuthModal={handleOpenAuthModal}
            onLogout={handleLogout}
            onNavigateToLanding={() => setViewMode('landing')}
          />

          {/* Main App Layout */}
          <div className="flex-1 flex max-w-7xl w-full mx-auto">
            {/* Sidebar (Desktop Permanent + Mobile Drawer) */}
            <Sidebar
              role={role}
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setMobileMenuOpen(false);
              }}
              unreadAlertCount={unacknowledgedAlertsCount}
              activeIrrigationCount={activeIrrigationCount}
              mobileOpen={mobileMenuOpen}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />

            {/* Content Body */}
            <main className="flex-1 p-3 sm:p-5 lg:p-7 min-w-0 overflow-x-hidden">
              {role === 'admin' ? (
                <AdminDashboard
                  activeTab={activeTab}
                  farmers={farmers}
                  plots={plots}
                  alerts={alerts}
                  onAcknowledgeAlert={handleAcknowledgeAlert}
                  onSelectFarmer={(farmer) => setSelectedFarmerForDetail(farmer)}
                  onOpenIrrigationModal={(plotId) => {
                    setIrrigationTargetPlotId(plotId || plots[0]?.id || '');
                    setIrrigationModalOpen(true);
                  }}
                  searchFilter={searchQuery}
                />
              ) : (
                <FarmerDashboard
                  activeTab={activeTab}
                  plots={plots}
                  onTogglePlotValve={handleTogglePlotValve}
                  onOpenIrrigationModal={(plotId) => {
                    setIrrigationTargetPlotId(plotId);
                    setIrrigationModalOpen(true);
                  }}
                  onOpenNewTaskModal={() => setNewTaskModalOpen(true)}
                  tasks={tasks}
                  onToggleTaskComplete={handleToggleTaskComplete}
                />
              )}
            </main>
          </div>

          {/* Mobile Bottom Quick-Navigation Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E3E9E3] px-3 py-1.5 flex items-center justify-around shadow-lg">
            {role === 'admin' ? (
              <>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium rounded transition-colors ${
                    activeTab === 'overview' ? 'text-[#216847] font-bold' : 'text-[#64746A]'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 mb-0.5" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('farmers')}
                  className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium rounded transition-colors ${
                    activeTab === 'farmers' ? 'text-[#216847] font-bold' : 'text-[#64746A]'
                  }`}
                >
                  <Users className="w-4 h-4 mb-0.5" />
                  <span>Farmers</span>
                </button>
                <button
                  onClick={() => setActiveTab('irrigation')}
                  className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium rounded transition-colors ${
                    activeTab === 'irrigation' ? 'text-[#216847] font-bold' : 'text-[#64746A]'
                  }`}
                >
                  <Droplets className="w-4 h-4 mb-0.5" />
                  <span>Water</span>
                </button>
                <button
                  onClick={() => setActiveTab('alerts')}
                  className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium rounded transition-colors ${
                    activeTab === 'alerts' ? 'text-[#216847] font-bold' : 'text-[#64746A]'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 mb-0.5" />
                  <span>Alerts</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('field-overview')}
                  className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium rounded transition-colors ${
                    activeTab === 'field-overview' ? 'text-[#216847] font-bold' : 'text-[#64746A]'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 mb-0.5" />
                  <span>Field</span>
                </button>
                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium rounded transition-colors ${
                    activeTab === 'telemetry' ? 'text-[#216847] font-bold' : 'text-[#64746A]'
                  }`}
                >
                  <Layers className="w-4 h-4 mb-0.5" />
                  <span>Telemetry</span>
                </button>
                <button
                  onClick={() => setActiveTab('irrigation')}
                  className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium rounded transition-colors ${
                    activeTab === 'irrigation' ? 'text-[#216847] font-bold' : 'text-[#64746A]'
                  }`}
                >
                  <Droplets className="w-4 h-4 mb-0.5" />
                  <span>Irrigation</span>
                </button>
                <button
                  onClick={() => setActiveTab('weather')}
                  className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium rounded transition-colors ${
                    activeTab === 'weather' ? 'text-[#216847] font-bold' : 'text-[#64746A]'
                  }`}
                >
                  <CloudSun className="w-4 h-4 mb-0.5" />
                  <span>Weather</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-18 lg:bottom-5 right-4 sm:right-5 z-50 flex items-center gap-2.5 bg-[#123D2B] text-white px-3.5 py-2.5 rounded-lg shadow-xl border border-[#216847] text-xs animate-in slide-in-from-bottom duration-200 max-w-[90vw]">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-[#DDEDE1] shrink-0" />
          ) : toastMessage.type === 'warn' ? (
            <AlertCircle className="w-4 h-4 text-[#D5A441] shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-[#DDEDE1] shrink-0" />
          )}
          <span className="font-medium truncate">{toastMessage.text}</span>
        </div>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
      />

      {/* Other Modals */}
      <IrrigationModal
        isOpen={irrigationModalOpen}
        onClose={() => setIrrigationModalOpen(false)}
        plots={plots}
        initialPlotId={irrigationTargetPlotId}
        onConfirmStart={handleConfirmStartIrrigation}
      />

      <FarmerDetailModal
        isOpen={Boolean(selectedFarmerForDetail)}
        onClose={() => setSelectedFarmerForDetail(null)}
        farmer={selectedFarmerForDetail}
        plots={plots}
      />

      <ExportReportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        farmers={farmers}
        plots={plots}
        alerts={alerts}
        season={selectedSeason}
      />

      <NewTaskModal
        isOpen={newTaskModalOpen}
        onClose={() => setNewTaskModalOpen(false)}
        plots={plots}
        onAddTask={handleAddTask}
      />
    </div>
  );
}
