import React, { useState } from 'react';
import {
  Sprout,
  ShieldCheck,
  Tractor,
  Droplets,
  Layers,
  CloudSun,
  ScanLine,
  TrendingUp,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Radio,
  BarChart3,
  Users,
  Compass,
  Cpu,
  Activity,
  Menu,
  X,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { AuthUser, UserRole } from '../../types/agriculture';

interface LandingPageProps {
  onOpenAuthModal: (mode: 'login' | 'register') => void;
  onQuickDemoLogin: (role: UserRole) => void;
  currentUser: AuthUser | null;
  onGoToDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuthModal,
  onQuickDemoLogin,
  currentUser,
  onGoToDashboard,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState<'telemetry' | 'irrigation' | 'diagnostics' | 'yield'>('telemetry');

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7f4] text-[#1c2e22] flex flex-col antialiased selection:bg-[#2d6a4f]/20 selection:text-[#143823]">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-[#143823] text-white border-b border-[#1b4332] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#2d6a4f] flex items-center justify-center text-[#d8f3dc] shadow-inner border border-[#40916c]">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg tracking-tight text-white">AgriVision</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#2d6a4f]/80 text-[#d8f3dc] border border-[#52b788]/40">
                    Smart Ag v4.2
                  </span>
                </div>
                <p className="text-[11px] text-[#a7c5b2]">Precision Agriculture & Operations Management</p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#d8f3dc]">
              <button
                onClick={() => scrollToSection('home')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Services
              </button>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {currentUser ? (
                <button
                  onClick={onGoToDashboard}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2d6a4f] hover:bg-[#387a5a] text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => onOpenAuthModal('login')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#d8f3dc] hover:text-white hover:bg-[#1b4332] transition-colors cursor-pointer border border-transparent hover:border-[#2d6a4f]"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Login</span>
                  </button>

                  <button
                    onClick={() => onOpenAuthModal('register')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#2d6a4f] hover:bg-[#387a5a] text-white transition-all shadow-sm cursor-pointer border border-[#40916c]"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Get Started</span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-[#d8f3dc] hover:bg-[#1b4332]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0f2a1b] border-t border-[#1b4332] px-4 py-3 space-y-2">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left py-2 text-xs font-semibold uppercase tracking-wider text-[#d8f3dc]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 text-xs font-semibold uppercase tracking-wider text-[#d8f3dc]"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left py-2 text-xs font-semibold uppercase tracking-wider text-[#d8f3dc]"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left py-2 text-xs font-semibold uppercase tracking-wider text-[#d8f3dc]"
            >
              Services
            </button>

            <div className="pt-3 border-t border-[#234d35] flex flex-col gap-2">
              {currentUser ? (
                <button
                  onClick={onGoToDashboard}
                  className="w-full py-2 bg-[#2d6a4f] text-white rounded text-xs font-bold text-center"
                >
                  Enter Dashboard ({currentUser.name})
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuthModal('login');
                    }}
                    className="w-full py-2 bg-[#1b4332] text-white rounded text-xs font-semibold text-center"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuthModal('register');
                    }}
                    className="w-full py-2 bg-[#2d6a4f] text-white rounded text-xs font-bold text-center"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-[#143823] text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#52b788_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Left Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b4332] border border-[#2d6a4f] text-xs font-semibold text-[#a7f3d0]">
                <Radio className="w-3.5 h-3.5 text-[#52b788] animate-pulse" />
                <span>48 Regional LoRaWAN Base Stations Active</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Enterprise Precision Agriculture & Watershed Management
              </h1>

              <p className="text-sm sm:text-base text-[#c2dcd0] max-w-2xl leading-relaxed">
                Connect regional agricultural resource governance with field-level precision telemetry.
                Monitor 3-depth capacitive soil moisture, control automated solenoid irrigation networks, and run AI foliar crop disease diagnostics in real time.
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onOpenAuthModal('register')}
                  className="px-6 py-3 rounded-lg bg-[#52b788] hover:bg-[#40916c] text-[#0f2a1b] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Get Started (Register)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenAuthModal('login')}
                  className="px-6 py-3 rounded-lg bg-[#1b4332] hover:bg-[#23533e] border border-[#2d6a4f] text-white font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-[#a7f3d0]" />
                  <span>Login / Demo Selector</span>
                </button>
              </div>

              {/* Instant 1-Click Interactive Demo Launcher Cards */}
              <div className="pt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#a7c5b2] mb-2.5">
                  Launch Interactive Demo Workstation:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0">
                  <button
                    type="button"
                    onClick={() => onQuickDemoLogin('admin')}
                    className="p-3.5 rounded-xl bg-[#0f2a1b]/90 hover:bg-[#183d28] border border-[#2d6a4f] text-left transition-all group shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-[#2d6a4f] text-white">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-[#a7f3d0] transition-colors">
                            Administrator Demo
                          </div>
                          <div className="text-[10px] text-[#a7c5b2]">Director Eleanor Vance</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#52b788] group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-[10px] text-[#8ba394] mt-2">
                      Regional acreage distribution, pump stations, zone matrix, and producer directory.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => onQuickDemoLogin('farmer')}
                    className="p-3.5 rounded-xl bg-[#0f2a1b]/90 hover:bg-[#183d28] border border-[#2d6a4f] text-left transition-all group shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-[#2d6a4f] text-white">
                          <Tractor className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-[#a7f3d0] transition-colors">
                            Farmer Operator Demo
                          </div>
                          <div className="text-[10px] text-[#a7c5b2]">Henderson Crest Farm</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#52b788] group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-[10px] text-[#8ba394] mt-2">
                      3-depth soil probes, live solenoid valve toggle, ET0 weather, and foliar disease AI scan.
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Preview */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#0f2a1b] rounded-2xl p-4 sm:p-5 border border-[#2d6a4f] shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#234d35] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-white pl-2">AgriVision Telemetry Live</span>
                  </div>
                  <span className="text-[10px] text-[#52b788] font-semibold bg-[#1b4332] px-2 py-0.5 rounded">
                    LoRa Sub-GHz Active
                  </span>
                </div>

                {/* Quick Soil Moisture Snapshot */}
                <div className="bg-[#143823] p-3.5 rounded-xl border border-[#2d6a4f]/70 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#a7c5b2] font-semibold">Active Root Zone (10-30cm)</span>
                    <span className="text-white font-bold">41% Moisture (Optimal)</span>
                  </div>
                  <div className="w-full bg-[#0f2a1b] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#52b788] h-full rounded-full" style={{ width: '68%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#8ba394]">
                    <span>Wilting: 15%</span>
                    <span className="text-[#a7f3d0]">Optimal 30%-50%</span>
                    <span>Saturation: 65%</span>
                  </div>
                </div>

                {/* Mini Stat Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#143823] p-3 rounded-lg border border-[#2d6a4f]/60">
                    <span className="text-[10px] uppercase font-bold text-[#8ba394] block">Solenoid Valve</span>
                    <span className="text-sm font-bold text-[#a7f3d0] flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#52b788] animate-pulse" />
                      Active (320 L/min)
                    </span>
                  </div>

                  <div className="bg-[#143823] p-3 rounded-lg border border-[#2d6a4f]/60">
                    <span className="text-[10px] uppercase font-bold text-[#8ba394] block">ET0 Water Deficit</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">
                      4.8 mm/day
                    </span>
                  </div>
                </div>

                {/* Simulated Image */}
                <div className="rounded-xl overflow-hidden border border-[#2d6a4f] relative h-36">
                  <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80"
                    alt="Agricultural Precision Field"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <ScanLine className="w-4 h-4 text-[#52b788]" />
                      Plot #14 North Valley — NDVI Health 0.86
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="mt-14 pt-8 border-t border-[#1b4332] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#a7f3d0]">14,850+</div>
              <div className="text-xs text-[#a7c5b2] mt-0.5 uppercase tracking-wide font-semibold">Arable Acres Monitored</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#a7f3d0]">99.8%</div>
              <div className="text-xs text-[#a7c5b2] mt-0.5 uppercase tracking-wide font-semibold">IoT Sensor Uptime</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#a7f3d0]">+22%</div>
              <div className="text-xs text-[#a7c5b2] mt-0.5 uppercase tracking-wide font-semibold">Water Conserved via ET0</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#a7f3d0]">48</div>
              <div className="text-xs text-[#a7c5b2] mt-0.5 uppercase tracking-wide font-semibold">Watershed Gateway Nodes</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 bg-white border-b border-[#e1e6dc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2d6a4f] bg-[#e8f5e9] px-3 py-1 rounded-full border border-[#c8e6c9]">
              About AgriVision
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#143823] tracking-tight">
              The Next Evolution in Agronomic Telemetry
            </h2>
            <p className="text-sm sm:text-base text-[#526054] leading-relaxed">
              Traditional farm management tools either focus exclusively on accounting or rely on isolated sensor apps.
              AgriVision unites district watershed authorities and field operators into a single authoritative platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#fbfbfa] p-6 rounded-xl border border-[#e1e6dc] shadow-xs space-y-3 hover:border-[#2d6a4f] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#e8f5e9] border border-[#c8e6c9] flex items-center justify-center text-[#2d6a4f]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#143823]">3-Depth Soil Physics & Chemistry</h3>
              <p className="text-xs text-[#526054] leading-relaxed">
                Capacitive frequency domain reflectometry measures soil moisture at 10cm (topsoil), 30cm (root absorption window), and 60cm (deep subsoil reservoir), paired with calibrated N-P-K, pH, temperature, and electrical conductivity metrics.
              </p>
            </div>

            <div className="bg-[#fbfbfa] p-6 rounded-xl border border-[#e1e6dc] shadow-xs space-y-3 hover:border-[#2d6a4f] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#e8f5e9] border border-[#c8e6c9] flex items-center justify-center text-[#2d6a4f]">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#143823]">Closed-Loop Automated Irrigation</h3>
              <p className="text-xs text-[#526054] leading-relaxed">
                Solenoid valves communicate with micro-climate ET0 evapotranspiration models and root-depth sensors. Valves automatically shut off when soil reaches field capacity, preventing nutrient leaching and slashing reservoir depletion.
              </p>
            </div>

            <div className="bg-[#fbfbfa] p-6 rounded-xl border border-[#e1e6dc] shadow-xs space-y-3 hover:border-[#2d6a4f] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#e8f5e9] border border-[#c8e6c9] flex items-center justify-center text-[#2d6a4f]">
                <ScanLine className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#143823]">Multispectral Canopy Diagnostics</h3>
              <p className="text-xs text-[#526054] leading-relaxed">
                Computer vision models trained on tens of thousands of foliar pathology scans instantly diagnose Northern Corn Leaf Blight, Frogeye Spot, and rust infections with confidence scores, severity ratings, and treatment guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-[#f8f9f6] border-b border-[#e1e6dc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2d6a4f] bg-[#e8f5e9] px-3 py-1 rounded-full border border-[#c8e6c9]">
              Platform Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#143823] tracking-tight">
              Architected for Enterprise Ag & Field Operations
            </h2>
            <p className="text-sm text-[#526054]">
              Inspect the core modules powering our dual-tier smart agriculture system.
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex bg-white p-1 rounded-xl border border-[#d1d8cc] shadow-xs text-xs">
              <button
                type="button"
                onClick={() => setActiveFeatureTab('telemetry')}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeFeatureTab === 'telemetry'
                    ? 'bg-[#143823] text-white shadow-xs'
                    : 'text-[#5f7464] hover:text-[#143823]'
                }`}
              >
                Soil Telemetry
              </button>
              <button
                type="button"
                onClick={() => setActiveFeatureTab('irrigation')}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeFeatureTab === 'irrigation'
                    ? 'bg-[#143823] text-white shadow-xs'
                    : 'text-[#5f7464] hover:text-[#143823]'
                }`}
              >
                Smart Irrigation
              </button>
              <button
                type="button"
                onClick={() => setActiveFeatureTab('diagnostics')}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeFeatureTab === 'diagnostics'
                    ? 'bg-[#143823] text-white shadow-xs'
                    : 'text-[#5f7464] hover:text-[#143823]'
                }`}
              >
                Canopy AI Scanner
              </button>
              <button
                type="button"
                onClick={() => setActiveFeatureTab('yield')}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeFeatureTab === 'yield'
                    ? 'bg-[#143823] text-white shadow-xs'
                    : 'text-[#5f7464] hover:text-[#143823]'
                }`}
              >
                Regional Yield Forecast
              </button>
            </div>
          </div>

          {/* Feature Tab Details Card */}
          <div className="bg-white rounded-2xl border border-[#e1e6dc] p-6 sm:p-8 shadow-xs">
            {activeFeatureTab === 'telemetry' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase text-[#2d6a4f] tracking-wider">Sub-Surface IoT Grid</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#143823]">
                    Multi-Depth Capacitive Frequency Domain Reflectometry
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526054] leading-relaxed">
                    Soil moisture is not uniform. While surface topsoil dries under sunlight, the root absorption zone may still retain optimal hydration.
                    AgriVision tracks three depths continuously to tell farmers exactly when roots demand water.
                  </p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" />
                      <span>Calibrated for Corn, Soybeans, Winter Wheat, Cotton, and Tomatoes.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" />
                      <span>Chemical telemetry monitors active Nitrogen, Phosphorus, and Potassium reserves.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" />
                      <span>Automated LoRa packet sync every 15 minutes with 99.8% gateway uptime.</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => onQuickDemoLogin('farmer')}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#143823] hover:bg-[#1b4332] text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    <span>Test Soil Telemetry in Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="bg-[#fbfbfa] p-5 rounded-xl border border-[#e2e6dd] space-y-3">
                  <div className="font-semibold text-xs text-[#143823]">Live Field Sample — Plot #14</div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between font-medium">
                        <span>Topsoil (10cm)</span>
                        <span className="font-bold text-[#143823]">34%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1">
                        <div className="bg-[#1b4332] h-full" style={{ width: '34%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-medium">
                        <span>Active Root Zone (30cm)</span>
                        <span className="font-bold text-[#2d6a4f]">41% (Optimal)</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1">
                        <div className="bg-[#2d6a4f] h-full" style={{ width: '41%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-medium">
                        <span>Deep Subsoil (60cm)</span>
                        <span className="font-bold text-[#52b788]">47%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1">
                        <div className="bg-[#52b788] h-full" style={{ width: '47%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'irrigation' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase text-[#2d6a4f] tracking-wider">Automated Solenoids</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#143823]">
                    Smart Valve Telemetry & Auto-Evapotranspiration Shutoff
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526054] leading-relaxed">
                    Remotely actuate manifold valves or schedule cycles based on real-time soil deficit algorithms.
                    Sensors continuously measure infiltration rate and automatically trigger valve shutoff when moisture hits the calibrated field threshold.
                  </p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" />
                      <span>Instant manual override button with live flow telemetry (L/min).</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" />
                      <span>Weather integration pauses irrigation cycles prior to forecasted precipitation.</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => onQuickDemoLogin('farmer')}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#143823] hover:bg-[#1b4332] text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    <span>Try Solenoid Valve Control</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="bg-[#f0f8f3] p-5 rounded-xl border border-[#c8e6c9] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#143823]">Manifold Zone 3 Valve</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#2d6a4f] text-white font-semibold">
                      Open & Pumping
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-[#143823]">320 Liters / min</div>
                  <p className="text-xs text-gray-600">
                    Automated shutoff engaged when root-zone moisture reaches 45%. Water saved today: +22%.
                  </p>
                </div>
              </div>
            )}

            {activeFeatureTab === 'diagnostics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase text-[#2d6a4f] tracking-wider">Multispectral Vision</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#143823]">
                    Foliar Pathology & Leaf Disease Diagnostics
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526054] leading-relaxed">
                    Identify early crop stress, chlorosis, and fungal blights before they damage entire harvests.
                    Inspect multispectral images, evaluate confidence scores, and receive immediate agronomic treatment directives.
                  </p>
                  <button
                    onClick={() => onQuickDemoLogin('farmer')}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#143823] hover:bg-[#1b4332] text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    <span>Test Disease Scanner Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="bg-[#fbfbfa] p-5 rounded-xl border border-[#e2e6dd] space-y-2">
                  <div className="text-xs font-bold text-red-800 bg-red-100 px-2.5 py-1 rounded inline-block">
                    Northern Corn Leaf Blight (96.4% Match)
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Identified elliptical tan lesions on lower whorl. Recommended: Apply strobilurin/triazole fungicide at V8 stage.
                  </p>
                </div>
              </div>
            )}

            {activeFeatureTab === 'yield' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase text-[#2d6a4f] tracking-wider">Enterprise Analytics</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#143823]">
                    Regional Acreage Distribution & Yield Projections
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526054] leading-relaxed">
                    Empower agricultural district directors and cooperative managers to view projected yields across Maize, Soybeans, Winter Wheat, and specialized crops with real-time pace indicators.
                  </p>
                  <button
                    onClick={() => onQuickDemoLogin('admin')}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#143823] hover:bg-[#1b4332] text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    <span>Test Administrator Analytics</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="bg-[#fbfbfa] p-5 rounded-xl border border-[#e2e6dd] space-y-2 text-xs">
                  <div className="font-semibold text-gray-900">Current Season Pace:</div>
                  <div className="text-xl font-bold text-[#143823]">182,400 Metric Tons (+2.1%)</div>
                  <div className="text-gray-500">Target: 193,500 MT across 14,850 arable acres.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 bg-white border-b border-[#e1e6dc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2d6a4f] bg-[#e8f5e9] px-3 py-1 rounded-full border border-[#c8e6c9]">
              Agricultural Services
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#143823] tracking-tight">
              Turnkey Precision Agriculture Infrastructure
            </h2>
            <p className="text-sm text-[#526054]">
              Scalable services designed for regional water districts, agronomy cooperatives, and independent producers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl border border-[#e1e6dc] bg-[#fafbf9] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#143823] text-[#d8f3dc] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#143823]">Watershed Quota & Allocation</h4>
              <p className="text-xs text-[#526054] leading-relaxed">
                Central reservoir telemetry modeling and quota scheduling across regional canal networks and high-volume pump stations.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#e1e6dc] bg-[#fafbf9] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#143823] text-[#d8f3dc] flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#143823]">IoT Sensor Deployment & Telemetry</h4>
              <p className="text-xs text-[#526054] leading-relaxed">
                Plug-and-play LoRaWAN nodes with 10-year solar battery arrays and multi-depth soil capacitance probe arrays.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#e1e6dc] bg-[#fafbf9] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#143823] text-[#d8f3dc] flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#143823]">NDVI Aerial Drone Scouting</h4>
              <p className="text-xs text-[#526054] leading-relaxed">
                High-resolution multispectral aerial survey passes generating calibrated NDVI vegetation health maps for fertilizer side-dressing.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#e1e6dc] bg-[#fafbf9] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#143823] text-[#d8f3dc] flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#143823]">Harvest Silo & Grain Moisture Logs</h4>
              <p className="text-xs text-[#526054] leading-relaxed">
                Combine truck scale verification, grain moisture verification at storage bin entry, and exportable regulatory compliance spreadsheets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-[#143823] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Experience the AgriVision Platform?
          </h2>
          <p className="text-sm sm:text-base text-[#a7c5b2] max-w-2xl mx-auto">
            Create your operator account to manage your field telemetry, or launch an instant 1-click interactive demo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenAuthModal('register')}
              className="px-6 py-3 rounded-lg bg-[#52b788] hover:bg-[#40916c] text-[#0f2a1b] font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Get Started (Register Free)
            </button>
            <button
              onClick={() => onOpenAuthModal('login')}
              className="px-6 py-3 rounded-lg bg-[#1b4332] hover:bg-[#23533e] border border-[#2d6a4f] text-white font-semibold text-sm transition-colors cursor-pointer"
            >
              Login / Demo Access
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f2a1b] text-[#a7c5b2] py-10 border-t border-[#1b4332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#2d6a4f] flex items-center justify-center text-white">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white">AgriVision System</span>
            <span>• Precision Agricultural Governance v4.2</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenAuthModal('login')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => onOpenAuthModal('register')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Register
            </button>
            <button
              onClick={() => scrollToSection('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
